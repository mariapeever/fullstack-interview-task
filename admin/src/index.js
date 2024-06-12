const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const config = require("config")
const { processHoldingsData } = require("./middleware")

const app = express()

app.use(bodyParser.json({limit: "10mb"}))

app.get("/investments/:id", (req, res) => {
  const {id} = req.params
  request.get(`${config.investmentsServiceUrl}/investments/${id}`, (e, r, investments) => {
    if (e) {
      console.error(e)
      res.send(500)
    } else {
      res.send(investments)
    }
  })
})

app.get("/export", (req, res) => {
  // get investments
  request.get(`${config.investmentsServiceUrl}/investments`, (e, r, investments) => {
    if (e) {
      console.error(e)
      res.send(500)
    } else {
      request.get(`${config.financialCompaniesServiceUrl}/companies`, (e, r, companies) => {
        if (e) {
          console.error(e)
          res.send(500)
        } else {
          const csvObj = processHoldingsData(
            JSON.parse(companies), 
            JSON.parse(investments))     
          // post data
          request.post(`${config.investmentsServiceUrl}/investments/export`, JSON.stringify(csvObj))   
          // add text/csv header
          res.header("Content-Type", "text/csv")
          // send response
          res.send(csvObj.csv)
        }
      })
    }
  })
})

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
})
