import React, { Component } from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { apiUrl } from "../../utils/api-config";
import http from "../../services/httpService";
import Paginate from "../inventory/pagination";
import { Button, Table } from 'semantic-ui-react'


const initialPagination = {
    activePage: 1,
    totalPages: 0,
    per_page: 10
  }

class StockReport extends Component{
    constructor(props){
        super(props);
        this.state={
            ...initialPagination,
            itemsData: [ ]
        }
    }

    exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Item Stock Report";
        const headers = [["NAME","CATEGORY", "STOCK", "UNIT PRICE"]];
    
        const data = this.state.itemsData.map(elt=> [elt.name, elt.category.name, elt.current_stock, elt.sale_price]);
    
        let content = {
          startY: 50,
          head: headers,
          body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("report.pdf")
      }

      handlePagination = (page, per_page) => {
        this.setState({activePage: page, per_page:per_page });
    
        http
          .get(`${apiUrl}/api/v1/items`,{params:{page, per_page}})
          .then(res => {
            this.setState({
              itemsData:res.data[1],
              totalPages: res.data[0].total
            });
          });
    
          this.setState({state: this.state});
      }
    

      componentDidMount(){
          const {activePage, per_page} = this.state;
          this.handlePagination(activePage, per_page);
      }

    render(){
        const {itemsData, activePage, per_page, totalPages} = this.state;
        console.log(itemsData);
        return(
            <div>
                <div>
                    <Button icon="download" content='Download' color="green" onClick={() => this.exportPDF()} />
                </div>

                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>category</Table.HeaderCell>
                            <Table.HeaderCell>Current Stock</Table.HeaderCell>
                            <Table.HeaderCell>Unit Price</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    {             
                        itemsData.map( item => (
                        <Table.Row key={item.id}>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{item.category.name}</Table.Cell>
                            <Table.Cell>{item.current_stock}</Table.Cell>
                            <Table.Cell>{item.sale_price}</Table.Cell>
                        </Table.Row>
                        ))
                    }
                    </Table.Body>
                </Table>
                {
                    totalPages>0? 
                    <Paginate handlePagination = {this.handlePagination} pageSet ={{ activePage, totalPages, per_page }}/>:null
                }
            </div>
        )
    }

}
export default StockReport