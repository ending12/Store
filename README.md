# 购物商城v0.1
React Store Demo 
## 第三方包的作用

- 路由管理：React-router-dom
- 用户界面：Antd
- 全局状态管理：Redux
- 异步状态更新：redux-saga
- 路由状态同步：connected-react-router
- 网络请求：Axios
- 调试工具：redux-devtools-extension
- 日期包：moment 
### 执行整个流程：

ui组件触发action建立函数 ---> action建立函数返回一个action ------>  action被传入redux中间件(被 saga等中间件处理) ，产生新的action，传入reducer------->  reducer把数据传给ui组件显示 -----> mapStateToProps ------> ui组件显示
### core：商城核心页面
### Signin组件

#### 登录设计逻辑

视图布置：

- 邮箱 密码 表单DOM

数据获取：

- 使用`useSelector`获取注册结果，返回结果要使用泛型确定类型
- `useDispatch `获取saga数据流
- 注入数据发送请求`dispatch(signup(data))`

业务：

1. 获取登录结果，使用dispatch获取登录API的数据

2. 登录失败显示错误信息

3. 登录成功根据角色跳转到对应的管理页面

### Signup组件

#### 注册设计逻辑

视图布置：

- 呢称 密码 邮箱等表单DOM

数据获取：

- useDispatch 获取数据流
- 注入数据发送请求dispatch(signup(vdata))

### Home商品首页组件

- 商城的首页，包含Search搜索和ProductItem商品列表两个组件
- 显示最新上架和最受欢迎两个模块

### Search搜索组件

- 包含选择商品分类和搜索文本的功能
- 监听onFinish表单提交事件，当表单提交触发，dispatch捕获函数，传入类别和搜索文本，返回category和search信息。在下方进行显示ProductItem商品列表。

### ProductItem商品列表SKU显示组件

- 用卡片包含商品的展示（图片、销量、价格、上架时间和所属分类），可以查看商品向前和加入购物车。
- 点击查看详情时，用link链接到路由重定向到Product组件
- 当点击加入购物车时，存储当前商品的信息，把当前状态dispatch(put("/cart")),跳转到Cart购物车组件。

### Product单个商品组件

- 根据url路径的Params获取商品id，dispatch执行查看单个商品信息功能，引用ProductItem显示该组件

### Cart购物车组件

- 包含购物车信息操作CartItemFc和TotalPrice组成
- 显示商品信息（封面，名称、价格、分类、数量和操作组成）和填写收货地址功能

### CartItemFc购物车信息操作

- 可根据Cart购物车相应操作，动态的加载数据，如添加数量，删除该商品的功能

### TotalPrice组件

- 根据CartItemFc操作的数量，来重新计算相应的价格

### Shop商城组件

- 包含CheckBox、RadioBox和ProductItem组件
- 右侧边栏可勾选类别、选择相应价格来筛选商品，在左边显示栏的ProductItem显示商品顺序
- 商品加载功能，初始页面预设只加载五条数据，当每次点击加载更多时再次加入4条商品进行显示
- 在CheckBox组件中用回调的方式注入过滤的商品内容
- 在RadioBox组件中用回调的方式同样注入过滤的商品内容

### CheckBox类别多选框组件

- 在渲染的DOM中onChange监听内容的变化
- selector获取根据类别过滤的reducer商品排序
- dispatch捕获查询类别的状态，把状态进行装入

### RadioBox价格单选框组件

- 定义prices价格选取区间
- 在渲染的DOM中onChange监听内容的变化

### Layout组件

管理页面布局

- 头部： Navigation导航栏 
- 导航： PageHeader 登录炫彩头部
- 所有子组件： children 页面组件

### Navigation组件

导航栏定义要跳转的组件

- `/`：首页组件
- `/shop`：商城组件
- `/signin`：登录组件
- `/signup`：注册组件
- `/dashboard`：我的组件
- 设置组件

### admin：管理员页面全部组件

#### PrivateRoute用户定制路由组件 

用户Route：判断是否登录，当用户登录了就能访问Dashboard组件页面,但没有权限访问管理员组件

- 使用ts必须先定义类型接口，继承**RouteProps**（指定Component）
- 在Route设置isAuth判断的登录状态，如果状态为登录成功则返回最高级的Component组件，并传入全部props，否则重新返回登录组件
- 最后在Routes文件中指定访问路径，注册PrivateRoute路由。

### AdminRoute管理员定制路由组件

管理员Route：当管理员登录成功，能访问用户权限的Dashboard和管理员DashboardAdmin的组件页面

- 使用ts必须先定义类型接口，继承**RouteProps**（指定Compents）
- 在Route设置isAuth判断的登录状态，如果状态为登录成功且role身份为1则返回最高级的Compnent组件，并传入全部props，否则重新返回登录组件
- 最后在Routes文件中指定访问路径，注册AdminRoute路由。

### Dashboard用户页面组件

用户的个人页面

### DashboardAdmin管理员页面组件

管理员的个人页面

- 有添加用户的功能
- 有添加商品类别的功能
- 有添加和编辑商品的功能

### AddProduct添加商品组件

- 在数据库中增加产品的功能

### AddCategory添加类别组件

- 在数据库中增加类别的功能

---

## 总结

- 目录结构划分为components、helpers、store三大结构。components主要放置各个UI最小组件，在组件中划分core商城核心部分和admin管理员操作部分两大层级。

- admin层级中，主要设计了DashboardAdmin（管理员页面组件）,AdminRoute（管理员定制路由组件）、Dashboard（用户页面组件）、PrivateRoute（用户定制路由组件）、AddProduct（添加商品组件）、AddCategory（添加类别组件）。

- core层级中，主要设计了Home（商品首页组件）、Search(搜索组件)、ProductItem（商品SKU列表组件）、Product（单个商品组件）、Cart（购物车组件）、CartItemFc（购物车信息操作组件）和TotalPrice（商品总价组件）

- helpers为辅助功能，定义了获取Jwt存储的数据功能、购物车的数据处理功能和价格区间设置

- store按Redux数据流的流动，分为actions、models、sagas和reducer四大部分。actions定义了用户操作、类别管理和商品状态的信息，models定义了类型判断的属性接口、sagas使用axios获取api中的数据传入reducer，由reducer添加状态到store进行存储。

## Thank You！！！
