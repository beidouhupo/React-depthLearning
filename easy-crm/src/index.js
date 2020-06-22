import React from 'react';
import ReactDOM, {render} from 'react-dom';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store/index';

/* import component */
import Nav from './component/Nav';
import Home from './routes/Home';
import Custom from './routes/Custom';
import Plan from './routes/Plan';

/* import css */
import 'bootstrap/dist/css/bootstrap.css';
import './static/css/common.css';

render(<Provider store={store}>
  <HashRouter>
    <div>
      {/* Nav: header区域 */}
      {/* <Route path='/' component={Nav}/> */}
      <Nav/>

      {/* 基于HashRouter展示不同的页面 */}
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/custom' component={Custom}/>
        <Route path='/plan' component={Plan}/>
        <Redirect to='/?lx=unsafe'/>
      </Switch>
    </div>
  </HashRouter>
</Provider>, document.getElementById('root'));

/*
 *  OA: 企业办公管理系统(偏向于有助于日常办公)
 *  ERP: 企业战略资源管理系统(偏向于有管理思想)
 *    => 钉钉
 *    => TAPD
 *    => 今目标
 *    => 纷享销客
 *    => ...
 *
 *  CRM: 客户管理系统
 *  CMS: 内容管理系统(内容分发平台)
 *  IM: 即时通讯系统
 */

