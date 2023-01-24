//create express server
const express = require("express")
const app = express()
const port = 3000

//configure app to listen to port
app.listen(port, () => {
   console.log(`App is listening at http://localhost:${port}/`)
})

//set up date endpoint
app.get(
   "/api/test",
   (req, res, next) => {
      //get date
      const utc = new Date().toString()
      const unix = Date.now()
      req.utc = utc
      req.unix = unix
      next()
   },
   (req, res) => {
      //send date
      res.send({
         date: req.utc,
         unix: req.unix,
      })
   }
)

app.get("/api/:date", (req, res, next) => {
   //create variable from user input
   const input = req.params.date

   //create regular expressions to validate input from user
   const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-\d{4}$/
   const intRegex = /^-?\d+$/

   //check if date entered is in valid DD-MM-YYYY format using regex
   if (dateRegex.test(input)) {
      //if date is in valid format, split it into separate variables
      const parts = input.split("-")
      const day = parts[0]
      const month = parts[1]
      const year = parts[2]

      //create date objects and store in variables
      // format used is new Date(year, monthIndex, day), therefore -1 from month to match index
      //get unix timestamp
      const unix = new Date(Date.UTC(year, month - 1, day)) / 1000

      //get UTC date string
      const utc = new Date(year, month - 1, day).toString()

      //send json object to client
      res.send({
         unix: unix,
         utc: utc,
      })
   }

   //if not in correct date format, check to see if it is valid unix timestamp
   else if (intRegex.test(input)) {
      //convert timestamp to int and from s to ms
      const convertedInput = parseInt(input) * 1000

      //get UTC date string
      const utc = new Date(convertedInput).toString()

      //send json object to client
      res.send({
         unix: convertedInput,
         utc: utc,
      })
   }

   //if date is not valid format, check to see if it is a valid unix timestamp
})
