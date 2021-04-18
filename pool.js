//创建连接池对象
const mysql=require('mysql');
let pool=mysql.createPool({
  host:'127.0.0.1',
  port:3306,
  user:'root',
  password:'',
  database:'xz',
  connectionLimit:10
});
//导出pool对象
module.exports=pool;