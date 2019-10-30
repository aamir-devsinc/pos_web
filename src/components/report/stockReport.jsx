import React, { Component } from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { apiUrl } from "../../utils/api-config";
import http from "../../services/httpService";
import Paginate from "../inventory/pagination";
import Loader from "../Loader/loader"
import { Button, Table, Container, Header, Image, Grid, Input } from "semantic-ui-react";

const initialPagination = {
  activePage: 1,
  totalPages: 0,
  per_page: 10
};

class StockReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialPagination,
      isLoading: true,
      itemsData: [],
      allItems: [],
      item: ""
    };
  }

  exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Items Stock Report";
    const headers = [["NAME", "CATEGORY", "STOCK", "UNIT PRICE"]];
    const data = this.state.allItems.map(elt => [elt.name, elt.category.name, elt.current_stock, elt.sale_price]);


    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("stock_report.pdf")

  }

  handlePagination = (page, per_page) => {
    this.setState({ activePage: page, per_page: per_page });
    const { item } = this.state;

    http
      .get(`${apiUrl}/api/v1/items`, { params: { page, per_page, item } })
      .then(res => {
        this.setState({
          itemsData: res.data[1],
          totalPages: res.data[0].total,
          isLoading: false
        });
      });
    this.setState({ state: this.state });
  };

  getItems = () => {
    http.get(`${apiUrl}/api/v1/items`).then(res => {
      this.setState({
        allItems: res.data[1]
      });
    });
  };

  searchHandler = e => {
    this.setState({ item: e.target.value }, () => {
      const { per_page } = this.state;
      this.handlePagination(1, per_page);
    });
  };

  componentDidMount() {
    const { activePage, per_page } = this.state;
    this.handlePagination(activePage, per_page);
    this.getItems();
  }

  render() {
    const { itemsData, activePage, per_page, totalPages, isLoading } = this.state;

    return (
      <div>
        <Container className="page-header">
          <Header as="h2" className="second-header" floated="right">
            Devsinc
          </Header>
          <Header as="h2" floated="left">
            <Image className="logo" src={require("../../images/logo.png")} />
            <span className="header-text">Stock Report</span>
          </Header>
        </Container>
        <div className="ui divider"></div>
        <Grid container="true">
          <Grid.Row>
            <Grid.Column width="13" floated="left">
              <Input
                icon="search"
                placeholder="Search Items"
                onChange={this.searchHandler}
              />
            </Grid.Column>
            <Grid.Column width="3">
              <Button
                icon="download"
                content="Download"
                color="green"
                onClick={() => this.exportPDF()}
                floated="right"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div className="table-wrapper-scroll-y my-custom-scrollbar">
          <table className="table table-bordered table-striped mb-1 mt-2 account-table">
            <thead style={{ color: "white", background: "#1969a4" }}>
              <tr>
                <th scope="col">Item Code  </th>
                <th scope="col">Item Name  </th>
                <th scope="col">Category</th>
                <th scope="col">Current Stock</th>
                <th scope="col">Unit Price</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading ? itemsData.map(item => {
                return (
                  <tr key={item.id}>
                    <th scope="row">{item.code}</th>
                    <td>{item.name}</td>
                    <td>{item.category.name}</td>
                    <td>{item.current_stock}</td>
                    <td>{item.sale_price}</td>
                  </tr>
                )
              }) : <Loader />}
            </tbody>
          </table>
        </div>
        {totalPages > 0 ? (
          <Paginate
            handlePagination={this.handlePagination}
            pageSet={{ activePage, totalPages, per_page }}
          />
        ) : <h1 className="items-record">No Record Found</h1>}
      </div>
    );
  }
}
export default StockReport