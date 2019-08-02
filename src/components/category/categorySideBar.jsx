import React, { Component } from 'react'
import { Accordion } from 'semantic-ui-react'

const categories = {
    mobiles:{
        tablets:{
            samsung:{
                price: 300
            },
            iphone:{
                price: 500,
            },
            sony:{
                price: 200
            }
        },
        accessories:{
            earPod:{
                price: 50
            },            
            charger:{
                price: 30
            },
            bluthooth:{
                price: 100
            }
        },
        mobile_phones:{
            samsung:{
                price: 200
            },
            iphone:{
                price: 500
            },
            sony:{
                price: 200
            },
            huawei:{
                price: 100
            }
        }
    }
}

function isObjectDefined (Obj) {
    if (Obj === null || typeof Obj !== 'object' ||
      Object.prototype.toString.call(Obj) === '[object Array]') {
      return false
    } else {
      for (var prop in Obj) {
        if (Obj.hasOwnProperty(prop)) {
          return true
        }
      }
      return JSON.stringify(Obj) !== JSON.stringify({})
    }
  }


export default class categorySideBar extends Component {
    constructor(props){
        super(props);
        this.state ={
        }

    }

    generateAccordion = (obj, key) => {
        obj = obj[key];
        return ( 
        <div>
          {obj? 
         <Accordion.Accordion panels={this.createPanel(obj)}  />        
          : null}
        </div>
      );
    }

    createPanel = (obj) => {
        let penalArray=[];
        if(isObjectDefined(obj)){
          Object.keys(obj).map(data =>{
            penalArray.push(
            { key: data, title: data, content: { content: this.generateAccordion(obj, data) } },
            );
          });
        }
        return penalArray;
    }

    render() {
        return (
            <div>
                <label><strong>All Categories</strong></label>
                <Accordion defaultActiveIndex={0} panels={this.createPanel(categories)} styled />
            </div>
        )
    }
}
