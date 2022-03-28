const express = require('express');
require('./models/db');

const userRouter = require("./routes/user")
const admin = require("./routes/adminrouter")
const productRouter = require("./routes/productrouter");

const app = express();

app.use(express.json());

app.use('/',userRouter);
app.use("/admin",admin);
app.use('/product',productRouter);


app.listen(8000, () => {
  console.log('port is listening');
});