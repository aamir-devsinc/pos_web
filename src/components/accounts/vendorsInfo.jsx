import React, { Component } from "react";
import { Container, Header, Image, Grid, Segment, Label } from "semantic-ui-react";
import http from "../../services/httpService.js";
import { apiUrl } from "../../utils/api-config";

const dateOptions = {
  year: "numeric",
  month: "long",
  day: "numeric"
};
class VendorsInfo extends Component {
  state = {
    transactions: [],
    initialBalance: 0,
    totalAmount: 0,
    remainingAmount: 0
  }
  calculateAmount = () =>{
    const {transactions}=this.state
    console.log(this.state);
    Array.prototype.forEach.call(transactions, element => {
      this.setState(prevstate=>({
        remainingAmount:prevstate.remainingAmount+element.amount
      }));
    });
  }

  getVendorTransactions = () => {
    const { pathname } = window && window.location;
    var arr = pathname.split("/");
    const vendorID = parseInt(arr[arr.length - 1]);
    http
      .get(`${apiUrl}/api/v1/transactions`, { params: { vendorID } })
      .then(res => {
        this.setState({
          transactions: res.data.results[1]
        },()=>{
          this.calculateAmount();
        });
      })
      .catch(error => console.log(error))
  }


  componentDidMount() {
    this.getVendorTransactions();
  }

  render() {
    const { transactions, initialBalance, totalAmount, remainingAmount } = this.state;
    return (
      <React.Fragment>
        <Container className="page-header">
          <Header as="h2" className="second-header" floated="right">
            Devsinc
					</Header>
          <Header as="h2" floated="left">
            <Image className="logo" src={require("../../images/logo.png")} />
            <span className="header-text">Vendor</span>
          </Header>
        </Container>
        <div className="ui divider" />
        <Grid columns={2} centered>
          <Grid.Column>
            <Segment raised>
              <Label as='a' color='red' size="large" ribbon style={{ marginBottom: "10px" }}>
                Vendor Account
              </Label>
              <div>
                <Label as='a' color='blue' size="large">
                  Initial Balance:
                  <Label.Detail>{initialBalance}</Label.Detail>
                </Label>
                <Label as='a' color='teal' size="large">
                  Total Amount:
                  <Label.Detail>{totalAmount}</Label.Detail>
                </Label>
                <Label as='a' color='yellow' size="large">
                  Remaining Amount:
                  <Label.Detail>{remainingAmount}</Label.Detail>
                </Label>
              </div>
            </Segment>
          </Grid.Column>
        </Grid>
        <h3>Transactions</h3>
        <table className="table table-bordered table-striped mb-1 account-table">
          <thead style={{ color: "white", background: "#1969a4" }}>
            <tr>
              <th scope="col">Txn ID</th>
              <th scope="col">Debit</th>
              <th scope="col">Credit</th>
              <th scope="col">Date</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(item => {
              return (
                <tr key={item.id}>
                  <th scope="row">{item.transaction_code}</th>
                  <td>{item.amount > 0 ? item.amount : 0}</td>
                  <td>{item.amount < 0 ? item.amount : 0}</td>
                  <td>{new Intl.DateTimeFormat("en-PK", dateOptions).format(
                    new Date(item.transaction_date)
                  )}
                  </td>
                  <td>{item.details}</td>

                </tr>)
            })}
          </tbody>
        </table>
      </React.Fragment>
    )
  }
}

export default VendorsInfo;