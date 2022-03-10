const express = require("express");
const pool = require("../pool.js");
const router = express.Router();

// 1.1获取地址
router.get("/", (req, res) => {
  // 获取 user_id
  const user_id = req.query.user_id;
  console.log(user_id);
  const sql = "SELECT * FROM mall_receiver_address WHERE user_id=?";
  pool.query(sql, [user_id], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// 1.2删除地址
router.get('/delete',(req,res)=>{
  // 获取 aid
  const aid = req.query.aid;
  console.log(aid);
  const sql='DELETE FROM mall_receiver_address WHERE aid=?'
  pool.query(sql,aid,(err,result)=>{
    if(err) throw err;
    // console.log(result);
    if(result.affectedRows>0){
      res.send({code:200,msg:'delete success'});
    }else{
      res.send({code:301,msg:'delete error'});
    }
  })
})

module.exports = router;
