import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Vote from './component/Vote/Vote';
import store from './store';

/*
 * 创建容器：需要把reducer传递进来
 *   reducer作用：
 *     1.记录了所有状态修改的信息（根据行为标识走不同的修改任务）
 *     2.修改容器中的状态信息
 *
 *   [参数]
 *     state：容器中原有的状态信息(如果第一次使用，没有原有状态，给一个初始默认值)
 *     action：dispatch任务派发的时候传递的行为对象(这个对象中必有一个TYPE属性，是操作的行为标识，REDUCER就是根据这个行为标识来识别该如何修改状态信息)
 */


/*
 * 创建的store中提供三个方法：
 *   dispatch：派发行为(传递一个对象，对象中有一个type属性)，通知reducer修改状态信息
 *   subscribe：事件池追加方法
 *   getState：获取最新管理的状态信息
 */

//=>render
ReactDOM.render(<main>
  <Vote title={'北斗VS琥珀'}     
        store={store}/>
</main>, document.getElementById('root'));