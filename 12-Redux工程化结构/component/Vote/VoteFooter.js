import React from 'react'
// import PropTypes from 'prop-types';
import action from '../../store/action';

export default class VoteFooter extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {  
    return <div className={'panel-footer'}>
      <button className={'btn btn-success'} 
              onClick={() => {
                this.props.store.dispatch(action.vote.support());
              }}>支持</button>
      &nbsp;&nbsp;
      <button className={'btn btn-danger'} 
              onClick={() => {
                this.props.store.dispatch(action.vote.against());
              }}>反对</button>
    </div>;
  }
}