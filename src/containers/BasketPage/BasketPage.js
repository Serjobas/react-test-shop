import React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { Link } from 'react-router-dom';
import { removePhoneFromBasket, basketCheckout, clearBasket } from 'actions/phones'
import { getTotalBasketPrice, getBasketPhonesWithCount } from 'selectors';

const BasketPage = ({ phones, totalPrice, removePhoneFromBasket, basketCheckout, clearBasket }) => {

  const isBasketEmpty = R.isEmpty(phones);

  const getContent = () => (
    <div> 
      {isBasketEmpty && <div> Your shopping cart is empty </div>}

      <div className="table-responsive">
        <table className="table-bordered table-striped table-condensed cf">
          <tbody>
            {phones.map((phone, index) => (
              <tr
                key={index}
                className="item-checout"
              >
                <td className="first-column-checkout">
                    <img 
                      src={phone.image} 
                      alt={phone.name}
                      className="img-thumbnail"
                    />
                </td>
                <td>{phone.name}</td>
                <td>${phone.price}</td>
                <td>{phone.count}</td>
                <td>
                  <span 
                    className="delete-cart"
                    onClick={ () => removePhoneFromBasket(phone.id) } 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {
        R.not(isBasketEmpty) && (
          <div className="row">
            <div className="pull-right total-user-checkout">
              <b>Total: </b>
              ${totalPrice}
            </div>
          </div>
        )
      }
    </div>
  )

  const getSidebar = () => (
    <div>
      <Link
        to="/"
      >
        <span className="glyphicon glyphicon-info-sign" />
        <span>Continue shopping</span>
      </Link>
      {
        R.not(isBasketEmpty) && 
          <div>
            <button
              onClick={clearBasket}
              className='btn btn-danger'
            >
              <span className="glyphicon glyphicon-trash" />
              Clear cart
            </button>
            <button 
              className="btn btn-success"
              onClick={ () => basketCheckout(phones) }
            >
              <span className="glyphicon glyphicon-envelope" />
              Checkout    
            </button>
          </div>
      }
    </div>
  )
  
  return (
     <div className="view-container">
       <div className="container">
         <div className="row">
           <div className="col-md-9">
            {getContent()}
           </div>
           <div className="col-md-3 btn-user-checkout">
            {getSidebar()}
           </div>
         </div>
       </div>
     </div>
  )
}

const mapStateToProps = state => ({
  phones: getBasketPhonesWithCount(state),
  totalPrice: getTotalBasketPrice(state)
})

export default connect(mapStateToProps, { removePhoneFromBasket, clearBasket, basketCheckout })(BasketPage);