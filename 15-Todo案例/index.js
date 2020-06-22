import React from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';

/* import css */
import 'bootstrap/dist/css/bootstrap.css';
import './static/less/todo.less';

/* import component */
import Head from "./component/Head";
import Body from "./component/Body";
import Footer from "./component/Footer";

render(<Provider store={store}>
  <main className='panel panel-default'>
    <Head/>
    <Body/>
    <Footer/>
  </main>
</Provider>, document.getElementById('root'));

import React from 'react';
import ReactDOM, {render} from 'react-dom';
import {HashRouter, Route} from 'react-router-dom';

import A from './component/A'

render(<HashRouter>
  <Route path=''/>
</HashRouter>, document.getElementById('root'));