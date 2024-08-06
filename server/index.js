const express = require('express');
require('./db/conn')

const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/rooms', require('./routes/roomRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

app.listen(port,()=>{
    console.log(`server start at port no : ${port}`);
})
