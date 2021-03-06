/*
 * vote版块的reducer
 *    state：原始redux管理的状态信息（设置初始值）
 *    action：dispatch派发的时候传递的行为对象 {type,...}
 *
 * import * as TYPE from '../action-types' 把模块中所有导出的内容全部导入并重新命名为type,此后type对象中包含了所有导出的信息(ES6 Module)
 */
import * as TYPE from '../action-types';

export default function vote(state = {
  n: 0,
  m: 0
}, action) {
  switch (action.type) {
    case TYPE.VOTE_SUPPORT:
      state = {...state, n: state.n + 1};
      break;
    case TYPE.VOTE_AGAINST:
      state = {...state, m: state.m + 1};
      break;
  }
  return state;
};