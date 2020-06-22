import React from 'react'
import PropTypes from 'prop-types';

import VoteHead from './VoteHead';
import VoteBody from './VoteBody';
import VoteFooter from './VoteFooter';

export default class Vote extends React.Component {
  //=>props
  static defaultProps = {
    title: '标题未知',
    count: {
      n: 0,
      m: 0
    }
  };

  /*
   *  在父组件中
   *    需要安装: prop-types
   * 
   *    1. 设置子组件上下文属性值类型
   *      static childContextTypes = {};
   * 
   *    2. 获取子组件的上下文(设置子组件的上下文属性信息)
   */     getChildContext() {return {}}

  //=>context
  static childContextTypes = {
    n: PropTypes.number,
    m: PropTypes.number,
    callBack: PropTypes.func
  };

  getChildContext() {
    //=>return的内容相当于给子组件上下文设置的内容
    //=> 只要render重新渲染, 就会执行这个方法, 重新更新父组件中的上下文信息: 如果父组件上下文信息更改了, 子组件再重新调取的时候, 会使用最新的上下文信息: (render=>context=>子组件调取渲染)
    let {n, m} = this.state;
    return {
      n,
      m,
      callBack: this.updateContext
    };
  }

  updateContext = type => {
    //=>type: support/against
    if (type === 'support') {
      this.setState({n: this.state.n + 1});
      return;
    }
    this.setState({m: this.state.m + 1});
  };

  constructor(props) {
    super(props);

    //=>init state
    let {count: {n = 0, m = 0}} = this.props;
    this.state = {n, m};
  }

  render() {
    let {title} = this.props;

    return <section className={'panel panel-default'} 
                    style={{width: '50%', margin: '20px auto'}}>
      <VoteHead title={title}/>
      <VoteBody/>
      <VoteFooter/> 
    </section>;
  }
}