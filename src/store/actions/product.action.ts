import { Products } from "../models/products";

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';

/** 获取商品功能
 * GetProductsAction 获取请求商品的prams
 * GetProductsSuccessAction 获取商品列表
 */
//因为要get的api要求，可以指定字段，排序方式和分页limit条数 
export interface GetProductsAction {
    type: typeof GET_PRODUCTS
    sortBy: string
    order: string
    limit: number
}
//请求商品成功也要加入sortBy
export interface GetProductsSuccessAction {
    type: typeof GET_PRODUCTS_SUCCESS
    payload: Products[]
    sortBy: string
}

export const getProducts = (
    sortBy: string,
    order: string = 'desc',
    limit: number = 10
): GetProductsAction => ({
    type: GET_PRODUCTS,
    sortBy,
    order,
    limit
});

export const getProductsSuccess = (
    payload: Products [],
    sortBy:string
): GetProductsSuccessAction => ({
    type: GET_PRODUCTS_SUCCESS, 
    payload,
    sortBy
});

/**搜索功能
 * GET_SEARCH 获取搜索信息
 * GET_SEARCH_SUCCESS 搜索成功 获取商品信息
 */

 export const GET_SEARCH = 'GET_SEARCH';
 export const GET_SEARCH_SUCCESS = 'GET_SEARCH_SUCCESS';
//要求用户传入 category search 信息
export interface GetSearchAction {
    type: typeof GET_SEARCH
    payload: {
        category: string
        search: string
    }
}
 
export interface GetSearchSuccessAction {
    type: typeof GET_SEARCH_SUCCESS
    products: Products []
}

//指定参数 定义查询功能
export const getSearchProduct = (
    payload: {
        category: string,
        search: string
    }
): GetSearchAction => ({
    type: GET_SEARCH,
    payload
})

export const getSearchProductSuccess = (
    products: Products[]
): GetSearchSuccessAction => ({
    type: GET_SEARCH_SUCCESS,
    products
});

/**筛选 以后再干
 * 
 */

/**
 * 和筛选相关的action
 */

 export const FILTER_PRODUCT = "FILTER_PRODUCT"
 export const FILTER_PRODUCT_SUCCESS = "FILTER_PRODUCT_SUCCESS"
 
 export interface FilterPayload {
   order?: string
   sortBy?: string
   limit?: number
   skip: number
   filters?: {
     category: string[]
     price: number[]
   }
 }
 
 export interface FilterProductAction {
   type: typeof FILTER_PRODUCT
   payload: FilterPayload
 }
 
 export interface FilterProductSuccessAction {
   type: typeof FILTER_PRODUCT_SUCCESS
   payload: {
     size: number
     data: Products[]
   }
   skip: number
 }
 
 export const filterProduct = (
   payload: FilterPayload
 ): FilterProductAction => ({
   type: FILTER_PRODUCT,
   payload
 })
 export const filterProductSuccess = (
   payload: {
     size: number
     data: Products[]
   },
   skip: number
 ): FilterProductSuccessAction => ({
   type: FILTER_PRODUCT_SUCCESS,
   payload,
   skip
 })
 
 // 通过产品id获取产品详情
 export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID"
 export const GET_PRODUCT_BY_ID_SUCCESS = "GET_PRODUCT_BY_ID_SUCCESS"
 
 export interface GetProductByIdAction {
   type: typeof GET_PRODUCT_BY_ID
   payload: {
     productId: string
   }
 }
 
 export interface GetProductByIdSuccessAction {
   type: typeof GET_PRODUCT_BY_ID_SUCCESS
   payload: Products
 }
 
 export const getProductById = (payload: {
   productId: string
 }): GetProductByIdAction => ({
   type: GET_PRODUCT_BY_ID,
   payload
 })
 
 export const getProductByIdSuccess = (
   payload: Products
 ): GetProductByIdSuccessAction => ({
   type: GET_PRODUCT_BY_ID_SUCCESS,
   payload
 })
 
export type UnionProduct =  
| GetProductsAction 
| GetProductsSuccessAction
| GetSearchAction
| GetSearchSuccessAction
| FilterProductAction
| FilterProductSuccessAction
| GetProductByIdAction
| GetProductByIdSuccessAction;