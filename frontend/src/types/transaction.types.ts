export type TransactionType = | "income" | "expense";

export type TransactionCategory = 
    | "Food"
    | "Transport"
    | "Income"
    | "Shopping"
    | "Bills"
    | "Health"
    | "Entertainment"
    | "Education"
    | "Appliances"
    | "Gadgets"
    | "Other";

export interface Transaction {
    _id: string;

    title: string;

    amount: number;

    category: TransactionCategory;

    type: TransactionType;

    createdAt: string;

    updatedAt: string;
}

export interface TransactionDraft {
    title: string;

    amount: number;

    category: TransactionCategory;

    type: TransactionType;
}