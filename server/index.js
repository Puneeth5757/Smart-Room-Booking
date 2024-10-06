require('./db/conn')
const express = require('express');

const cors = require('cors');
const app = express();
const port = 3000;

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true,
  };

app.use(cors(corsOptions));
app.use(express.json());

// Serve static files from 'uploads' (for photo access)
app.use('/uploads', express.static('uploads'));

app.use("/api/g-users", require("./routes/google-userRouter"));
app.use("/api/g-owners", require("./routes/google-ownerRouter"));
app.use("/api/users", require("./routes/usersRouter"));
app.use("/api/owners", require("./routes/ownersRouter"));
app.use("/api/rooms", require("./routes/roomsRouter"));

app.listen(port,()=>{
    console.log(`server start at port no : ${port}`);
})
