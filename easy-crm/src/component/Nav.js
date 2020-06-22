import React from 'react'
import {connect} from 'react-redux';
import {Link, NavLink, withRouter} from 'react-router-dom';

/*
 *  Link: 是React-router中提供的路由切换组件, 基于它可以实现点击时候路由的切换
 *    to [String]: 跳转到指定的路由地址
 *    to [Object]: 可以提供一些参数配置项(和Redirect类似)
 *      {
 *        pathname: 跳转地址
 *        search：问号传参
 *        state: 基于这种方式传递信息
 *      }
 *    replace: false  是替换history stack中当前的地址(true), 还是追加一个新的地址(false)
 *
 *  原理: 基于Link组件渲染, 渲染后的结果就是一个a标签, to对应的信息最后变为href中的内容
 *    <a class="navbar-brand" href="#/?lx=logo">珠峰培训CRM</a>
 *
 *  ------
 *
 *  React-router中提供的组件都要在任何一个router(HashRouter)包裹的范围内使用
 *
 *  ------
 *
 *  NavLink: 和Link类似, 都是为了实现路由切换跳转的, 不同在于, NavLink组件在当前页面hash和组件对应地址相吻合的时候, 会默认给组件加一个active样式, 让其有选中态
 *    和Link类似, to和replace等属性都有, 用法一样
 *
 *    activeClassName: 把默认加的active样式类改为自己设定的
 *    activeStyle: 给匹配的这个NavLink设置行内样式
 *    exact & strict: 控制匹配的时候是否是严格匹配
 *    isActive：匹配后执行对应的函数
 *
 *    <NavLink to='/custom'>最后也会转换为a标签, 如果当前页面的hash地址和此组件中的to地址匹配了, 则会给渲染后的a标签设置默认的样式类: active
 */

/*
 *  withRouter: 这个方法意思是把一个非路由管控的组件, 模拟成为路由管控的组件
 *    <Route path='/' component={Nav}/> 受路由管控的组件
 *
 *    withRouter(connect()(Nav)) 先把Nav基于connect高阶一下, 返回的是一个代理组件proxy, 把返回的代理组件受路由管控
 *
 *  受路由管控组件的一些特点:
 *    1. 只有当前页面的哈希地址(/#/...)和路由指定的地址(path)匹配，才会把对应的组件渲染(withRouter是没有地址匹配, 都被模拟成为受路由管控的)
 *
 *    2. 路由切换的原理, 凡是匹配的路由, 都会把对应的组件内容, 重新添加到页面中; 相反, 不匹配的都会在页面中移除掉, 下一次重新匹配上, 组件需要重新渲染到页面中; 每一次路由切换的时候(页面的哈希路由地址改变), 都会从一级路由开始重新校验一遍
 *
 *    3. 所有受路由管控的组件, 在组件的属性props上都默认添加了三个属性：
 *      history
 *        push  向池子中追加一条新的信息, 达到切换到指定路由地址的目的
 *              this.props.history.push('/plan') JS中实现路由切换
 *        go    跳转到指定的地址(传的是数字 0当前 -1上一个 -2上两个...)
 *        goBack  <=> go(-1) 回退到上一个地址
 *        goForward <=> go(1) 向前走一步
 *        ...
 *
 *      location 获取当前哈希路由渲染组件的一些信息
 *        pathname: 当前哈希路由地址   /custom/list
 *        search: 当前页面的问号传参值  ?lx=unsafe
 *        state: 基于redirect/Link/NavLink中的to, 传递是一个对象, 对象中编写的state, 就可以在location.state中获取到
 *
 *      match  获取的是当前路由匹配的一些结果
 *        params: 如果当前路由匹配的是地址路径参数, 则这里可以获取传递参数的值
 */

class Nav extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return <nav className='navbar navbar-default'>
      {/* logo */}
      <div className='container-fluid col-md-2'>
        <Link className='navbar-brand' to={{
          pathname: '/',
          search: '?lx=logo'
        }}>北斗琥珀CRM</Link>
      </div>

      {/* Nav */}
      <div className='collapse navbar-collapse col-md-10'>
        <ul className='nav navbar-nav'>
          {/* NavLink不是点击谁, 谁有选中的样式(但是可以路由切换), 而且当前页面哈希后的地址和NavLink中的to进行比较, 哪个匹配了, 哪个才有选中的样式 */}
          <li><NavLink to='/' exact>首页</NavLink></li>
          <li><NavLink to='/custom'>客户管理</NavLink></li>
          <li><NavLink to='/plan'>计划管理</NavLink></li>
        </ul>
      </div>
    </nav>;
  }
}
export default withRouter(connect()(Nav));