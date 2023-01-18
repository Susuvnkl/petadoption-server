const express = require(`express`);
require(`dotenv`).config();
const cors = require(`cors`);
const app = express();
const dbConnection = require("./knex/knex");
const cookieParser = require("cookie-parser");

// Routes
const path = require("path");

const petRoutes = require("./routes/petsRoutes");
const usersRoutes = require("./routes/usersRoutes");
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static("images"));
app.use(cors({ origin: ["http://localhost:3000", "https://petadoption-client.vercel.app"], credentials: true }));
app.use("/pets", petRoutes);
app.use("/users", usersRoutes);

app.use("*", (req, res) => {
  res.status(404).send({ messege: "Oops page not found" });
});

app.use((err, req, res) => {
  console.log(err);
  res.status(500).send("Somthing broke!");
});

dbConnection.migrate.latest().then((migration) => {
  if (migration) {
    console.log(`connected to db`, migration);

    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
    });
  }
});
