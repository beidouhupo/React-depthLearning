import {createStore, applyMiddleware} from 'redux';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import reducer from './reducer';

let store = createStore(reducer, applyMiddleware(reduxLogger, reduxThunk, reduxPromise));
export default store;

/*
 * redux中间件
 *   redux-logger: 能够在控制台清晰的展示出当前redux操作的流程和信息(原有状态、派发信息、修改后的状态信息)
 *
 *   redux-thunk: 处理异步的dispatch派发
 *
 *   redux-promise：在dispatch派发的时候支持promise操作
 */
