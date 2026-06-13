import type { Transaction } from "@/types/transaction.types";

interface BalanceSummary {
    balance: number,
    income: number,
    expenses: number,
}

export function calculateBalance( transactions: Transaction[] ) : BalanceSummary {
    let income = 0;
    let expenses = 0;

    for( const transaction of transactions ){
        if( transaction.type === "income" ){
            income += transaction.amount;
        } else {
            expenses += transaction.amount;
        }
    }

    return {
        balance: income - expenses,
        income,
        expenses
    };
};