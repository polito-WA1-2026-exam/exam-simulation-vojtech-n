import express from 'express'
import router from './routes/index.js'
import morgan from 'morgan'

const app = express()

// JSON middleware -- GLOBAL
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Custom logging MW
// app.use((req, res, next) => {
//   console.log(`➡️  ${req.method} ${req.url}`);
//   next();
// });

app.use('/api/v1', router)

app.use((err, req, res, next) => {
    const status = err.status || 500
    res.status(status).json({ success: false, message: err.message })
})

export default app