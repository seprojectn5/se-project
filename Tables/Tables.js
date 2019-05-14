import React, {Component} from 'react';
import Table from '../../components/Table/Table';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import TableSummary from '../../components/OrderSummary/TableSummary';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import {connect} from 'react-redux';
import classes from './Tables.css';

class Tables extends Component {
    state = {
       tables: [],
       loading: true,
       booking: false,
       choosenTable: null,
       customerName: '',
       customerId: '',
       tableKeys: [],
       booked: false
    }
    componentDidMount () {
        const query = new URLSearchParams(this.props.location.search);
        let name = '';
        for(let param of query.entries()) {
            if(param[0] === 'name'){
                name = param[1];
            }
        }
        if(!this.props.isAuthenticated) {
            if(name === '') {
                this.props.history.goBack();
            }
        }
        
        axios.get('/tables.json').then(res =>{
            const fetchTables = [];
            const fetchTableKeys = [];
            for(let key in res.data) {
                fetchTables.push({
                    ...res.data[key]
                });
                fetchTableKeys.push(key);
            }
            console.log(fetchTableKeys)
            this.setState({
                loading: false,
                tables: fetchTables,
                customerName: name,
                tableKeys: fetchTableKeys
            })
        })  

        axios.get('/orders.json').then(res => {
            const fetchCustomers = [];
            for(let customer in res.data) {
                fetchCustomers.push(customer);
            }
            this.setState({
                customerId: fetchCustomers[fetchCustomers.length-1],
                loading: false,
            })
        }).catch(err => {
            console.log(err)
        })
    }
    bookingHandler = (choosenTableId) => {
        if(!this.props.isAuthenticated && this.state.tables[choosenTableId-1].status === false) {
            this.setState({
                booking: true,
                choosenTable: choosenTableId
            })
        }
    }

    bookingCancel = () => {
        this.setState({
            booking: false
        })
    }


    bookedHandler = (idTable) => {
        const url = '/orders/' + this.state.customerId + '/orderData.json';
        console.log(url);
        axios.patch(url, {tableNumber: idTable}).then(res => {
            console.log('OK');
        }

        ).catch(err => {
            console.log(err)
        })
        
        let tableUrl = null;
        const updatedTables = this.state.tables;
        for(let table in updatedTables) {
            if(updatedTables[table].id === idTable){
                updatedTables[table].status = true;
                tableUrl = '/tables/' + this.state.tableKeys[table] + '.json';
            }
        }
        console.log(tableUrl)
        axios.patch(tableUrl, {status: true}).then(res => {
            console.log('updated');
            this.setState({
                loading: false
            })
        }).catch(err => {
            console.log(err);
        })
        this.setState({
            tables: updatedTables,
            booking: false,
            booked: true,
            loading: true
        })
    }

    render() {
        let table = this.state.tables.map(tbl => (
            <Table 
                key={tbl.id} 
                id={tbl.id} 
                status={tbl.status} 
                clicked={() => this.bookingHandler(tbl.id)} 
                people={tbl.people}
            />
        ))
        if(this.state.booked) {
            if(this.state.loading) {
                table = <Spinner />
            }
            else {
                table = <Redirect to='/' />
            }
        }
        const tableSummary = <TableSummary 
                                tableId={this.state.choosenTable}
                                purchaseCancelled={this.bookingCancel}
                                purchaseContinued={() => this.bookedHandler(this.state.choosenTable)}/>
        
        
        const greeting = (this.state.loading) ? null : (<div style={{textAlign: 'center'}}>
                                                            <h3>Welcome 
                                                            {
                                                                this.props.isAuthenticated 
                                                                ? ' Chef'
                                                                : ' ' + this.state.customerName
                                                            }
                                                            </h3>
                                                            <p>
                                                            {
                                                                this.props.isAuthenticated
                                                                ? null
                                                                :'Please choose a table'
                                                            }
                                                            </p>
                                                        </div>)
        return (
            <Aux>
                <Modal show={this.state.booking} clicked={this.bookingCancel}>
                    {tableSummary}
                </Modal>
                {greeting}
                <div className={classes.Tables}>
                    {table}
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Tables);