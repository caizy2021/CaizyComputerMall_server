const express = require("express");
// 引入连接池
const pool = require("../pool.js");
var query = require("./query");
const router = express.Router();

// 挂载路由
// 1.查询用户购物车  get  /detail
router.get("/detail", (req, res) => {
  // 1.1获取数据
  let user_id = req.query.user_id;
  let output = {};
  let sql = "SELECT * FROM mall_shoppingcart_item WHERE user_id=?";

  // 1.2验证数据是否为空
  if (!user_id) {
    res.send({ code: 401, msg: "user_id required" });
    return;
  }

  // 查询数据库
  // 1.3执行 MySQL 语句 mall_shoppingcart_item
  query(sql, [user_id])
    .then((result) => {
      output.item = result;
      let lid = [];
      result.forEach((item) => {
        // console.log(item.product_id);
        lid.push(item.product_id);
      });
      console.log(lid);
      let sql = "SELECT * FROM `mall_laptop` where lid in (?) group by lid";
      return query(sql, [lid]);
    })
    .then((result) => {
      output.laptop = result;
      console.log(result);
      res.send(output);
    });
});

// 2.添加用户购物车  get  /add
router.get("/add", (req, res) => {
  let user_id = req.query.user_id;
  let product_id = req.query.product_id;
  let count = req.query.count;
  let is_checked = req.query.is_checked;
  let add = {
    user_id,
    product_id,
    count,
    is_checked,
  };
  let sql = "INSERT INTO mall_shoppingcart_item SET ?";
  // 执行SQL语句
  pool.query(sql, [add], (err, result) => {
    if (err) throw err;
    // 如果数据插入成功，响应一个对象
    if (result.affectedRows > 0) {
      res.send({ code: 200, msg: "register success" });
    }
  });
  // res.send(add);
});

// 3.删除购物车  get  /delete
router.get('/delete',(req,res)=>{
  let obj=req.query;
  console.log(obj);
  pool.query('DELETE FROM mall_shoppingcart_item WHERE iid=?',[obj.iid],(err,result)=>{
    if(err) throw err;
    // console.log(result);
    if(result.affectedRows>0){
      res.send({code:200,msg:'delete success'});
    }else{
      res.send({code:301,msg:'delete error'});
    }
  });
})

// 导出路由器对象
module.exports = router;
