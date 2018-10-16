const express = require('express')
const os = require('os')
const mongoose = require('mongoose')

const DB_HOST = process.env.MONGO_HOST || 'localhost:27017'
const DB_NAME = process.env.MONGO_NAME || 'test'
const DB_URI = `mongodb://${DB_HOST}/${DB_NAME}`

// mongoose.connect(DB_URI, { useNewUrlParser: true })

const hostname = os.hostname()
const app = express()
const server = app.listen(3000, () => console.log(`Example app listening on port 3000! Host: ${hostname}`))

app.locals.stop = async () => {
  // await mongoose.disconnect()
  server.close(() => {
    process.exit(0)
  })
}

process.on('SIGTERM', app.locals.stop)
process.on('SIGINT', app.locals.stop)

//

// const hitsSchema = new mongoose.Schema({
//   hits: { type: Number, default: 1 },
// })

// const Hits = mongoose.model('Hits', hitsSchema)

// app.get('/', async (req, res) => {
//   let hit = await Hits.findOne({}).exec()

//   if (hit) {
//     hit.hits = ++hit.hits
//   } else {
//     hit = new Hits({})
//   }

//   await hit.save()

//   const json = {
//     hostname,
//     hits: hit.hits,
//   }

//   console.log(json)

//   return res.json(json)
// })

// app.get('/health-check', async (req, res) => res.end())

app.get('/', async (req, res) => res.end())
