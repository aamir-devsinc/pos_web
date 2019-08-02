import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'

const tableData = [
  { name: 'John', quantity: 15, category: 'nokia', price: 300 },
  { name: 'Amber', quantity: 40, category: 'samsung', price: 300 },
  { name: 'Leslie', quantity: 25, category: 'apple', price: 300 },
  { name: 'Ben', quantity: 70, category: 'huwai', price: 300 },
]

class CategoryDropDown extends Component {
  state = { searchQuery: '' }

  handleChange = (e, { searchQuery, value }) =>
    this.setState({ searchQuery, value })

  handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery })

  render() {
    const { searchQuery, value } = this.state

    return (
      <Dropdown
        fluid
        multiple
        onChange={this.handleChange}
        onSearchChange={this.handleSearchChange}
        options={tableData}
        placeholder='State'
        search
        searchQuery={searchQuery}
        selection
        value={value}
      />
    )
  }
}

export default CategoryDropDown;