import { applyMiddleware, createStore } from "redux";
import { createRootReducer } from "./reducers";
import { createHashHistory } from 'history'
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "@redux-saga/core";
import { composeWithDevTools } from "redux-devtools-extension";
import rootSaga from "./sagas";
/**
 * Step 2 配置仓库
    When creating a Redux store,
    Create a history object.
    Provide the created history to the root reducer creator.
    Use routerMiddleware(history) if you want to dispatch history actions (e.g. to change URL with push('/path/to/somewhere')).
 */
export const history = createHashHistory(); //// 一个对象，拥有push、go、back、forward listen等方法
// console.log(history);
const sagaMiddleware = createSagaMiddleware();
// composewithDevTools用来做redux的状态可视化
export const store = createStore(
    createRootReducer(history),// root reducer with router state
    composeWithDevTools(
        applyMiddleware(// appliMiddleware返回一个函数，参数为createStore，返回的函数的作用是将多个中间件串联调用。
            routerMiddleware(history),//监听路由状态，当路由状态发生改变时 for dispatching history actions
            sagaMiddleware //添加saga Middleware
        )
    )
);
//定义运行saga文件
sagaMiddleware.run(rootSaga);
