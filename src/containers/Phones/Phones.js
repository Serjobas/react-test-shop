import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { take } from 'ramda';
import { fetchPhones, fetchCategories, loadMorePhones, addPhoneToBasket } from 'actions/phones'
import { connect } from 'react-redux';
import { getPhones } from 'selectors';

class Phones extends React.Component {

  componentDidMount () {
    this.props.fetchPhones();
    this.props.fetchCategories();
  }

  render() {
    const { phones, loadMorePhones } = this.props;

    return (
      <div>
        <div className="books row">
          {this.getPhoneList(phones)}   
        </div>
        <div className="row">
          <div className="col-md-12">
            <button
              onClick={loadMorePhones}
              className="pull-right btn btn-primary"
            >
              Load more
            </button>
          </div>
        </div>
      </div>
    )
  }

  getPhoneList = (phones) => {
    return phones.map(phone => this.getPhone(phone));
  }

  getPhone = (phone) => {
    const shortDescription = `${take(60, phone.description)}...`

    return (
      <div className="col-sm-4 col-lg-4 col-md-4 book-list" key={phone.id}>
          <div className="thumbnail">
          <img 
            src={phone.image} 
            alt={phone.name} 
            className="img-thumbnail"
          />
            <div className="caption">
            <h4 className="pull-right"> ${phone.price} </h4>
            <h4>
              <Link to={`/phones/${phone.id}`}>
                {phone.name}
              </Link>  
            </h4>
            <p>{shortDescription}</p>
            <p className="itemButton">
              <button 
                className="btn btn-primary"
                onClick={ () => this.props.addPhoneToBasket(phone.id) }
              >Buy now!</button>
              <Link 
                to={`/phones/${phone.id}`}
                className="btn btn-default"
              >
              More info 
              </Link>
            </p>
          </div>
          </div>
      </div>
    )
  }

}


const mapStateToProps = (state, ownProps) => ({
  phones: getPhones(state, ownProps)
})

export default withRouter(connect(mapStateToProps, { 
  fetchPhones, 
  loadMorePhones, 
  addPhoneToBasket,
  fetchCategories
 })(Phones));