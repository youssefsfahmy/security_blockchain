const express = require("express");
const allRoutes = require("express-list-endpoints");
var bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const doctors = require("./api/routers/doctors.router");
const auth = require("./api/routers/auth.router");

const explore = (req, res) => {
  const routes = allRoutes(app);
  const result = {
    ServiceList: [],
  };
  routes.forEach((route) => {
    const name = route.path.split("/")[5];
    result.ServiceList.push({
      Service: {
        name,
        fullUrl: `${route.path}`,
      },
    });
  });
  return res.json(result);
};

app.use("/doctor", doctors);
app.use("/auth", auth);

app.use("/explore", explore);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
