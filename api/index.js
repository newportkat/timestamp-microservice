//create express server
const express = require("express")
const app = express()
const port = 3000

//use body-parser middleware
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))

//enable CORS
const cors = require("cors")
app.use(cors())

//configure app to listen to port
app.listen(port, () => {
   console.log(`App is listening at http://localhost:${port}/`)
})

//create/api/ endpoint
app.get("/api", (req, res) => {
   //create current date objects and assign to variables
   const unix = Date.now()
   const utc = new Date().toUTCString()

   //send json object to client
   res.send({
      unix: unix,
      utc: utc,
   })
})

//create /api/:date endpoint
app.get("/api/:date", (req, res) => {
   //create variable from user input
   const input = req.params.date

   //create regular expressions to validate input from user
   //regex for date in format DD-MM-YYYY
   const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-\d{4}$/

   //regex for unix timestamp
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
      const utc = new Date(Date.UTC(year, month - 1, day)).toUTCString()

      //send json object to client
      res.send({
         unix: unix,
         utc: utc,
      })
   }

   //if not correct date format, check to see if it is valid unix timestamp
   else if (intRegex.test(input)) {
      //convert timestamp to int
      const convertedInput = parseInt(input)

      //get UTC date string
      const utc = new Date(convertedInput).toUTCString()

      //send json object to client
      res.send({
         unix: convertedInput,
         utc: utc,
      })
   }

   //if not correctly formated date or unix timestamp, send error
   {
      res.send({
         error: "Invalid Date",
      })
   }
})
