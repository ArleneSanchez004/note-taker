const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");


app.use(express.urlencoded ({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/", htmlRoutes);
app.use("/api", apiRoutes);

//app.get("*", (req, res) => res.send("hello"));

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));

