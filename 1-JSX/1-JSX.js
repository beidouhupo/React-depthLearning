/*
 *  createElement: 创建JSX对象
 *    参数: 至少两个 type/props, children这个部分可能有多个 
 */
/*
 *  1. 创建一个对象(默认有四个属性: TYPE/PROPS/REF/KEY), 最后要把这个对象返回
 *  2. 根据传递的值修改这个对象
 *    TYPE =>传递的TYPE
 *    PROPS 需要做一些处理: 大部分传递PROPS中的属性都赋值给对象的PROPS, 有一些比较特殊
 *      ->如果是REF或者KEY, 我们需要把传递的PROPS中的这两个属性值, 给创建对象的这两个属性, 而传递的PROPS中把这两个值删除掉
 *      ->把传递的CHILDREN作为新创建的对象的PROPS中的一个属性
 */
function createElement(type, props, ...childrens) {
  let ref, key;
  //=>把REF和KEY提取出来(并且删除PROPS中的属性)
  if ('ref' in props) {
    ref = props.ref;
    props.ref = undefined
  }
  if ('key' in props) {
    key = props.key;
    props.key = undefined
  }
  return {
    type,
    props: {
      ...props,
      children: childrens.length <=1 ? (childrens[0] || '') : childrens
    },
    ref,
    key
  };
}

/*
 *  render: 把创建的对象生成对应的DOM元素, 最后插入到页面中
 */
function render(objJSX, container, callBack) {
  let {type, props} = objJSX,
      {children} = props;
  let newElement = document.createElement(type);
  for (let attr in props) {
    if (!props.hasOwnProperty(attr)) break; //=>不是私有的直接结束遍历
    let value = props[attr];
    if (value == undefined) continue; //=> null or undefined 如果当前属性没有值, 直接不处理即可

    switch (attr.toUpperCase()) {
      case 'CLASSNAME':
        newElement.setAttribute('class', value);
        break;
      case 'STYLE':
        for (let styleAttr in value) {
          if (value.hasOwnProperty(styleAttr)) {
            newElement['style'][styleAttr] = value[styleAttr];
          }
        }
        break;
      case 'CHILDREN':
        /*
         *  可能是一个值: 可能是字符串也可能是一个JSX对象
         *  可能是一个数组: 数组中每一项可能是字符串也可能是JSX对象
         */
        //->首先把一个值也变为数组, 这样后期统一操作数组即可
        !(value instanceof Array) ? value = [value] : null;
        value.forEach((item, index) => {
          //->验证item是什么类型的: 如果是字符串就是创建文本节点, 如果是对象, 我们需要再次执行render方法, 把创建的元素放到最开始创建的大盒子中
          if (typeof item === 'string') {
            let text = document.createTextNode(item);
            newElement.appendChild(text);
          } else {
            render(item, newElement);
          }
        });
        break;
      default:
        //=>基于setAttribute可以让设置的属性表现在HTML的结构上
        newElement.setAttribute(attr, value);
    }
  }
  container.appendChild(newElement);
  callBack && callBack();
}

export {
  createElement,
  render
};