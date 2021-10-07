const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 1234;


app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use("/recipe", require("./routes/recipe.js"));
app.use("/images", require("./routes/images.js"));

app.get("/", (req, res) => { 
  res.render("index");  
})

app.listen(PORT, () => console.log('Server started on port ' + PORT));