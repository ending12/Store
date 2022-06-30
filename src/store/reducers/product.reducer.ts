import { FILTER_PRODUCT, FILTER_PRODUCT_SUCCESS, GET_PRODUCTS, GET_PRODUCTS_SUCCESS, GET_PRODUCT_BY_ID, GET_PRODUCT_BY_ID_SUCCESS, GET_SEARCH_SUCCESS, UnionProduct } from "../actions/product.action"
import { Products } from "../models/products"
/**查询商品所需要的每个状态
 * 有id单个查询的商品
 * 有以按日期排序的商品
 * 有以按销售排序的商品
 * 有以按过滤查询排序的商品
 */
export interface ProductState {
    products: {
        loaded: boolean
        success: boolean
        result: Products
    }
    search: Products []
    createAt: {
        loaded: boolean
        success: boolean
        result: Products []
    }
    sold: {
        loaded: boolean
        success: boolean
        result: Products []
    }
    filter: {
        loaded: boolean
        success: boolean
        result: {
            size: number
            data: Products[]
          }
    }
}
//初始化商品状态
const initailState: ProductState = {
    products: {
        loaded: false,
        success: false,
        result: {
            _id: "",
            name: "",
            description: "",
            price: 0,
            category: {
                _id: "",
                name: ""
            },
            photo: new FormData(),
            quantity: 0,
            shipping: false,
            createAt: ""
        }
    },
    createAt: {
        loaded: false,
        success: false,
        result:  []
    },
    sold: {
        loaded: false,
        success: false,
        result: []
    },
    filter: {
        loaded: false,
        success: false,
        result: {
            size: 0,
            data: []
        }
    },
    search: []
} 

//商品选择器 Get带查询params
export const productReducer = (
    state = initailState,
    action: UnionProduct
    ) => {
    switch(action.type) {

        case GET_PRODUCTS :
            return {
                ...state,
                [action.sortBy]: {
                    ...state[action.sortBy === "createAt" ? "createAt" : "sold"],
                    loaded: false,
                    success: false,
                }
            };
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                [action.sortBy]: {
                    loaded: true,
                    success: true,
                    result: action.payload
                }
            };
        case GET_SEARCH_SUCCESS:
            return {
                ...state,
                search: action.products
            }
        case FILTER_PRODUCT:
            return {
                ...state,
                filter: {
                loaded: false,
                success: false,
                result: {
                    size: 0,
                    data: state.filter.result.data
                }
                }
            }
            case FILTER_PRODUCT_SUCCESS:
            let data =
                action.skip === 0
                ? action.payload.data
                : [...state.filter.result.data, ...action.payload.data]
        
            return {
                ...state,
                filter: {
                loaded: true,
                success: true,
                result: {
                    size: action.payload.size,
                    data
                }
                }
            }
            case GET_PRODUCT_BY_ID:
            return {
                ...state,
                products: {
                ...state.products,
                loaded: false,
                success: false
                }
            }
            case GET_PRODUCT_BY_ID_SUCCESS: {
            return {
                ...state,
                products: {
                loaded: true,
                success: true,
                result: action.payload
                }
            }
            }
        default :
            return state;

    }
}