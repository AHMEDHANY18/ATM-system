import Account from '../../../db/models/Account.model.js';
import Transaction from '../../../db/models/Transactions.model.js';
import { asyncHandler } from "../../middelware/asyncHandler.js"
import {AppError} from"../../../Utility/classErrors.js"
import { ApiFeatures } from '../../../Utility/apiFeatures.js';


// Create Account
export const createAccount = asyncHandler(async (req, res) => {
    const user = req.user._id;
    const account = await Account.findOne({ user });

    if (account) {
        return next(new AppError({ msg: 'Account already exists' }));
    }

    const newAccount = await Account.create({ user });
    res.status(201).json({ message: 'Account created successfully', account: newAccount });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Deposit
export const deposit = asyncHandler(async (req, res) => {
    const { amount } = req.body;
    const account = await Account.findOne({ user: req.user._id });

    if (!account) {
        return next(new AppError("account not found"));
    }

    account.balance += amount;
    await account.save();

    const transaction = await Transaction.create({
        account: account._id,
        type: 'deposit',
        amount
    });

    res.status(200).json({ message: 'Deposit successful', balance: account.balance, transaction });
});
//////////////////////////////////////////////////////////////////////////////////////////
// Withdraw
    export const withdraw = asyncHandler(async (req, res) => {
        const { amount } = req.body;
        const account = await Account.findOne({ user: req.user._id });

        if (!account) {
        return next(new AppError("account not found"));
        }

        if (account.balance < amount) {
        return next(new AppError("not enough funds"));
        }

        account.balance -= amount;
        await account.save();

        const transaction = await Transaction.create({
            account: account._id,
            type: 'withdraw',
            amount
        });

        res.status(200).json({ message: 'Withdrawal successful', balance: account.balance, transaction });
    });
///////////////////////////////////////////////////////////////////////////////////////
// Get Balance
export const getBalance = asyncHandler(async (req, res) => {
    const account = await Account.findOne({ user: req.user._id });

    if (!account) {
        return next(new AppError("account not found"));
    }

    res.status(200).json({ balance: account.balance });
});
//////////////////////////////////////////////////////////////////////////////
// Get Transactions
export const getTransactions = asyncHandler(async (req, res) => {
    const account = await Account.findOne({ user: req.user._id });
    if (!account) {
        return next(new AppError("account not found"));
    }
    const apiFeature = new ApiFeatures(Transaction.find({ account: account._id }), req.query)
        .pagination()
        .filter()
        .sort()
        .select()
        .search();
    const transactions = await apiFeature.mongooseQuery;
    res.status(200).json({
        msg: 'Transactions retrieved successfully',
        page: apiFeature.page,
        transactions
    });
});

