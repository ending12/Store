import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import authReducer, { AuthState } from "./auth.reducer";
import { categoryReducer, CategoryState } from "./category.reducer";
import { productReducer, ProductState } from "./product.reducer";
/**
 * Step 1
    In your root reducer file,
    Create a function that takes history as an argument and returns a root reducer.
    Add router reducer into root reducer by passing history to connectRouter.
    Note: The key MUST be router.
 */
//添加接口状态
export interface AppState {
    router: RouterState,
    auth: AuthState,
    category: CategoryState,
    products: ProductState
}
//第五步 把Reducer到state
//添加state到redux的store进行存储
export const createRootReducer = (history: History) => 
combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    category: categoryReducer,
    products: productReducer
})

