import Axios from "axios";
import { put, takeEvery } from "redux-saga/effects";
import { API } from "../../config";
import {  GetCategorySuccessAction, getCategorySucess, GET_CATEGORY } from "../actions/category.action";
import { CategoryName } from "../models/category";

//获取分类AIP
function* handleGetCategory (action: GetCategorySuccessAction):any {
    try {
        let response = yield Axios.get<CategoryName []>(`${API}/categories`);
        yield put(getCategorySucess(response.data));
        
    } catch (error: any) {
        console.log(error.message);
    }
}

//获取分类列表
export default function* categorySaga() {
    yield takeEvery(GET_CATEGORY, handleGetCategory);
}