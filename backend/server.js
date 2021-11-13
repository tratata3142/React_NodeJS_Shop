import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routers/userRouter.js'
import productRouter from './routers/productRouter.js'
import orderRouter from './routers/orderRouter.js'
import uploadRouter from './routers/uploadRouter.js'
import path from 'path'

dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona')

app.use('/api/uploads', uploadRouter)
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})
app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')))
app.get('/', (req, res) => {
  res.send('Server is ready')
})

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Serve at http://localhost:${PORT}`)
})