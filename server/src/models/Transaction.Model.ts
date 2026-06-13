import mongoose, {Schema, Document} from "mongoose";

export interface ITransaction extends Document {
    title: string;

    amount: number;

    type: | "income" | "expense";

    category: string;

    user: mongoose.Types.ObjectId;

    createdAT: Date;

    updatedAt: Date;
}

const transactionSchema = new Schema<ITransaction>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        amount: {
            type: Number,
            requred: true,
        },
        type: {
            type: String,
            enum: [
                "income", "expense"
            ],
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },

    {
        timestamps: true,
    }
);

const Transaction = mongoose.model<ITransaction>(
    "Transaction",
    transactionSchema,
);

export default Transaction;
