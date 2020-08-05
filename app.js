const express = require("express");
const app = express();

const dramaRouter = require("./routes/dramaRoutes");
const viewRouter = require("./routes/viewRoutes");
const userRouter = require("./routes/userRoutes");
const commentRouter = require("./routes/commentRoutes");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);

app.use((req, res, next) => {
  console.log(req.headers.cookie);
  next();
});

// view
app.use("/", viewRouter);

// resource enpoints
app.use("/api/v1/dramas", dramaRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/comments", commentRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find this route ${req.url} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
