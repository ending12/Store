import { put, takeEvery } from "@redux-saga/core/effects";
import Axios from "axios";
import { API } from "../../config";
import { SIGNIN, SigninAction, signinFail, signinSuccess, SIGNUP, SignupAction, signupFail, signupSuccess } from "../actions/auth.action";
//获取注册API
function* handleSignup (action: SignupAction) {
    try {
        yield Axios.post(`${API}/signup`, action.payload);
        yield put(signupSuccess());
    } catch (error : any) {
        yield put(signupFail(error.response.data.error))
    }
}
//获取登录AIP
function* handleSignin (action: SigninAction):any {
    try {
        let response =  yield Axios.post(`${API}/signin`, action.payload);
        localStorage.setItem('jwt', JSON.stringify(response.data));
        yield put(signinSuccess());
    } catch (error : any) {
        yield put(signinFail(error.response.data.error))
    }
}

export default function* authSaga() {
    //登录
    yield takeEvery(SIGNUP, handleSignup);
    //注册
    yield takeEvery(SIGNIN, handleSignin);
}
