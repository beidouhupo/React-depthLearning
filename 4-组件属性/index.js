import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function Sum(props) {
  // console.log(this); //=>undefined
  return <div>
    函数式声明
  </div>
}
/*
class Dialog extends React.Component {
  constructor(props) { //=> props, context, updater
    super(props);  //=>ES6中extends继承, 一但使用了constructor, 第一行位置必须设置super执行: 相当于React.Component.call(this), 也就是call继承, 把父类私有的属性继承过来
    //=>如果只写super(): 虽然创建实例的时候把属性传递进来了, 但是并没有传递父组件, 也就是没有把属性挂载到实例上, 使用this.props获取的结果是undefined
    //=>如果super(props): 在继承父类私有的时候, 就把传递的属性挂载到了子类的实力上, constructor中就可以使用this.props了

    //=>props: 当render渲染并且把当前类执行创建实例的时候, 会把之前JSX解析出来的props对象中的信息(可能有children)传递给参数props => "调取组件传递的属性"
    console.log(props);

    /！*
     *  this.props: 属性集合
     *  this.refs: ref集合(非受控组件中用到)
     *  this.context: 上下文
     *！/
    console.log(this.props);
  }
  render() {
    return <section>
      <h3>系统提示</h3>
      <div></div>
    </section>
  }
}
*/

class Dialog extends React.Component {
  /* this.props是只读的, 我们无法在方法中修改它的值, 但是可以给其设置默认值或者设置一些规则(例如: 设置是否是必须传递的以及传递值的类型等) */ 
  //=>这样是不符合ES6语法规范的, 但是webpack打包编译的时候会把它转换为Dialog.defaultProps这种符合规范的语法
  static defaultProps = {
    lx: '系统提示'
  }

  /* prop-types是facebook公司开发的一个插件, 基于这个插件我们可以给组件传递的属性设置规则(设置的规则不会影响页面的渲染, 但是会在控制台抛出警告错误) */ 
  static propTypes = {
    // con: PropTypes.string //=>传递的内容需要是字符串
    con: PropTypes.string.isRequired //=>不仅传递 的内容是字符串, 并且还必须传递
  }

  //=>类似的这样写也是可以的(不是合法的ES6语法, 但是webpack会把它编译 =>babel-preset-react)
  AA = 12;
  fn = () => {
    console.log(1);
  }

  constructor(props) { 
    super(props); 
    /* 即使在constructor中不设置形参props接受属性, 执行super的时候也不传这个属性, 除了constructor中不能直接使用this.props, 其它生命周期函数中都可以使用(也就是执行完成constructor, react已经帮我们把传递的属性接受, 并且挂载到实例上了) */ 
  }
/*
  componentWillMount() {
    //=>第一次渲染之前
    console.log(this.props);

  }
*/

  render() {
    // this.props.con = '呵呵'; //=>cannot assign to read only property 'con' of object 组件中的属性是调取组件的时候(创建类实例的时候)传递给组件的信息, 而这部分信息是'只读'的(只能获取不能修改) => '组件的属性是只读的'
    let {lx, con} = this.props;
    return <section> 
      <h3>{lx}</h3>
      <div>{con}</div>
    </section>
  }
}

ReactDOM.render(<div>
  北斗琥珀
  <Dialog con='哈哈'>
    <span>北斗</span>
  </Dialog>
</div>, document.getElementById('root'));