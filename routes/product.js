//创建路由器对象
const express=require('express');
let router=express.Router();
//引入pool对象
const pool=require('../pool.js');
//挂载路由

//导出路由器对象
module.exports=router;