import React, { Component } from 'react';
import CategoryDropDown from './categoryDropDown';
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

class CategorySearch extends Component {

  render() {
    return (
      <div>
        <CategoryDropDown></CategoryDropDown>
      </div>
    )
  }
}


export default CategorySearch;