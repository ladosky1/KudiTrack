import {Request, Response} from "express";

import Transaction from "../models/Transaction.Model";
import { AppError } from "../utils/AppError";

import { 
    createTransactionSchema,
    updateTransactionSchema } from "../validators/transaction.validator";


export async function createTransaction(req: Request, res: Response){
    const validatedData = createTransactionSchema.parse(req.body);

    const transaction = await Transaction.create({
        ...validatedData, user: req.user?._id
    });

    if(!transaction){
        throw new AppError("Transaction Not created", 401);
    };

    res.status(201).json({
        message: "Transaction Created",

        transaction,
    });
}

export async function getTransaction(req: Request, res: Response){
    const transactions = await Transaction.find({
        user: req.user?._id,
    }).sort({createdAt: -1,});

    if(!transactions){
        throw new AppError("Could not get Transactions", 401);
    }

    res.json({
        transactions,
        count: transactions.length,
    });
}

export async function updateTransaction(req: Request, res: Response){
    const validatedData = updateTransactionSchema.parse(req.body);
    
    const transaction = await Transaction.findOne({
        _id: req.params.id,

        user: req.user?._id,
    })

    if(!transaction){
        throw new AppError("Transaction Not Found", 404);
    }

    Object.assign(transaction, validatedData);

    await transaction.save();

    res.json({
        message: "Transaction Updated",

        transaction,
    })
}

export async function deleteTransaction(req: Request, res: Response){
    const transaction = await Transaction.findOne({
        _id: req.params.id, 
        user: req.user?._id
    });

    if(!transaction){
        throw new AppError("Transaction Not Found", 404);
    }

    await transaction.deleteOne();

    res.json({
        message: "Transaction deleted",
    })
};

export async function clearTransactions(req: Request, res: Response){
    const result = await Transaction.deleteMany({
        user: req.user?._id,
    });

    res.json({
        message: "All transactions deleted",

        deletedCount: result.deletedCount,
    })
}