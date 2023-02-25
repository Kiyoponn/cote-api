import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'

import api from './api'
import * as middlewares from './middlewares'

require('dotenv').config()

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())

const staticPath = app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (_, res) => {
  return res.sendFile('/index.html', { root: staticPath })
})
app.use('/api/v1', api)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

export default app
