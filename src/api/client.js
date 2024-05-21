import axios from 'axios'

const client = axios.create({
  // baseURL: 'http://localhost/',
  baseURL: 'http://172.30.1.85/',

  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

export default client
