// 首页商品数路由
const express=require('express')
// 引入连接池pool
const pool = require("../pool.js");
const router = express.Router();

// 1.查询首页商品  get  /
router.get("/", (req, res) => {
  // 查询数据库
  // 1.3执行 MySQL 语句 mall_shoppingcart_item
  pool.query("SELECT * FROM mall_index_product", (err, result) => {
    if (err) throw err;
    res.send({
      code: 200,
      msg: "查询成功",
      data: result,
    });
  });
  // res.send("查询轮播图成功");
});
// 导出路由器对象
module.exports = router;
