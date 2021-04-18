//创建路由器对象
const express=require('express');
let router=express.Router();
//引入pool对象
const pool=require('../pool.js');
//挂载路由
//1.用户注册  post /register
router.post('/register',(req,res)=>{
  let obj=req.body;
  console.log(obj);
  if(!obj.uname){
    res.send({
      code:401,
      msg:'用户名为空'
    });
    return;
  }
  if(!obj.upwd){
    res.send({
      code:402,
      msg:'密码为空'
    });
    return;
  }
  if(!obj.email){
    res.send({
      code:403,
      msg:'邮箱为空'
    });
    return;
  }
  if(!obj.phone){
    res.send({
      code:404,
      msg:'电话为空'
    });
    return;
  }
  let sql='INSERT INTO xz_user SET ?';
  pool.query(sql,[obj],(err,result)=>{
    if(err){
      res.send({
        code:500,
        msg:'server error'
      });
      return;
    }
    if(result.affectedRows>0){
      res.send({
        code:200,
        msg:'register success'
      });
    }else{
      res.send({
        code:201,
        msg:'register error'
      });
    }
  });
});

//2.用户登录 get /login
router.get('/login',(req,res)=>{
  let obj=req.query;
  if(!obj.uname){
    res.send({
      code:401,
      msg:'uname required'
    });
    return;
  }
  if(!obj.upwd){
    res.send({
      code:402,
      msg:'upwd required'
    });
    return;
  }
  pool.query('SELECT * FROM xz_user WHERE uname=? AND upwd=?',[obj.uname,obj.upwd],(err,result)=>{
    if(err){
      res.send({
        code:500,
        msg:'server error'
      });
      return;
    }
    if(result.length>0){
      res.send({
        code:200,
        msg:'login success'
      });
    }
    else{
      res.send({
        code:301,
        msg:'login error'
      });
    }
  });
});

//3.检索用户
router.get('/detail',(req,res)=>{
  let obj=req.query;
  if(!obj.uid){
    res.send({
      code:401,
      msg:'uid required'
    });
    return;
  }
  pool.query('SELECT * FROM xz_user WHERE uid=?',[obj.uid],(err,result)=>{
    if(err)throw err;
    if(result.length>0){
      res.send({
        code:200,
        msg:'ok',
        data:result[0]
      });
    }else{
      res.send({
        code:401,
        msg:'none exists'
      });
    }
  });
});
//4.修改用户

//导出路由器对象
module.exports=router;