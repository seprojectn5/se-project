import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import DeleteSummary from '../../components/OrderSummary/DeleteSummary';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import axios from 'axios';

class Orders extends Component {
    state = {
        loading: true,
        infos: [],
        tables: [],
        choosenOrder: '',
        deleting: false
    }
    componentWillMount () {
        axios.get('/tables.json').then(res => {
            const fetchedTables = [];
            for (let key in res.data) {
                fetchedTables.push({
                    ...res.data[key],
                    id: key
                })
            }
            console.log(fetchedTables)
            this.setState({
                tables: fetchedTables
            })
        }).catch(err => {
            console.log(err)
        })
        axios.get('/orders.json').then(res => {
            const fetchedOrders = [];
            console.log(res.data)
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
            console.log(fetchedOrders);
            this.setState({
                infos: fetchedOrders,
                loading: false
            })
            
        }).catch(er => {
            this.setState({
                loading: false
            })
        })
        
    }

    deletedHandler = (orderId) => {
        this.setState({
            choosenOrder: orderId,
            deleting: true
        })
    }

    deletedCancel = () => {
        this.setState({
            deleting: false
        })
    }

    deletedOrder = (orderId) => {
        let table = null;
        for (let key in this.state.infos) {
            if(this.state.infos[key].id === orderId) {
                if(this.state.infos[key].orderData.tableNumber){
                    table = this.state.infos[key].orderData.tableNumber;
                    console.log(this.state.infos[key].orderData.tableNumber);
                }
            }
        }
        let tableUrl = null;
        if(table) {
           tableUrl = '/tables/' + this.state.tables[table-1].id + '.json';
            axios.patch(tableUrl, {status: false}).then(res => {
                this.setState({
                    loading: false
                })
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
        }
        
        const url = '/orders/' + orderId + '.json';
        axios.delete(url).then(res => {
            this.setState({
                loading: false
            })
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
        
        axios.get('/orders.json').then(res => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                })
            }

            for (let order in fetchedOrders) {
                if(fetchedOrders[order].id === orderId) {
                    fetchedOrders.splice(order, 1);
                }
            }

            this.setState({
                infos: fetchedOrders,
                loading: false
            })
        }).catch(err => {
            console.log(err)
        })
        this.setState({
            loading: true,
            deleting: false
        })
    }

    render() {
        let order = this.state.infos.map(order => {
            return <Order key={order.id} info={order.orderData} loading={this.state.loading} clicked={() => this.deletedHandler(order.id)}/>
        })
        if(this.state.loading){
            order = <Spinner />
        }

        const deleteSummary = <DeleteSummary 
                                    purchaseCancelled={this.deletedCancel}
                                    purchaseContinued={() => this.deletedOrder(this.state.choosenOrder)} />

        return  (
            <Aux>
                <Modal show={this.state.deleting} clicked={this.deletedCancel}>
                    {deleteSummary}
                </Modal>
                <div>
                    {order}
                </div>
            </Aux>
        )
        
    }
}

export default Orders;