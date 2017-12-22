import React from 'react';

import Basket from '../Basket';
import Search from '../Search';
import Categories from '../Categories'

class Sidebar extends React.Component {
  render() {
    return(
      <div>
        <Search />
        <Basket />
        <Categories />
      </div>
    )
  }
}

export default Sidebar;