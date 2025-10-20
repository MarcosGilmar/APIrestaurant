import express from "express";

const PORT = 3333
// Create a new express application instance
const app = express()

// Enable JSON parsing for incoming requests
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})