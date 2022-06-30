import { CategoryName } from "../models/category";

export const GET_CATEGORY = "GET_CATEGORY";
export const GET_CATEGORY_SUCCESS = "GET_CATEGORY_SUCCESS";

export interface GetCategoryAction {
    type: typeof GET_CATEGORY
}

export interface GetCategorySuccessAction {
    type: typeof GET_CATEGORY_SUCCESS,
    payload: CategoryName[]
}

export const getCategory = (): GetCategoryAction => ({
    type: GET_CATEGORY
});

export const getCategorySucess = (payload: CategoryName[]): GetCategorySuccessAction => ({
    type: GET_CATEGORY_SUCCESS,
    payload
});

export type CategoryUnionType = GetCategoryAction | GetCategorySuccessAction;