const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
const cors = require('cors')
require('dotenv/config');
 

app.use(cors());
app.options('*', cors())

// middleware 
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'))
// Response to the backend calls
// app.use('/', express.static(__dirname + '/public/app'))



// Routes for different api endpoints
const productsRouter = require('./routers/products');
const categoriesRouter = require('./routers/catagories');
const messagesRouter = require('./routers/messages');
const storesRouter = require('./routers/stores');
const ordersRouter = require('./routers/orders');
const usersRouter = require('./routers/users');


const api = process.env.API_URL;

// routers 
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/messages`, messagesRouter);
app.use(`${api}/stores`, storesRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/users`, usersRouter);


// connecting to the mangoDB server
/**
 * {
 * useNewUrlParser: true,
 * useUnifiedTopology: true,
 * dbName: 'eshop-database'
 * })
 * this added piece of code I don't understand 
 * so I removed it since it doesn't effect the script
 *
 * CONNECTION_STRING
 */

mongoose.connect(process.env.CONN)
.then( () => {
    console.log('connection is ready!');    
})
.catch((err) => {
    console.log(err);
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});