const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNHANDLED EXCEPTION! ☢️ Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const figlet = require("figlet");
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  });
// .catch((err) => console.log(`Error : can't connect to DB`));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(
    figlet.textSync(`port  ${port}`, {
      // font: 'Ghost',
      horizontalLayout: "controlled smushing",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    })
  );
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! ☢️ Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log("UNHANDLED EXCEPTION! ☢️ Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// unhandled  expetion - synchronous code bug's
