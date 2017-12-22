import React from 'react';
import { connect } from 'react-redux'; 
import { searchPhone } from 'actions/phones';

class Search extends React.Component {

  state = {
    searchValue: ''
  }

  handleChange = (e) => {
    this.setState({
      searchValue: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let value = this.state.searchValue;
    console.log(value);
    this.props.searchPhone(value);
  }

  render(){
    return (
      <div className="well blosd">
        <h3 className="lead">Quick Shop</h3>
        <div className="input-group">
          <form onSubmit={this.handleSubmit}>
            <input 
              onChange={this.handleChange}
              type="text"
              className="form-control"
            />
          </form>
          <span className="input-group-btn">
            <button 
              className="btn btn-default"
              onClick={this.handleSubmit}
            >
            <span className="glyphicon glyphicon-search"></span>
            </button>
          </span>
        </div>
      </div>
    )
  }
}

export default connect(null, { searchPhone } )(Search);