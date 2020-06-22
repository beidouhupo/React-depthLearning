/*
 *  createStore：创建REDUX容器的
 *    @params
 *      reducer：函数
 *    @return
 *      store : {
 *        getState,
 *        dispatch,
 *        subscribe
 *      }
 */
function createStore(reducer) {
  //=>创建一个store, state用来存储管理的状态信息, listenAry用来存储事件池中的方法
  //=>state不用设置初始值，因为第一次dispatch执行reducer，state没有值，走的是reducer中赋值的默认值信息，我们自己会在创建容器的时候就把dispatch执行一次!
  let state,
      listenAry = [];

  //=>dispatch：基于dispatch实现任务派发
  function dispatch(action) {
    //1.执行reducer，修改容器中的状态信息（接收reducer的返回值，把返回的信息替换原有的state），值得注意的是：我们是把返回值全部替换state，所有要求reducer中在修改状态之前，要先把原始的状态信息克隆一份，在进行单个的属性修改
    state = reducer(state, action);

    //2.容器中状态信息经过reducer修改后，通知事件池中的方法依次执行
    for (let i = 0; i < listenAry.length; i++) {
      let item = listenAry[i];
      if (typeof item === 'function') {
        item();
      } else {
        listenAry.splice(i, 1);
        i--;
      }
    }
  }

  dispatch({type: '$$INIT_DEFAULT_STATE'});//=>创建容器的时候执行一次dispatch，目的是把reducer中的默认状态信息赋值给redux容器中的状态

  //=>getState: 获取容器中的状态信息
  function getState() {
    //1.我们需要保证返回的状态信息不能和容器中的state是同一个堆内存(否则外面获取状态信息后，直接就可以修改容器中的状态了，这不符合dispatch->reducer才能改状态的规范)
    /*
    [浅克隆]
    AAAFFF111:{vote:BBBFFF111}
    {...state} => AAAFFF222:{vote:BBBFFF111}
    */
    return JSON.parse(JSON.stringify(state));//=>深度克隆对象
  }

  //=>subscribe：向事件池中追加方法
  function subscribe(fn) {
    //1.向容器中追加方法(重复验证)
    let isExit = listenAry.includes(fn);
    !isExit ? listenAry.push(fn) : null;

    //2.返回一个方法:执行返回的方法会把当前绑定的方法在事件池中移除掉
    return function unsubscribe() {
      let index = listenAry.indexOf(fn);
      // listenAry.splice(index, 1);//=>可能会引发数组塌陷
      listenAry[index] = null;
    }
  }

  return {
    dispatch,
    getState,
    subscribe
  };
}

/*
 *  combineReducers：reducer合并的方法
 *    @PARAMS
 *      对象: 对象中包含了每一个版块对象的reducer =>{xxx:function reducer...}
 *    @return
 *      返回的是一个新的reducer函数(把这个值赋值给create-store）
 *
 *    特殊处理：合并reducer之后，redux容器中的state也变为以对应对象管理的模式 =>{xxx:{}...}
 */
function combineReducers(reducers) {
  /*
   *=>reducers: 传递进来的reducer对象集合
   *  {
   *    vote:function vote(state={n:0,m:0},action){... return state;},
   *    personal:function personal(state={baseInfo:''},action){... return state;}
   *    ...
   *  }
   */
  return function reducer(state = {}, action) {
    //=>dispatch派发执行的时候，执行的是返回的reducer，这里也要返回一个最终的state对象替换原有的STATE，而且这个state中包含每个模块的状态信息 =>{vote:...,personal:...}
    //=>我们所谓的reducer合并，其实就是dispatch派发的时候，把每一个模块的reducer都单独执行一遍，把每个模块返回的状态最后汇总在一起，替换容器中的状态信息
    let newState = {};
    for (let key in reducers) {
      if (!reducers.hasOwnProperty(key)) break;
      //=>reducers[key]：每个模块单独的reducer
      //=>state[key]：当前模块在redux容器中存储的状态信息
      //=>返回值是当前模块最新的状态，把它在放到newState中
      newState[key] = reducers[key](state[key], action);
    }
    return newState;
  }
}

// store = createStore(reducer);
// store.dispatch({type: 'xxx'});

/*
 * 用法
 * let reducer = (state - {}, action) => {
 *   //=>state: 原有状态信息
 *   //=>action: 派发任务时候传递的行为对象
 *   switch (action.type) {
 *     case TYPE.XXX:
 *       state = {...state, n: 100};
 *   }
 *   return state; //=>返回的state会替换原有的state
 * };
 * let store = createStore(reducer); //=>create的时候把reducer传递进来, 但是此时reducer并没有执行, 只有dispatch的时候才执行, 通过执行reducer修改容器中的状态
 * store.dispatch({type: 'xxx', ...});
 */

// let unsubscribe = store.subscribe(fn);
// unsubscribe();