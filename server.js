const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static("dist"));
app.use(express.static("public"));

// app.use("/mock", (req, res) => {
//   console.log("Req")
//   const messages = ["Isn't this cool?", "Hey there!", "How's life?", "I'm so tired..."]
//   const message = messages[Math.floor(Math.random() * messages.length)]
//   res.json({ message })
// })
app.use("/", (req, res) => {
  res.sendFile(path.join("dist", "index.html"), { root: "./" });
});

console.log("Process port", process.env.PORT)
// TODO: Add dotenv config call back and set this to 3000
app.listen(process.env.PORT || 3001, () => console.log("Server Started"));
