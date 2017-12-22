import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getTotalBasketCount, getTotalBasketPrice } from 'selectors';

const Basket = ({totalBasketCount, totalBasketPrice}) => {
  return (
    <div className="cart">
      <div className="dropdown">
        <Link 
          to="/basket" 
          id="dLabel" 
          className="btn btn-inverse btn-block btn-lg"
        >
        <i className="fa fa-fa-shopping-cart" />
        <span>{` ${totalBasketCount} item(s) -  $${totalBasketPrice} `}</span>
        </Link>
      </div>
    </div>
  )
}

const mapStateToPRops = state => ({
  totalBasketCount: getTotalBasketCount(state),
  totalBasketPrice: getTotalBasketPrice(state)
})

export default connect(mapStateToPRops)(Basket);