import { 
    AuthUnionType,
    SIGNUP,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    SIGNIN,
    SIGNIN_SUCCESS,
    SIGNIN_FAIL,
    REST_STATE,

 } from "../actions/auth.action";

//注册和登录
export interface AuthState {
    //loaded 代表请求接口有没有成功
    //success代表注册有没有成功
    signup: {
        loaded: boolean
        success: boolean
        message: string
    },
    signin: {
      loaded: boolean
      success: boolean
      message: string
    }
}
//初始化注册和登录
const intialState: AuthState  = {
    signup: {
        loaded: false,
        success: false,
        message: ""
    },
    signin: {
      loaded: false,
      success: false,
      message: ""
    }
}

//状态处理
export default function authReducer(
    state = intialState,
    action: AuthUnionType
  ) {
    switch (action.type) {
      //注册状态
      case SIGNUP:
        return {
          ...state,
         signup: {
            loaded: false,
            success: false
          }
        } 

      case SIGNUP_SUCCESS:
        return {
          ...state,
          signup: {
            loaded: true,
            success: true
          }
        }

      case SIGNUP_FAIL:
        return {
          ...state,
          signup: {
            loaded: true,
            success: false,
            message: action.message
          }
        }
      case REST_STATE:
        return {
          ...state,
          signup: {
            loaded: false,
            success: false,
            message: ""
          }
        }
      //登录状态
      case SIGNIN:
        return {
          ...state,
          signin: {
            loaded: false,
            success: false,
            message: ""
          }
        }

      case SIGNIN_SUCCESS:
        return {
          ...state,
          signin: {
            loaded: true,
            success: true,
            message: ""

          }
        }

      case SIGNIN_FAIL:
        return {
          ...state,
          signin: {
            loaded: true,
            success: false,
            message: action.message
          }
        }
      default:
        return state
    }
  }


// export default function authReducer(
//     state = intialState,
//     action: AuthUnionType) {
    
//         let actions = {
//             SIGNUP: () => ({
//                 ...state,
//                 signup: {
//                     loaded: false,
//                     success: false
//                 }
//             }),
//             SIGNUP_SUCCESS: () => ({
//                 ...state,
//                 signup: {
//                     loaded: true,
//                     success: true
//                 }
//             }),
//             SIGNUP1: () => {
//                 return {
//                     ...state,
//                     signup: {
//                         loaded: true, 
//                         success: false,
//                         message: action.message
//                     }
//                 }
//             }
//         };
//     if (typeof actions[action.type] !== 'function') {
//         return state
//     }
//     return actions[action.type]();
// }