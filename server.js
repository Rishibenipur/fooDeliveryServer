import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routers/router.js';
import dataBaseconnection from './models/connection.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(router);
dataBaseconnection();
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
