const express = require("express");
const pool = require("../pool.js");
const router = express.Router();
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
module.exports = router;
