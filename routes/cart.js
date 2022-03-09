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
  query(sql, [user_id]).then((result) => {
    output.item=result
    let lid=[]
    result.forEach(item => {
      // console.log(item.product_id);
      lid.push(item.product_id)
    });
    console.log(lid);
    let sql='SELECT * FROM `mall_laptop` where lid in (?) group by lid'
    return query(sql,[lid])
  })
  .then(result=>{
    output.laptop=result
    console.log(result);
    res.send(output)
  })
});

// 2.添加用户购物车  get  /add

// 导出路由器对象
module.exports = router;
