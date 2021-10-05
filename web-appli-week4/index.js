const express = require("express");
const app = express();
const path = require("path");
const PORT = 8000;


app.use(express.static(path.join(__dirname, "public")));
app.use("/recipe", require("./recipe/food.js"));

app.get("/", (req, res) => { 
  res.render("index");  
})

app.listen(PORT, () => console.log('Server started on port ' + PORT));