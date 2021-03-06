import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';

import { fetchPhoneById, addPhoneToBasket } from 'actions/phones';
import { getPhoneById } from 'selectors';

import Basket from '../../components/Basket';
import { Link } from 'react-router-dom';

class Phone extends React.Component {

  componentDidMount () {
    this.props.fetchPhoneById(this.props.match.params.id);
  }

  render () {
    if(!this.props.phone) return <h1> There is no phone </h1>;
    return (
      <div className="view-container">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              { this.getContent() }
            </div>
            <div className="col-md-3">
              { this.getSidebar() }
            </div>
          </div>
        </div>
      </div>
    )
  }

  getContent = () => {
    const { phone } = this.props;

    return (
      <div className="thumbnail">
        <div className="row">
          <div className="col-md-6">
          <img 
            src={phone.image} 
            alt={phone.name} 
            className="img-thumbnail"
          />
          </div>
          <div className="col-md-6"> 
            {this.getFields()}
          </div>
        </div>
        <div className="caption-full">
          <h4 className="pull-right"> {phone.price} </h4>
          <h4>{phone.name}</h4>
          <p>{phone.description}</p>
        </div>
      </div>   
    )
  }

  getSidebar = () => {
    const {phone, addPhoneToBasket} = this.props;
    return (
      <div>
        <p className="lead">Quick shop</p>
        <Basket />
        <div className="form-group">
          <h1>{phone.name}</h1>
          <h2>${phone.price}</h2>
        </div>
        <Link 
          to="/" 
          className="btn btn-info btn-block"
        >
          Back to store
        </Link>
        <button
          type="button"
          className="btn btn-success btn-block"
          onClick={ () => addPhoneToBasket(phone.id) }
        >
          Add to card
        </button>
      </div>
    )
  }

  getFields = () => {
    const {phone} = this.props;
    const columnFields = R.compose(
      R.toPairs,
      R.pick([
        'cpu',
        'camera',
        'size',
        'weight',
        'display',
        'battery',
        'memory'
      ])
    )(phone);

    return columnFields.map( ([key,value]) => (
      <div className="column" key={key}>
        <div className="ab-details-title">
          <p>{key}</p>
        </div>
        <div className="ab-details-info">
          <p>{value}</p>
        </div>
      </div>
    ));
  }
}

const mapStateToProps = state => ({
  phone: getPhoneById(state, state.phonePage.id)
})

export default connect(mapStateToProps, { fetchPhoneById, addPhoneToBasket })(Phone);