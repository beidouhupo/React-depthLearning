import React from 'react';
import ReactDOM, {render} from 'react-dom';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';

import A from './component/A';
import B from './component/B';
import C from './component/C';

/*
 *  HashRouter
 *    1. 当前项目一旦使用HashRouter, 则默认在页面的地址后面加上'#/', 也就是hash默认值是一个斜杠，我们一般让其显示首页组件信息内容
 *
 *    2. HashRouter中只能出现一个子元素
 *
 *    3. HashRouter机制中, 我们需要根据哈希地址不同, 展示不同的组件内容, 此时需要使用route
 *
 *  route
 *    path: 设置匹配地址, 但是默认不是严格匹配, 当前页面哈希地址只要包含完整的它(内容是不变的), 都能被匹配上
 *    path='/': 和它匹配的地址只要有斜杠即可(都能和它匹配)
 *    path='/user': '#/user/login'也可以匹配, 但是'#/user2'这个无法匹配
 *
 *    component: 一但哈希值和当前route的path相同了, 则渲染component指定的组件
 *
 *    exact: 让path的匹配严谨和严格一些(只有url哈希值和path设定的值相等才可以匹配到)
 *    PATH='/': '#/'匹配, 但是'#/user'就不再匹配了
 *
 *    strict
 *
 *    render：当页面的哈希地址和path匹配, 会把render规划的方法执行, 在方法中一般做"权限校验"(渲染组件之前验证是否存在权限, 不存在做一些特殊处理)
 *
 *    默认情况下, 会和每一个route都做校验(哪怕之前已经有校验成功的);
 *    Switch组件可以解决这个问题, 和Switch Case一样, 只要有一种情况校验成功, 就不在向后校验了
 */

render(<HashRouter>
  <Switch>
    <Route path='/' exact component={A}/>
    <Route path='/user' component={B}/>
    <Route path='/pay' render={() => {
      let flag = localStorage.getItem('FLAG');
      if (flag && flag === 'SAFE') {
          return <C/>;
      }
      return '当前环境不安全, 不建议支付';
    }}/>

    {/* 上述都设置完成后, 会在末尾设置一个匹配: 以上都不符合的情况下, 我们认为路由地址是非法的地址, 我们做一些特殊处理(Route不设置path是匹配所有地址规则的) */}
    {/* <Route render={() => {
      return <div>404</div>;
    }}/>  */}

    {/*
      *  也可以基于Redirect进行重定向
      *    to [String]: 重新定向到新的地址
      *    to [Object]: 重新定向到新的地址, 只不过指定了更多的信息
      *      {
      *        pathname: 定向的地址
      *        search: 给定向的地址问号传参(结合当前案例, 真实项目中, 我们有时候会根据是否存在问号参数值来统计是正常进入首页还是非正常跳转过来的, 也有可能根据问号传参值做不同的事情)
      *        state: 给定向后的组件传递一些信息
      *      }
      *
      *    push: 如果设置了这个属性, 当前跳转的地址会加入到history stack中一条记录
      *    form: 设定当前来源的页面地址
      *    <Redirect from='/custom' to='/custom/list'/>
      *    如果当前请求的hash地址是"/custom", 我们让其重定向到"/custom/list"
      */}
    {/*<Redirect to='/?lx=404'/>*/}
    <Redirect to={{
      pathname: '/',
      search: '?lx=404'
    }}/>
  </Switch>
</HashRouter>, document.getElementById('root'));



/*
 *  使用React路由实现SPA
 *    1. 安装路由  $ yarn add react-router-dom
 *       3及以前版本称为react-router
 *       4及最新版本称为react-router-dom
 *
 *    2. 学习React路由
 *       http://reacttraining.cn/web/api/
 *
 *    3. BrowserRouter VS HashRouter
 *       它是两种常用的路由实现思想, BrowserRouter浏览器路由, HashRouter哈希路由
 *
 *    [BrowserRouter]
 *       它是基于H5中history API(pushState, replaceState, popstate)来保持UI和URL的同步, 真实项目中应用的不多, 一般只有当前项目是基于服务器端渲染的, 我们才会使用浏览器路由
 *       http://www.demo.com/
 *       http://www.demo.com/peraonal/
 *       http://www.demo.com/peraonal/login/
 *
 *    [HashRouter]
 *       真实项目中(前后端分离的项目: 客户端渲染), 我们经常使用的是哈希路由来完成的, 它依据相同的页面地址, 不同的哈希值, 来规划当前页面中的哪一个组件呈现渲染, 它基于原生JS构造了一套类似于history API的机制, 每一次路由切换都是基于history stack完成的！
 *       http://www.demo.com/#/
 *       http://www.demo.com/#/peraonal
 *       http://www.demo.com/#/peraonal/login
 */

/*
 *  单页面应用(SPA: single page web application)
 *    只有一个页面, 所有需要展示的内容都在这一个页面中实现切换, webpack中只需要配置一个入口即可(移动端单页面应用居多 或者 PC端管理系统类也是单页面应用为主)
 *
 *  多页面应用(MPA: multi page web application)
 *    一个项目由很多页面组成, 使用这个产品, 主要就是页面之间的跳转(PC端多页面应用居多); 基于框架开发的时候, 需要在webpack中配置多入口, 每一个入口对应一个页面;
 *
 *  -----------
 *
 *  如何实现单页面应用?
 *    1. 如果项目是基于服务器渲染的，后台语言中可以基于“include”等技术，把很多部分拼凑在一起，实现组件化或者插件化开发，也可以实现单页面应用。
 *
 *    2. 基于iframe实现单页面应用
 *
 *    3. 模块化开发
 *       AMD: Require.js
 *       CMD: Sea.js
 *    基于这些思想把每一部分单独写成一个模块, 最后基于grunt/gulp/fis等自动化工具, 最后把所有的模块都合并到首页面中(包括HTML、CSS、JS都合并在一起), 通过控制哪些模块的显示隐藏来实现单页面应用开发
 *    弊端: 由于首页中的内容包含了所有模块的信息, 所以第一次加载速度很慢(虽然可以解决但是相对来说比较的麻烦)
 *
 *    4. 基于Vue/React实现模块化组件化开发, 基于他们提供的路由实现SPA单页面应用, 基于webpack打包等
 */