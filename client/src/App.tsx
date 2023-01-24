import axios from "axios"
import React from "react"

const App = () => {
   async function getData() {
      try {
         const response = await axios.get("http://localhost:3000/api/")
         console.log(response.data)
      } catch (error) {
         console.error(error)
      }
   }

   getData()

   return <div></div>
}

export default App
