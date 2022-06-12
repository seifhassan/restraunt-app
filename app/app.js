const express = require("express");
const categoryRoutes = require("../routes/category.routes");
const itemRoutes = require("../routes/item.routes");
const userRoutes = require("../routes/user.routes");
const cors = require("cors");
const app = express();
require("../db/connection");
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/items", itemRoutes);

module.exports = app;
