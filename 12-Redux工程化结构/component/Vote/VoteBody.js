import React from 'react'
// import PropTypes from 'prop-types';

export default class VoteBody extends React.Component {
  constructor(props, context) {
    super(props, context);
    
    //=>INIT STATE
    let {n, m} = this.props.store.getState().vote;
    this.state = {n, m};
  }

  componentDidMount() {
    this.props.store.subscribe(() => {
      let {n, m} = this.props.store.getState().vote;
      this.setState({n, m});
    });
    //unsubscribe(); 把当前追加的方法移除，解除绑定的方式
  }

  render() {
    let {n, m} = this.state,
        rate = (n / (n + m)) * 100;
    /* eslint-disable no-unused-expressions */
    isNaN(rate) ? (rate = 0) : null;

    return <div className={'panel-body'}>
      支持人数: <span>{n}</span>
      <br/>
      反对人数: <span>{m}</span>
      <br/>
      支持率: <span>{rate.toFixed(2) + '%'}</span>
    </div>;
  }
}