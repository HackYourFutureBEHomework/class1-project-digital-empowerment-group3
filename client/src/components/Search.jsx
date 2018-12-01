import React, {Component} from 'react'
import SearchInput, {createFilter} from 'react-search-input'

const KEYS_TO_FILTERS = ['module.title'];

export default class Modules extends Component {
    constructor (props) {
      super(props)
      this.state = {
        searchTerm: ''
      }
      this.searchUpdated = this.searchUpdated.bind(this)
    }
   
    render () {
      const filteredEmails = modules.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
      return (
          <button>click here</button>
        <div>
          <SearchInput className="search-input" onChange={this.searchUpdated} />
          {modules.map(module => {
            return (
              <div className="module-find" key={module.title}>
                <div className="from">{module}</div>
                <div className="subject">{module}</div>
              </div>
            )
          })}
        </div>
      )
    }
   
    searchUpdated (term) {
      this.setState({searchTerm: term})
    }
  }
   
    searchUpdated (term) {
      this.setState({searchTerm: term})
    }
  }
   