const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");

require("dotenv").config();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8081;
mongoose
  .connect(`mongodb://${process.env.HOST}/${process.env.MONGO_PORT}`, {
    useNewUrlParser: true, useUnifiedTopology: true
  })
  .then(() => {
    console.log(`Connected to the mongodb mongodb://${process.env.HOST}:${process.env.MONGO_PORT}`);
  })
  .catch((err) => {
    console.log(err);
  });
const Item = mongoose.model("items", { name: String });

app.get("/", (req, res) => {
  Item.model("items").find((err, items) => {
    const itemList = items.map((item) => item.name);
    res.render("homepage", { list: itemList });
  });
});

app.post("/add", (req, res) => {
  console.log(req.body);
  const newItem = req.body;
  if (newItem.itemName !== "") {
    Item.create({ name: newItem.itemName }).then(() => {
        res.redirect("/");
    });
  }
});

app.post("/clear", (req, res) => {
  console.log("Clear All");
  Item.remove({}, (err) => {
    res.redirect("/");
  });
});

app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});

// app.get('/static', (req, res) => {
//     res.sendFile(path.join(__dirname + '/index.html'));
// });

// app.get('/mongodb', (req, res) => {
//     Item.model('items').find((err, items) => {
//         res.send(items);
//     })
// });
