import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:3001/' || process.env.API_URL,
})
