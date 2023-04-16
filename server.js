const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static("dist"));
app.use(express.static("public"));

app.use("/mock", (req, res) => {
  const messages = ["Isn't this cool?", "Hey there!", "How's life?", "I'm so tired..."]
  const message = messages[Math.floor(Math.random() * messages.length)]
  res.json({ message })
})
app.use("/", (req, res) => {
  res.sendFile(path.join("dist", "index.html"), { root: "./" });
});


app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
