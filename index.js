import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = 3000;

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser: true}).then(function(){
  console.log("mongo is connected")
})
.catch(
  function(err){
    console.log(err)
  }
);

const itemsSchema = {
  name: "String"
}

const Item= mongoose.model("Item",itemsSchema)

const item1= new Item({
  name: "Finish Homework"
})
const item2= new Item({
  name: "a lil bit of summin"
})
const item3= new Item({
  name: "hello mate"
})

const defaultItems=[item1,item2,item3];

Item.insertMany(defaultItems).then(function(){
  console.log("Insterted into db")
})
.catch(
  function(err){
    console.log(err)
  }
);


app.get("/", (req, res) => {
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", (req, res) => {
  const item = req.body.newItem;
  items.push({ title: item });
  res.redirect("/");
});

app.post("/edit", (req, res) => {});

app.post("/delete", (req, res) => {});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
