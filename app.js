const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const timesheetRoutes = require("./routes/timesheet");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

app.set("view engine", "ejs");

// Routes
app.use("/", timesheetRoutes);

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
