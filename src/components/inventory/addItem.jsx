import _ from 'lodash'
import React, { Component } from 'react';
import { Button, Modal, Form, TextArea } from 'semantic-ui-react';
import CategorySearch from '../category/categorySearch';

export default class AddItem extends Component {
    constructor(props){
        super(props);
        this.state = { 
            open: false,
            name:'',
            quantity:'',
            price:'',
            category:'',      
        }
    }

    show = dimmer => () => this.setState({ dimmer, open: true });
    close = () => this.setState({ open: false });

    addItem = () => {
        const {name, quantity, price, category} = this.state;
        this.props.addItem({name, quantity, price, category});
        this.setState({ open: false });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
  
    render() {
        const { open, dimmer } = this.state
        return (
            <div style={{ float: "right" }}>
                <Button onClick={this.show('blurring')} primary>Add item</Button>
                <Modal dimmer={dimmer} open={open} onClose={this.close}>
                    <Modal.Header>Add Item</Modal.Header>
                    <Form style={{padding: '25px'}}>
                        <Form.Group widths='three'>
                            <Form.Input 
                                fluid 
                                label='Name' 
                                placeholder='Item name'
                                name="name"show
                                onChange={this.onChange}
                                value={this.state.name}
                             />
                            <Form.Input 
                                fluid 
                                label='Quantity' 
                                placeholder='Item quantity'
                                name="quantity"
                                onChange={this.onChange}
                                value={this.state.quantity}
                             />
                            <Form.Input 
                                fluid 
                                label='Price' 
                                placeholder='Item price'
                                name="price"
                                onChange={this.onChange}
                                value={this.state.price}
                             />
                        </Form.Group><br></br>
                        <Form.Field>
                            <label>Category</label>
                            <CategorySearch {...this.props} ></CategorySearch>
                        </Form.Field>
                        <Form.Field>
                            <label>Description</label>
                            <TextArea 
                                placeholder='Tell more about Item'  
                                style={{ minHeight: 100 }} />
                        </Form.Field>
                    </Form>

                    <Modal.Actions>
                        <Button color='black' onClick={this.close}>
                            Nope
                        </Button>
                        <Button
                            positive
                            icon='checkmark'
                            labelPosition='right'
                            content="Add"
                            onClick={this.addItem}
                        />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}
