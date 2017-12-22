import React from 'react';
import { connect } from 'react-redux';
import { getCategories, getActiveCategoryName } from 'selectors';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import * as R from 'ramda';

const Categories = ({ categories, activeCategoryName }) => {

  const getCategory = (category, index) => {

    const getActiveState = (category) => {
      return activeCategoryName === category.name.toLowerCase();
    };

    const linkClass = classNames({
      'list-group-item': true,
      'active': getActiveState(category)
    })

    return (
      <Link
        to={`/categories/${category.name.toLowerCase()}`}
        className={linkClass}
        key={index}
      >
        {category.name}
      </Link>
    )
  }

  const getAllCategory = () => {
    const linkClass = classNames ({
      'list-group-item': true,
      'active': !activeCategoryName 
    })

    return (
      <Link
        to="/"
        className={linkClass}
      >
       All
      </Link>
    )
  }

  

  return (
    <div className="well">
      <h4>Brand</h4>
      <div className="list-group">
        {getAllCategory()}
        {categories && categories.map((category, index) => getCategory(category, index) )}
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  categories: getCategories(state),
  activeCategoryName: getActiveCategoryName(ownProps)
})

export default withRouter(connect(mapStateToProps)(Categories));