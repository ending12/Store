// C的数组越界问题
let i = 0;
let arr = [];
let obj = {};
// arr[3] = {1:1};

// console.log(typeof arr);//
// for (; i<=3; i++) {
//     arr[i] = 0;
//     // console.log("hello", arr);
// }

// console.log(arr instanceof Array );//true
// console.log(arr instanceof Object);//true

// console.log(obj instanceof Array );//false
// console.log(obj instanceof Object);//true


// console.log(typeof null);//object
// console.log(typeof arr);//object
// console.log(typeof obj);//object

// console.log(arr.toString());//  
// console.log(obj.toString());//[object Object]
// console.log(arr == 0);//true
// console.log(arr === 0);
// console.log('   ');//false
// if([]) {
//     console.log("this space is empty");
// }

// let test = [1,2,3,4,5,6,7];
// while(test.length) {
//     console.log(test.pop());
// }
// console.log(test)
// test.reduce()
// delete test[1];
// console.log(test[1]);
// console.log(test);
// test.forEach((v) => console.log(v));
// 创建完全二维数组函数
const createFullTwoDimenArray = (len, width, num = '') => new Array(len).fill(num).map(item => new Array(width).fill(num))

// 基础解题,二维数组动态规划
const package_01 = (M, N, W, V) => {
    // dp 数组 dp[i][0] = 0 dp[0][j] = 0 防止下标运算越界
    const dp = createFullTwoDimenArray(N + 1, M + 1, 0)

    for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= M; j++) {
            if (j < W[i])
                dp[i][j] = dp[i - 1][j]
            else
                dp[i][j] = dp[i - 1][j] >= dp[i - 1][j - W[i]] + V[i] ? dp[i - 1][j] : dp[i - 1][j - W[i]] + V[i]
        }
    }

    return dp[N][M]
}
// 优化版本,一维滚动数组
// 因为后无效性原则:当前状态只与上一次的状态有关
// 其实每次只用到了上一次统计过的数据，所有可以讲二维表优化成为一维的数组不停的覆盖运算即可
const package_01_ScrollingArray = (M, N, W, V) => {
    const dp = new Array(M + 1).fill(0)

    for (let i = 1; i <= N; i++) {
        for (let j = M; j >= 1; j--) {
            if (j >= W[i])
                dp[j] = dp[j] >= dp[j - W[i]] + V[i] ? dp[j] : dp[j - W[i]] + V[i]
        }
    }

    return dp[M]
}

// 测试数据
// <详细输入太麻烦了，直接把测试数据写死了>
const W = [2,3,5,7,1,4,1] // 每个物品的重量,0位 置0
const V = [10,5,15,7,6,18,3] // 每个物品的价值,0位 置0
const M = 15 // 背包容量
const N = 7 // 物品数量

console.log('最大的总价值：', package_01(M, N, W, V))
console.log('最大的总价值：', package_01_ScrollingArray(M, N, W, V))
