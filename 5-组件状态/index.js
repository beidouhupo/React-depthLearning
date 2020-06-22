import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

/*
 *  React中的组件有两个非常重要的概念:
 *    1. 组件的属性: [只读]调取组件的时候传递进来的信息
 *    2. 组件的状态: [读写]自己在组件中设定和规划的(只有类声明式组件才有状态的管控, 函数式组件声明不存在状态的管理)
 *    =>组件状态类似于Vue中的数据驱动: 我们数据绑定的时候是基于状态值绑定, 当修改组件状态后, 对应的JSX元素也会跟着重新渲染(差异渲染: 只要数据改变的部分重新渲染, 基于DOM-DIFF算法完成)
 *    =>当代前端框架最重要的核心思想就是: "数据控制视图(视图影响数据)", 让我们告别JQ手动操作DOM的时代, 我们以后只需要改变数据, 框架会帮我们重新渲染视图, 从而减少直接操作DOM(提升性能, 也有助于开发效率)
 */

class Clock extends React.Component {
  constructor() {
    super();
    //=> 初始化组件的状态(都是对象类型的): 要求我们在constructor中, 需要把后期使用的状态信息全部初始化一下(约定俗成的语法规范)
    this.state = {
      time: new Date().toLocaleString()
    }
  }

  componentDidMount() {
    //=>React生命周期函数之一: 第一次组件渲染完成后触发(我们在这里只需要间隔1000ms把state状态中的time数据改变, 这样React会自动帮我们把组件中的部分内容进行重新的渲染)
    setInterval(() => {
      //=>React中虽然下面方式可以修改状态, 但是并不会通过React重新渲染页面, 所以不要这样去操作和修改状态
      // this.state.time = new Date().toLocaleString();
      // console.log(this.state.time);

      /*
       *  修改组件的状态
       *    1. 修改部分状态, 会用我们传递的对象和初始化的state进行匹配, 只要我们传递的属性进行修改, 没有传递的依然保留原始的状态信息(部分状态修改)
       *    2. 当状态修改完成, 会通知React把组件JSX中的部分元素重新进行渲染
       */
      this.setState({
        time: new Date().toLocaleString()
      }, () => {
        //=>当通知React把需要重新渲染的JSX元素渲染完成后, 执行的回调操作(类似于生命周期函数中的componentDidUpdate, 项目中一般使用钩子函数而不是这个回调)
        //=>设置回调函数的原因: setState是异步操作
      });
    }, 1000);
  }

  render() {
    return <section>
      <h3>当前北京时间为: </h3>
      <div style={{color: 'red', fontWeight: 'bold'}}>
        {/* 获取组件的状态信息 */}
        {this.state.time}
      </div>
    </section>
  }
}

ReactDOM.render(<Clock/>, document.getElementById('root'));



/*
 *  所谓函数式组件是静态组件: 和执行普通函数一样, 调取一次组件, 就把组件中的内容获取到, 插入到页面中, 如果不重新调取组件, 显示的内容是不会发生任何改变的
 *
 *  真实项目中只有调取组件, 组件中的内容不会再次改变的情况下, 我们才有可能使用函数式组件
 */

/*
function Clock() {
  return <section>
    <h3>当前北京时间为: </h3>
    <div style={{color: 'red', fontWeight: 'bold'}}>
      {new Date().toLocaleString()}
    </div>
  </section>
}
setInterval(() => {
  //=> 每间隔1000MS重新调取组件, 然后渲染到页面中
  ReactDOM.render(<Clock/>, 
    document.getElementById('root'));
}, 1000);
*/
