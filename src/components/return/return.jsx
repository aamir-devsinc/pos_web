import React, { Component } from "react";
import {
  Input,
  Grid,
  Table,
  Header,
  Button,
  Segment,
  Icon,
  Modal,
  Form
} from "semantic-ui-react";
import http from "../../services/httpService";
import { apiUrl } from "../../utils/api-config";

class Return extends Component {
  state = {
    invoiceId: "",
    returnTotal: 0,
    returnItems: [],
    selectedItem: {},
    returnQuantity: 0,
    modalOpen: false
  };
  handleOpen = item =>
    this.setState({ modalOpen: true, returnQuantity: 0, selectedItem: item });

  handleClose = () => this.setState({ modalOpen: false });

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handlesearch = e => {
    this.setState({ invoiceId: e.target.value });
  };
  handleQuantity = () => {
    const { returnQuantity, selectedItem } = this.state;
    debugger;
    const oldInvoice = { ...this.state.oldInvoice };
    const returnItems = [...this.state.returnItems];
    const index = oldInvoice.sold_items.findIndex(item => {
      return item.id === selectedItem.id;
    });
    debugger;
    let returnIndex = returnItems.findIndex(item => {
      return item.id === selectedItem.id;
    });

    let addedReturnTotal = 0.0;
    if (returnIndex === -1) {
      returnItems.push({ ...selectedItem });
      returnIndex = returnItems.findIndex(item => {
        return item.id === selectedItem.id;
      });
      returnItems[returnIndex].quantity = returnQuantity;
    } else {
      addedReturnTotal = this.soldPrice(
        returnItems[returnIndex],
        oldInvoice.discount
      );
      returnItems[returnIndex].quantity =
        parseFloat(returnItems[returnIndex].quantity) +
        parseFloat(returnQuantity);
    }
    let soldPrice = this.soldPrice(
      returnItems[returnIndex],
      oldInvoice.discount
    );
    const returnTotal = this.state.returnTotal + soldPrice - addedReturnTotal;
    soldPrice = this.soldPrice(selectedItem, oldInvoice.discount);
    oldInvoice.sold_items[index].quantity -= returnQuantity;
    oldInvoice.total -= soldPrice;
    oldInvoice.total += this.soldPrice(selectedItem, oldInvoice.discount);
    if (oldInvoice.sold_items[index].quantity === 0) {
      const sold_items = oldInvoice.sold_items.filter(
        i => i.id !== oldInvoice.sold_items[index].id
      );
      oldInvoice.sold_items = sold_items;
    }
    this.setState({ oldInvoice, returnItems, returnTotal });
    this.handleClose();
  };
  handleDelete = item => {
    this.setState({ selectedItem: item, returnQuantity: item.quantity }, () =>
      this.handleQuantity()
    );
  };

  soldPrice = (item, invoiceDiscount) => {
    let soldPrice = item.unit_price * item.quantity;
    if (invoiceDiscount) {
      const discount = (soldPrice / 100) * invoiceDiscount.rate;
      soldPrice -= discount;
    }
    return soldPrice;
  };

  findInvoice = () => {
    const { invoiceId } = this.state;
    http
      .get(`${apiUrl}/api/v1/invoices/${invoiceId}`)
      .then(({ data }) => {
        this.setState({ oldInvoice: data, returnTotal: 0, returnItems: [] });
      })
      .catch(error => console.log(error));
  };
  render() {
    const { oldInvoice } = this.state;
    const dateOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    };
    return (
      <div>
        <Input
          fluid
          label={{
            color: "teal",
            content: "Invoice ID",
            icon: "file text"
          }}
          action={{
            color: "teal",
            content: "Open",
            onClick: this.findInvoice
          }}
          placeholder="Search..."
          onChange={this.handlesearch}
        />
        <br />
        {oldInvoice && (
          <Grid>
            <Grid.Row divided>
              <Grid.Column width="8">
                <Segment color="blue">
                  <h3>Sold Items</h3>
                </Segment>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>ID</Table.HeaderCell>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Quantity</Table.HeaderCell>
                      <Table.HeaderCell>Sold Price</Table.HeaderCell>
                      <Table.HeaderCell />
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {oldInvoice.sold_items.map(item => (
                      <Table.Row key={item.id}>
                        <Table.Cell>{item.item_id}</Table.Cell>
                        <Table.Cell>{item.name}</Table.Cell>
                        <Table.Cell>
                          {item.quantity}
                          <Button
                            basic
                            icon="pencil alternate"
                            color="red"
                            floated="right"
                            onClick={() => this.handleOpen(item)}
                          />
                        </Table.Cell>
                        <Table.Cell>{item.unit_price}</Table.Cell>
                        <Table.Cell textAlign="center">
                          <Button
                            basic
                            icon="trash"
                            color="red"
                            onClick={() => this.handleDelete(item)}
                          />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
                <Segment color="blue" textAlign="right">
                  <Grid textAlign="left">
                    <Grid.Row divided>
                      <Grid.Column width="4">
                        <h4>Discount:</h4>
                        {`${
                          oldInvoice.discount ? oldInvoice.discount.rate : 0
                        } %`}
                      </Grid.Column>
                      <Grid.Column width="7">
                        <h4>Discount For:</h4>
                        {oldInvoice.discount && oldInvoice.discount.detail}
                      </Grid.Column>
                      <Grid.Column width="5">
                        <h4>Adjustment:</h4> {oldInvoice.adjustment}
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <h3>{`Total: ${oldInvoice.total}`}</h3>
                </Segment>
                <Segment>
                  <Grid>
                    <Grid.Row divided>
                      <Grid.Column width="3">
                        <h4> ID: {oldInvoice.id}</h4>
                      </Grid.Column>
                      <Grid.Column width="8">
                        <h4>Created at:</h4>
                        {new Intl.DateTimeFormat("en-PK", dateOptions).format(
                          new Date(oldInvoice.created_at)
                        )}
                      </Grid.Column>
                      <Grid.Column width="5">
                        <h4>Created By:</h4>
                        {oldInvoice.creator_name}
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              </Grid.Column>

              <Grid.Column width="8">
                <Segment color="green">
                  <h3>Returned Items</h3>
                </Segment>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>ID</Table.HeaderCell>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Quantity</Table.HeaderCell>
                      <Table.HeaderCell>Sold Price</Table.HeaderCell>
                      <Table.HeaderCell>Total</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {this.state.returnItems.map(item => (
                      <Table.Row key={item.id}>
                        <Table.Cell>{item.item_id}</Table.Cell>
                        <Table.Cell>{item.name}</Table.Cell>
                        <Table.Cell>{item.quantity}</Table.Cell>
                        <Table.Cell>{item.unit_price}</Table.Cell>
                        <Table.Cell>
                          {item.quantity * item.unit_price}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
                <Segment color="green" textAlign="right" raised>
                  <h3>{`Refundable Amount: ${this.state.returnTotal}`}</h3>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
        <Modal
          open={this.state.modalOpen}
          onClose={this.handleClose}
          size="tiny"
          dimmer="inverted"
        >
          <Header icon="edit" content="Enter Quantity to be return" />
          <Modal.Content>
            <Form className="padding-2vw" onSubmit={this.handleQuantity}>
              <Input
                required
                fluid
                label={{
                  color: "teal",
                  content: "Quantity",
                  icon: "pencil"
                }}
                name="returnQuantity"
                type="number"
                step="0.01"
                max={this.state.selectedItem.quantity}
                onChange={this.handleChange}
              />
              <br />
              <Button floated="right" color="green" inverted>
                <Icon name="checkmark" /> Return
              </Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default Return;
