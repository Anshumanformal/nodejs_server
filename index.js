

const AxiosAPIGatewayClient = require('./AxiosAPIGatewayClient');
const client = new AxiosAPIGatewayClient('https://kwjo934pq7.execute-api.us-east-1.amazonaws.com/test');

const express = require('express')

const app = express()
const PORT = 3000

// Middleware to parse JSON
app.use(express.json())

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Node.js server is running'
  })
})

app.get('/start', async(req, res) => {
  try {
    console.log('Route : /start called')
    await client.post('/process-all', { name: 'John' });
    
    res.status(200).json({
      greeting: 'Hello from Node.js'
    })
  } catch (error) {
    res.status(500).json({
      error: 'Something went wrong'
    })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})


