const express = require('express');
const cors  = require('cors');

const app = express();
const port = 3000;

//middleware
const allowedOrigins = ["http://localhost:5173"];
app.use(cors({
  origin: function (origin, callback) {
    // Check if the origin is in the allowedOrigins array
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Deny the request
    }
  }
}));

// Middleware to parse JSON bodies
app.use(express.json());


app.post('/start',async(req,res)=>{
  const imgData = req.body.imgData;
  console.log(imgData);
})

app.listen(port,()=>{
    console.log(`Server is runnig on port ${port}`);
})