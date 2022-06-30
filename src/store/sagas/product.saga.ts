import Axios from "axios";
import { put, takeEvery } from "redux-saga/effects";
import { API } from "../../config";
import {  FilterProductAction, filterProductSuccess, FILTER_PRODUCT, GetProductByIdAction, getProductByIdSuccess, GetProductsAction, getProductsSuccess, GetSearchAction, getSearchProductSuccess, GET_PRODUCTS, GET_PRODUCT_BY_ID, GET_SEARCH } from "../actions/product.action";
import { Products } from "../models/products";

//查询商品 /products?sortBy=createdAt&order=asc&limit=10
function* handleGetProduct( {
    sortBy, order, limit
}: GetProductsAction): any {
    let response = yield Axios.get<Products[]>(`${API}/products`,{
        params: {
            sortBy,
            order,
            limit
        }
    });
    yield put(getProductsSuccess(response.data, sortBy));
}

//搜索 查询结果
function* handleSearchProduct({
    payload: { search, category }
}: GetSearchAction): any {
    let response = yield Axios.get<Products[]>(`${API}/products/search`,{
        params: {
            search,
            category
        }
    });
    yield put(getSearchProductSuccess(response.data));
}

//过滤器
function* handleFilterProduct(action: FilterProductAction): any {
    let response = yield Axios.post(`${API}/products/filter`, action.payload)
    yield put(filterProductSuccess(response.data, action.payload.skip))
  }
  
  function* handleGetProductById({ payload }: GetProductByIdAction): any {
    let response = yield Axios.get(`${API}/product/${payload.productId}`)
    yield put(getProductByIdSuccess(response.data))
  }

//使用getProduct 然后在getProduct中再次调用getProductSuccess
export default function* productSaga() {
    yield takeEvery(GET_PRODUCTS, handleGetProduct);
    yield takeEvery(GET_SEARCH, handleSearchProduct);
    yield takeEvery(FILTER_PRODUCT, handleFilterProduct);
    yield takeEvery(GET_PRODUCT_BY_ID, handleGetProductById);
}