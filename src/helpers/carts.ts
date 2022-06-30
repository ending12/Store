import { Products } from "../store/models/products";
/**
 * 购物车 设置
 */
export interface CartItem extends Products {
    count: number
}
/**
 * 保存购物车的操作数据 中间函数
 */
export const addItem = (Item: Products, next: () => void) => {
    let cart: CartItem[] = [];
    if(typeof window !== "undefined") {
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart")!);
        } 
        cart.push({
            ...Item,
            count:1
        })
    }
    //指定购物车的商品添加的id
    cart = Array.from(new Set(cart.map(item => item._id))).map(item => {
        return cart.find(products => products._id === item)
    }) as CartItem [];
    localStorage.setItem("cart",JSON.stringify(cart))
    next();
}
/**
 * 获取购物车数据
 */
export const getCart = () => {
    if(typeof window !== "undefined"){
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart")!) as CartItem [];
        }
    }
    return [];
}

/**
 * 更改购物车的数据
 */
export const updateCart = (productId: string, count: number) => {
    let cart: CartItem [] = [];
    if(typeof window !== "undefined") {
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart")!);
        }
    cart.forEach( (item, index )=> {
        if(item._id === productId){
            cart[index].count = count;
        }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
}

/**
 * 获取商品数量
 */
export const getItemCount = () => {
    if(typeof window !== "undefined") {
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart")!).length;
        }
        return 0;
    }
    return 0;
}
/**
 * 删除商品
 */
 export const deleteItem = (productId: string) => {
     let cart: CartItem[] = [];
    if(typeof window !== "undefined") {
        if(localStorage.getItem("cart")){
            cart =  JSON.parse(localStorage.getItem("cart")!);
        }
        cart.forEach( (item, index) => {
            if(item._id === productId) {
                cart.splice(index,1);
            }
        });
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
}