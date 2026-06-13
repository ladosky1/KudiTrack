import {z} from "zod";

export const createTransactionSchema = z.object({
    title: z.string().min(1),

    amount: z.number().positive(),

    type: z.enum(["income", "expense"]),

    category: z.string().min(1),
});

export const updateTransactionSchema = createTransactionSchema.partial();