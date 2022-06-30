// import App from './App';
import React from 'react';
import ReactDOM from "react-dom"
import { Routes } from './Routes';
import { Provider } from 'react-redux';
import { store } from './store/index';
import { history } from './store';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router-dom';
// import 'antd/dist/antd.css';
import './style.css';
// import "./style.css"
/**
 * Step 3
 * 三步走 进行路由同步
    Wrap your react-router v4/v5 routing with ConnectedRouter and pass the history object as a prop. Remember to delete any usage of BrowserRouter or NativeRouter as leaving this in will cause problems synchronising the state.
    Place ConnectedRouter as a child of react-redux's Provider.
    N.B. If doing server-side rendering, you should still use the StaticRouter from react-router on the server.
    1 接收导航栏URI分解 location search hash query action 参数
    Layout Home {"test":0,"router":{"location":{"pathname":"/","search":"","hash":"","query":{}},"action":"POP"}}
    2 输入http://localhost:3000/#/?id=1&search=1
    Layout Home {"test":0,"router":{"location":{"pathname":"/","search":"?id=1&search=1","hash":"","query":{"id":"1","search":"1"}},"action":"POP"}}
 */
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Routes />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
)
