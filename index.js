const express = require('express')
const app = express();
const port = 3000;


const doctors = require('./api/routers/doctors.router')

const explore = (req, res) => {
    const routes = allRoutes(app)
    const result = {
      ServiceList: [],
    }
    routes.forEach((route) => {
      const name = route.path.split('/')[5]
      result.ServiceList.push({
        Service: {
          name,
          fullUrl: `${route.path}`,
        },
      })
    })
    return res.json(result)
  }

app.use('/doctor', doctors)
app.use('/explore', explore)

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});