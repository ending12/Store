export const SIGNUP = "SIGNUP";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";
export const SIGNIN = "SIGNIN";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAIL = "SIGNIN_FAIL";
export const REST_STATE = "REST_STATE";

//注册信息接口
export interface SignupPayload {
    name: string,
    password: string,
    email: string
}

export interface SignupAction {
    type: typeof SIGNUP,
    payload: SignupPayload
}

export interface SignupSuccessAction {
    type: typeof SIGNUP_SUCCESS
}

export interface SignupFailAction {
    type: typeof SIGNUP_FAIL,
    message: string
}

export interface RestStateAction {
    type: typeof REST_STATE
} 

//登录信息接口
export interface SigninPayload {
    email: string,
    password: string
}

export interface SigninAction {
    type: typeof SIGNIN,
    payload: SigninPayload
}

export interface SigninSuccessAction {
    type: typeof SIGNIN_SUCCESS
}

export interface SigninFailAction {
    type: typeof SIGNIN_FAIL,
    message: string
}


//返回注册信息
export const signup = (payload: SignupPayload): SignupAction => ({
    type: SIGNUP,
    payload
});

export const signupSuccess = (): SignupSuccessAction => ({
    type: SIGNUP_SUCCESS
});

export const signupFail = (message: string): SignupFailAction => ({
    type: SIGNUP_FAIL, 
    message
});
export const restState = (): RestStateAction => ({
    type: REST_STATE
})

//返回登录信息
export const signin = (payload: SigninPayload): SigninAction => ({
    type: SIGNIN,
    payload
});

export const signinSuccess = (): SigninSuccessAction => ({
    type: SIGNIN_SUCCESS
});

export const signinFail = (message: string): SigninFailAction => ({
    type: SIGNIN_FAIL, 
    message
});


//因为Redux 第二个参数是Action 可以是任何类型

export type AuthUnionType = 
| SignupAction 
| SignupSuccessAction 
| SignupFailAction
| SigninAction 
| SigninSuccessAction 
| SigninFailAction
| RestStateAction
