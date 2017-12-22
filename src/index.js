import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from 'reducers';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import history from 'history';

import Phones from './containers/Phones';
import Phone from './containers/Phone';
import Layout from './containers/Layout';
import BasketPage from './containers/BasketPage'


const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(thunk, routerMiddleware(history))
)); 

// MONSTER LESSON STARTS HERE
 


// MONSTER LESSON ENDS HERE

const App = () => {
  return (
    <Provider store={store} >
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" render={ () => <Layout> <Phones/> </Layout>} />
          <Route path="/categories/:id" render={ () => <Layout> <Phones/> </Layout> } />
          <Route parth="/basket" component={BasketPage} />
          <Route path="/phones/:id" component={Phone} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  )
}



ReactDOM.render(<App />, document.getElementById('root'));
