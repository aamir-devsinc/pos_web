import _ from 'lodash'
import React, { Component } from 'react';
import { Button, Modal, Form, TextArea } from 'semantic-ui-react';

export default class AddCategory extends Component {
    constructor(props){
        super(props);
        this.state = { 
            open: false      
        }

    }

    show = dimmer => () => this.setState({ dimmer, open: true });
    close = () => this.setState({ open: false });

    addCategory = () => {
        this.setState({ open: false })
    }

    render() {
        const { open, dimmer } = this.state
        return (
            <div style={{ float: "right" }}>
                <Button onClick={this.show('blurring')} primary>Add category</Button>
                <Modal dimmer={dimmer} open={open} onClose={this.close}>
                    <Modal.Header>Add Category</Modal.Header>
                    <Form style={{padding: '25px'}}>
                        <Form.Group widths='three'>
                            <Form.Input 
                                fluid 
                                label='Name' 
                                placeholder='Item name'
                             />
                        </Form.Group>
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
                            onClick={this.addCategory}
                        />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}
