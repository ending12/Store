import { all } from "redux-saga/effects";
import authSaga from "./auth.sage";
import categorySaga  from "./category.saga";
import productSaga from "./product.saga";
//中间副作用处理
 export default function* rootSaga() {
     yield all([authSaga(), categorySaga(), productSaga()]);
 }