const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/short-url.js");
const validUrl = require("valid-url");
const methodOverride = require("method-override");
const app = express();
require("dotenv").config();

mongoose.connect(
  `mongodb+srv://mango:${process.env.mango}@cluster0.sezq3em.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// mongoose.connect(`mongodb://localhost:27017`, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.get("/", async (req, res) => {
  // const shortUrlRecords = await ShortUrl.find();
  const shortUrlRecords = await ShortUrl.find({ ip: req.ip });
  // console.log(shortUrlRecords)
  res.render("index", { shortUrlRecords });
});
app.get("/api", async (req, res) => {
  const shortUrlRecords = await ShortUrl.find();
  res.json({ shortUrlRecords });
});
app.post("/shortUrls", async (req, res) => {
  const { fullUrl } = req.body;
  if (!validUrl.isUri(fullUrl)) {
    return res.status(404).json("Invalid base URL!");
  }
  if (validUrl.isUri(fullUrl)) {
    try {
      await ShortUrl.create({ full: fullUrl, ip: req.ip });
    } catch (err) {
      console.log(err);
      res.status(500).json("Server Error");
    }
  }
  res.redirect("/");
});
app.get("/:user/:shortId", async (req, res) => {
  const targetRecord = await ShortUrl.findOne({ short: req.params.shortId });
  if (targetRecord === null) return res.sendStatus(404);
  targetRecord.clicks++;
  targetRecord.save();
  res.redirect(targetRecord.full);
});
app.get("/:shortId", async (req, res) => {
  const targetRecord = await ShortUrl.findOne({ short: req.params.shortId });
  if (targetRecord === null) return res.sendStatus(404);
  targetRecord.clicks++;
  targetRecord.save();
  res.redirect(targetRecord.full);
});
app.post("/api/url", async (req, res, next) => {
  try {
    const { fullUrl } = req.body;
    const urlData = await ShortUrl.create({ full: fullUrl, ip: req.ip });
    res.status(201).json({
      data: {
        clicks: urlData["clicks"],
        full: urlData["full"],
        short: urlData["short"],
        ip: urlData["ip"],
      },
    });
  } catch (e) {
    res.status(500).json({ error: true, data: e });
  }
});

app.post("/api/url/shortOnly", async (req, res, next) => {
  try {
    const { fullUrl } = req.body;
    const urlData = await ShortUrl.create({ full: fullUrl, ip: req.ip });
    res.status(201).json(urlData["short"]);
  } catch (e) {
    res.status(500).json({ error: true, data: [e] });
  }
});

app.delete("/api/delete/:shortId", async (req, res, next) => {
  try {
    const { shortId } = req.params;
    const urlData = await ShortUrl.findOneAndRemove({ short: shortId });
    res.status(410).json({
      error: false,
      data: urlData,
    });
  } catch (e) {
    res.status(500).json({ error: true, data: [] });
  }
});
app.listen(process.env.PORT || 8182);
