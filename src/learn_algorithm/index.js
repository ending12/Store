// let str = 1234;
// // let space = '   ';
// // // let addWhiteSpace = str.split('');
// // let a = space.concat(str)
// // str = a+space+' ';
// let num_8 = '0'+str.toString(8);
// let num_16 = '0X'+str.toString(16).toUpperCase()
// console.log(num_8, num_16);
// let a1 = window.prompt();
// let a2 = window.prompt();
// let a3 = window.prompt();
// console.log(a1+' '+a2+' '+a3);

// //读取键盘
// let record = '';
// onkeydown = (e) => {
//     record += String.fromCharCode(e.keyCode).toLowerCase();
//     if(e.keyCode === 13) {
//         console.log(record);
//         record = '';
//     }
//     // console.log(String.fromCharCode(e.keyCode))
// // }
// function returnNumReverse(arr) {
//     let a = [];
//     // arr = [...arr];
//     console.log(arr);
//     if(arr.length === 0) {
//         return a;
//     }
//     let b = returnNumReverse();
//     console.log(b);
// }
// function ListNode(x){
//     this.val = x;
//     this.next = null;
// }
// let arr = [1,2,3,4];
// let arr2 = [1];
// let cop = Array.from([...arr]);
// let a = new Array(10).fill(1);
// cop[0] = 3;
// console.log(arr);
// console.log(a);
// let num = 1;

// // let set = new Set();
// // let map = new Map();
// // 在js引用对象
// let node = new ListNode(1);
// node.next = new ListNode(2);
// node.next.next = new ListNode(3);

// let node2 = new ListNode(1);
// let node1 = node2;
// node2.next = node.next;
// // node2.next.val = 8;
// console.log(node);
// console.log(node1);
// let weakM = new WeakMap();
// let weakS = new WeakSet();

// set.add(1);
// set.add(2);
// set.add(node);
// //weakset 添加数值
// // weakS.add(1);//报错

// // weakM.set(node,1);
// // weakS.add(node);

// map.set(1,1);
// map.set(2,1);
// map.set(node,1);

// if (map.has(1)){
//     map.set(1,map.get(1)+1);
// }
// // console.log(map.has(3))
// console.log(set);
// console.log(map);
// console.log(map.get(1));
// console.log(weakS);

// // arr.shift();
// arr.unshift(3);
// arr.unshift(4);
// arr2.push(3);
// arr2.push(4);


// // console.log(arr.shift());
// console.log(arr2.shift());
// console.log(arr2);
// let get = returnNumReverse(arr);
// console.log(null === null);
// arr.reverse();
// console.log(arxr);
// arr.unshift()
// console.log(arr.pop())
// function ListNode(x) {
//     this.val = x;
//     this.next = null;
// }
// ListNode.next = null;
// if(null == null) {
//     console.log("true"); 
// }
// if(arr === arr2) {
//     console.log("true"); 
// }

// function splitSumSort(arr,left,right){
//     let middle = arr.length/2;
//     if(middle <= 1 ){
//         return arr;
//     }
//     splitSumSort(arr,middle,right);
//     splitSumSort(arr,left,middle);
// }
// let arr = [4,2,9,1,2];
// let result = splitSumSort(arr,0,arr.length);

// console.log(result);


function greedy(values, weights, capacity){
    let returnValue = 0
    let remainCapacity = capacity
    let sortArray = []
    values.map((cur, index) =>{
        sortArray.push({
        'value': values[index],
        'weight': weights[index],
        'ratio': values[index]/weights[index]
        })

    })

    sortArray.sort(function(a, b){

        return b.ratio > a.ratio

    })

    // console.log(sortArray)

    sortArray.map((cur,index) => {

        var num = parseInt(remainCapacity/cur.weight)

        // console.log(num)

        remainCapacity -= num*cur.weight

        returnValue += num*cur.value

    })

    return returnValue
}
const weights = [2,3,5,7,1,4,1] // 每个物品的重量,0位 置0
const values = [10,5,15,7,6,18,3] // 每个物品的价值,0位 置0
const capacity = 15 // 背包容量
const N = 7 // 物品数量
const result = greedy(values, weights, capacity) ;
console.log(result)
// 18 15 10 6 
// 5 5 2 1