const express=require('express');
const pool=require('../pool');
let router=express.Router();


// 挂载路由
// 1.商品列表  get  /list
router.get('/list',(req,res)=>{

  // 1.1获取数据
  let obj=req.query;
  console.log(obj);

  // 1.2检测数据是否为空，设置默认值
  if(!obj.pno) obj.pno=1;
  if(!obj.count) obj.count=2;

  // 1.3将每页大小转为整型
  obj.count=parseInt(obj.count);
  console.log(obj);

  // 1.4计算start
  let start=(obj.pno-1)*obj.count;

  // 1.5执行SQL语句
  pool.query('SELECT * FROM mall_index_product LIMIT ?,?',[start,obj.count],(err,result)=>{
    if(err){
      res.send({code:500,msg:'server err'});
      return;
    }
    // console.log(result);
    res.send({
      code:200,
      msg:'ok',
      data:result
    });
  });
});

// 2.商品添加  post  /insert
router.post('/insert',(req,res)=>{
  // 2.1获取post请求的数据
  let obj=req.body;
  console.log(obj);
  // 2.2验证数据是否为空，如果为空做出响应
  if(!obj.title){
    res.send({code:401,msg:'title required'});
    return;
  }
  if(!obj.details){
    res.send({code:402,msg:'details required'});
    return;
  }
  if(!obj.pic){
    res.send({code:403,msg:'pic required'});
    return;
  }
  if(!obj.price){
    res.send({code:404,msg:'price required'});
    return;
  }
  if(!obj.href){
    res.send({code:405,msg:'href required'});
    return;
  }
  // 插入数据
  // 执行SQL语句
  pool.query('INSERT INTO mall_index_product SET ?',[obj],(err,result)=>{
    if(err) throw err;
    // console.log(result);

    // 如果数据插入成功，响应一个对象
  if(result.affectedRows>0){
    res.send({code:200,msg:'register success'});
  }
  });
});

// 3.商品修改  post  /update
router.post('/update',(req,res)=>{

  // 3.1获取post请求的修改数据
  let obj=req.body;
  console.log(obj);

  // 3.2验证数据是否为空
  let i=400;
  for(let key in obj){
    i++;
    if(!obj[key]){
      res.send({code:i,msg:key+' required'});
      return;
    }
  }

  // 3.3执行SQL语句
  pool.query('UPDATE mall_index_product SET ? WHERE pid=?',[obj,obj.pid],(err,result)=>{
    // 如果出错，则抛出错误
    if(err) throw err;
    // console.log(result);

    // 判断是否修改成功
    if(result.affectedRows>0){
      res.send({code:200,msg:'update success'});
    }else{
      res.send({code:301,msg:'update error'});
    }
  });
});

// 4.商品详情  get  /detail
router.get('/detail',(req,res)=>{
  // 4.1获取get请求的数据
  let obj=req.query;
  console.log(obj);

  // 4.2检验obj.pid是否为空
  if(!obj.pid){
    res.send({code:401,msg:'pid required'});
    return;
  }

  // 4.3执行SQL语句
  pool.query('SELECT * FROM mall_index_product WHERE pid=?',[obj.pid],(err,result)=>{
    // 如果出错，则返回错误
    if(err) throw err;
    // console.log(result);

    // 返回状态码
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

// 5.删除商品  get  /delete
router.get('/delete',(req,res)=>{
  // 5.1获取get请求的数据
  let obj=req.query;
  console.log(obj);

  // 5.2检验obj.pid是否为空
  if(!obj.pid){
    res.send({code:401,msg:'pid required'});
    return;
  }

  // 5.3执行SQL语句
  pool.query('DELETE FROM mall_index_product WHERE pid=?',[obj.pid],(err,result)=>{
    // 如果报错则返回错误
    if(err) throw err;
    // console.log(result);

    // 判断是否修改成功
    if(result.affectedRows>0){
      res.send({code:200,msg:'delete success'});
    }else{
      res.send({code:301,msg:'delete error'});
    }
  });
});

// 导出路由器对象
module.exports=router;