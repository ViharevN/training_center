const express = require('express');
const personRouter = require('./routes/person.routes');
const authRoutes = require('./routes/auth');

const cors = require('cors')

const PORT = process.env.PORT || 8080

const app = express()

app.use(require('morgan')('dev'))
app.use(cors())
app.use(express.json())
app.use('/', personRouter)
app.use('/api/auth', authRoutes)
app.listen(PORT, () => console.log(`server started on port ${PORT}`))