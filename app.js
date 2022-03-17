// 创建web服务器
const express = require("express");
// 引入cors模块
const cors = require("cors");

// 引入路由器
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
// 引入 cart 路由器
const cartRouter = require("./routes/cart.js");
// 引入 carousel 路由器
const carouselRouter = require("./routes/carousel.js");
// 引入 index 路由器
const indexRouter = require("./routes/index.js");
// 引入 details 路由器
const detailsRouter = require("./routes/details.js");
// 引入 address 路由器
const addressRouter = require("./routes/address.js");

const bodyParser = require("body-parser");

// 创建网站服务器
let app = express();

//专门实现服务器端CORS跨域的中间件模块
//项目本地安装cors模块: npm i -save cors
app.use(
  cors({
    //       VUE脚手架项目             Live Server
    origin: ["http://127.0.0.1:8080","http://caizy.cc:83, "http://127.0.0.1:9999"],
    credentials: true,
  })
);

// 监听端口
app.listen(9999);

// 托管静态资源到public目录下
app.use(express.static("public"));
// 请求user_register.html
// 使用body-parser中间件
app.use(
  bodyParser.urlencoded({
    extended: false, //不用拓展的qs模块，使用querystring模块
  })
);

// 路由器挂载到服务器下（前缀  /user）
// 请求/user/register
app.use("/user", userRouter);
app.use("/product", productRouter);
// 把路由器挂载到服务器下，添加前缀  /cart
app.use("/cart", cartRouter);
// 把路由器挂载到服务器下，添加前缀  /carousel
app.use("/carousel", carouselRouter);
// 把路由器挂载到服务器下，添加前缀  /index
app.use("/index", indexRouter);
// 把路由器挂载到服务器下，添加前缀  /details
app.use("/details", detailsRouter);
// 把路由器挂载到服务器下，添加前缀  /address
app.use("/address", addressRouter);
