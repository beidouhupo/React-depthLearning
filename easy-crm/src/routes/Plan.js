import React from 'react'
import {connect} from 'react-redux';

class Plan extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return <div>
      计划管理页内容
    </div>;
  }
}
export default connect()(Plan);