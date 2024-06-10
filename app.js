// app.js
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const db = require('./config/db');
const authRoutes = require('./routes/auth');
const user=require('./routes/user')
const app = express();
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/user',user)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
