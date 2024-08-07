import dotenv from 'dotenv';
import connectiontDB from './db/connectionDB.js';
import express from 'express';
import userRouter from './src/modules/user/user.routes.js';
import accountRouter from './src/modules/account/account.routes.js';
// import transactionRouter from './src/modules/transaction/transaction.routes.js';

dotenv.config();

const app = express();
const port = 3000;
connectiontDB();
app.use(express.json());

app.use('/user', userRouter);
app.use('/account', accountRouter);
// app.use('/transaction', transactionRouter);

app.use('*', (req, res, next) => {
    // Handle invalid requests
    const err = new Error(`Invalid request ${req.originalUrl}`);
    next(err);
});

// Global error handler
app.use((err, req, res, next) => {
    res.status(400).json({ msg: 'Error', err: err.message });
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
