const express=require('express');
const pool=require('../pool');
let router=express.Router();


// 挂载路由
// 1.用户注册  post  /register
router.post('/register',(req,res)=>{
  // 1.1获取post请求的数据
  let obj=req.body;
  console.log(obj);
  // 1.2验证数据是否为空，如果为空做出响应
  if(!obj.uname){
    res.send({code:401,msg:'uname required'});
    return;
  }
  if(!obj.upwd){
    res.send({code:402,msg:'upwd required'});
    return;
  }
  if(!obj.email){
    res.send({code:403,msg:'email required'});
    return;
  }
  if(!obj.phone){
    res.send({code:404,msg:'phone required'});
    return;
  }
  // 插入数据
  // 执行SQL语句
  pool.query('INSERT INTO mall_user SET ?',[obj],(err,result)=>{
    if(err) throw err;
    console.log(result);

    // 如果数据插入成功，响应一个对象
  if(result.affectedRows>0){
    res.send({code:200,msg:'register success'});
  }
  });
});

// 2.用户登录  post  /login
router.get('/login',(req,res)=>{

  // 2.1获取数据
  let obj=req.query;
  console.log(obj);

  // 2.2验证数据是否为空
  if(!obj.uname){
    res.send({code:401,msg:'uname required'});
    return;
  }
  if(!obj.upwd){
    res.send({code:402,msg:'upwd required'});
    return;
  }

  // 2.3执行SQL语句
  pool.query('SELECT * FROM mall_user WHERE uname=? AND upwd=?',[obj.uname,obj.upwd],(err,result)=>{
    if(err) throw err;
    console.log(result);
    // 如果返回的数组长度大于0则成功，否则失败
    if(result.length>0){
      res.send({code:200,msg:'login success',data:result[0]});
    }else{
      res.send({code:301,msg:'login error'});
    }
  });
});

// 3.用户检索  get /detail
router.get('/detail',(req,res)=>{
  // 3.1获取数据
  let obj=req.query;
  // console.log(obj);
  // 3.2验证数据是否为空
  if(!obj.uid){
    res.send({code:401,msg:'uid required'});
    return;
  }
  // 3.3执行SQL语句
  pool.query('SELECT * FROM mall_user WHERE uid=?',[obj.uid],(err,result)=>{
    if(err) throw err;
    // console.log(result);
    if(result.length>0){
      res.send({
        code:200,
        msg:'ok',
        data:result[0]
      });
    }else{
      res.send({code:301,msg:'cannot find'});
    }
  });
});

// 4.修改用户资料  post /update
router.post('/update',(req,res)=>{

  // 4.1获取编号数据
  let obj=req.body;
  console.log(obj);

  // 4.2验证数据是否为空
  let i=400;
  for(let key in obj){
    // console.log(key,obj[key]);
    // obj[key]
    i++;
    if(!obj[key]){
      res.send({code:i,msg:key+' required'});
      return;
    }
  }

  // 4.3执行SQL语句
  pool.query('UPDATE mall_user SET ? WHERE uid=?',[obj,obj.uid],(err,result)=>{
    if(err) throw err;
    console.log(result);
    // 判断是否修改成功
    if(result.affectedRows>0){
      res.send({code:200,msg:'update success'});
    }else{
      res.send({code:301,msg:'update error'});
    }
  });
});

// 5.用户列表  get /list
router.get('/list',(req,res)=>{

  // 5.1获取数据
  let obj=req.query;
  console.log(obj);

  // 5.2验证是否为空
  if(!obj.pno) obj.pno=1;
  if(!obj.count) obj.count=2;

  // 5.3将每页大小转为整型
  obj.count=parseInt(obj.count);
  console.log(obj);

  // 5.4计算start
  let start=(obj.pno-1)*obj.count;

  // 5.5执行SQL语句
  pool.query('SELECT * FROM mall_user LIMIT ?,?',[start,obj.count],(err,result)=>{
    if(err) throw err;
    // console.log(result);
    res.send({
      code:200,
      msg:'ok',
      data:result
    });
  });
});

// 6.删除用户  get  /delete
router.get('/delete',(req,res)=>{

  // 6.1获取编号数据
  let obj=req.query;
  console.log(obj);

  // 6.2判断数据是否为空
  if(!obj.uid){
    res.send({code:401,msg:'uid required'});
    return;
  }

  // 6.3执行SQL语句
  pool.query('DELETE FROM mall_user WHERE uid=?',[obj.uid],(err,result)=>{
    if(err) throw err;
    // console.log(result);
    if(result.affectedRows>0){
      res.send({code:200,msg:'delete success'});
    }else{
      res.send({code:301,msg:'delete error'});
    }
  });
});

// 导出路由器对象
module.exports=router;