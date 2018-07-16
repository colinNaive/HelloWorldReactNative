![这里写图片描述](https://img-blog.csdn.net/20180716114021301?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NvbGluYW5kcm9pZA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
一开始接触redux时对于它和react的关系理解很混乱：

 - 一会儿是state，一会儿又是store，这两者到底有什么关系？
 - 看代码时，dispatch、reducer、action这三者之间需要跳来跳去，它们到底是什么关系？为什么要这样设计结构？
 - connect、mapStateToProps、mapDispatchToProps这三者有什么关系？或者说这三个是干什么的？跟redux有什么关系？
 - action不就是一个function吗？它和普通的function有区别吗？为什么它就叫action？它return的值return给谁了？
 - redux让我和react之间隔了一层神秘的面纱，学习成本实在太高了，很多点只是大致知道了，可是就是无法从一个宏观的角度去理解，结果就是好混乱啊...cry to die...

我们先讲一下redux是干嘛的，它是解决什么需求的。
先来看看react里面数据是怎样传递的。
###React数据流
![react数据传递](https://img-blog.csdn.net/20180715231731258?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NvbGluYW5kcm9pZA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

 1. 可以看到，一般都是Container在设置好state后（this.state设置好）
 2. 把命令一层层地传递下去（this.props渲染）
 3. 要是哪个component想要更新页面内容了
 4. 就得一层层往上报告（通过回调），不能越级
 5. 最好上报到container后，由container去setState修改数据并重新渲染

这个过程是不能越级的，数据传递总是让人觉得不是很灵活。
###Redux横空出世
所以，**如果层次不深，组件之间没有什么共用数据的话，用react自身的setState其实也可以了**。可是，当嵌套一深，或者组件间有一些共用数据时就比较麻烦了，于是就有了redux。
###分清两个state
**redux中的state和react中的state完全不是一回事**。react中的state是组件内部自己的状态信息，而redux中的state是redux自己的数据，然后react拿redux的数据来用，其实redux也可以在其他框架下使用，并不是非要跟react一起使用。
简单画个图就像下面这样
![这里写图片描述](https://img-blog.csdn.net/20180715235750795?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NvbGluYW5kcm9pZA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
这只是一个简单的示意图，实际使用并非如此，这个图示是为了让大家理解react中的数据和readux中的数据是独立的，并没有半毛钱关系。
###Redux中三个重要角色
网上对于redux教程非常多，这里简要介绍一下
####1. store
store：创建一个store
```
import { createStore } from 'redux';
const store = createStore(reducer);
```
用来让外界获取redux数据
```
store.getState
```
让外界修改redux中数据
```
store.dispatch
```
####2. action
action：描述我要干啥，一般是一个对象的形式，其中有一个type字段是必须要有的。只有被dispatch的action才有意义，否则它跟一个普通的function没什么区别。
####3. reducer
reducer：真正去修改redux的state。
```
const defaultState = {};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case Type.REQUEST:
      return {
	      ...state,
	      action.request
      };
    default: 
      return state;
  }
};
```
我们在平时使用redux时，都是dispatch一个action，而真正去修改state，然后返回一个全新的state的是reducer。
那么怎么去触发一个action呢？
就是前面提到的store.dispatch，把action作为dispatch的参数。
```
store.dispatch({ type：Type.Request，test:"100" })
```
这样就可以触发action，执行reducer，返回一个全新的state了。
###Redux和React
到此为止，redux自己就折腾完了，而redux自己的数据并没有用，它要把数据交给react用才行，接下来讲一讲怎么把数据交给react来用。
上面我们创建了一个对象store，我们要把这个store对象作为props传给react，那react就可以用了。
**这个store只能有一个，也就只能创建一次**，也就是说你在最顶层处创建一个store对象，然后再一层一层地传下去，才能让所有组件都能获取这个store对象，调用它的方法。
####获取redux中的数据
比如说我要在render函数中显示redux数据，那么我就可以先获取它的数据：
```
store.getState()
```
然后把这个数据当做props渲染到组件中就行了。
####更新redux中的数据
如果要修改它的数据，那就在JSX中调用
```
store.dispatch({type:Type.Request,test:"100})
```
####相应redux中的变化
那么这里问题又来了，你调用了store.dispatch之后redux中数据确实变了，可是react并没有什么改变啊。也就是说react中的render函数并没有被触发，就好像react中你直接修改react中的state是没用的，而必须调用react中的setState才能重新渲染。
因此，为了让redux的数据一改变我们就重新渲染，redux提供了一个监听方法
```
store.subscribe(render)
```
**这个函数就可以监听redux中state的变化，一旦redux中的state发生了变化，render函数就会被调用，页面就会被重新渲染**。
<br>

上面这个过程就是手动调用的过程，但这样调用有点麻烦，因为**要让所有的组件都能应用store中的数据，那么所有组件都要把store当做props传进来**，这样太麻烦了。

###React-Redux
这个时候就需要去安装一些中间件了，还记得你在你的react-native项目中接入redux时安装的三个库吗？
![这里写图片描述](https://img-blog.csdn.net/20180716103936951?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NvbGluYW5kcm9pZA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
>npm install --save redux
>npm install --save react-redux
>npm install --save redux-thunk
>npm install --save react-navigation

其中，react-redux就是为了简化redux的调用流程（后面我们会一一介绍这几个库都做了什么，为什么要引入这几个库）。

在react-redux中有两个比较关键的概念：**Provider和connect方法**。
####Provider
一般我们都将顶层组件包裹在Provider组件之中，这样的话，所有组件就都可以在react-redux的控制之下了，但是**store必须作为参数放到Provider组件中去**
```
<Provider store = {store}>
    <Container/>
<Provider>
```
这个组件的目的是**让所有组件都能够访问到redux中的数据**。
这个比较简单，我们来讲connect方法。
####connect方法
```
connect(mapStateToProps,mapDispatchToProps)(MyComponent)
```
这两个参数非常重要，我们来讲下。
####mapStateToProps
字面含义就是把state映射到props中去，意思就是**把redux中的数据映射到react中的props中去**。
比如一个component想要把网络请求的数据拿来渲染，就可以在这个component中把redux中的response拿过来用
```
const mapStateToProps = (state) => {
  return {
    data: state.response
  }
}
```
然后渲染的时候就可以直接使用**this.props.data**
```
class Container extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>this.props.data</div>
        )
    }
}
const mapStateToProps = (state) => {
  return {
    data: state.response
  }
}
export default connect(mapStateToProps)(Container)
```
这样就可以实现渲染，**把redux中的state变成react中的props**。
####mapDispatchToProps
通过上面的分析，相信这个函数也很好理解，就是**把各种dispatch变成props直接使用**。
```
const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => {
      dispatch({
        type: Type.REQUEST,
　　　　 test : "100"
      });
    }
  };
}
```
更改一下Container组件
```
class Container extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>this.props.data</div>
            <button onClick = {this.props.onClick}>点击</button>
        )
    }
}
const mapStateToProps = (state) => {
  return {
    data: state.data
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => {
      dispatch({
        type: Type.REQUEST,
　　　　 data : "100"
      });
    }
  };
}
export default connect(mapStateToProps，mapDispatchToProps)(Container);
```
这样，当点击按钮后，Container组件就会自动更新，而不需要我们手动去store.subscribe订阅render函数以达到更新页面的目的，**这样一来我们就不需要一层层传递store对象了**。
###tips
这样随处都可以使用、修改redux中的数据的方式很方便，但redux推荐的最佳实践还是在尽可能少的地方使用connect，把逻辑数据相关的都放到容器组件中去处理，把其他的组件都由容器组件所生成的props一层层传递下去然后渲染。
###redux-thunk
redux-thunk是一个比较流行的redux异步action中间件，比如action中有**setTimeOut**或**fetch**，那么就应该用redux-thunk。这里就不详细介绍了。
###最后
本文适合一些已经对redux有过一定研究，但思路还是比较混乱的小伙伴，这篇文章一定能帮你理清思路。另外[欢迎下载集成了redux的react-native的demo](https://github.com/colinNaive/HelloWorldReactNative)。
