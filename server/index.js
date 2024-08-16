require('./db/conn')
const express = require('express');

const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/usersRouter"));
app.use("/api/owners", require("./routes/ownersRouter"));

app.listen(port,()=>{
    console.log(`server start at port no : ${port}`);
})
