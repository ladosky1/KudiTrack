import type { Transaction } from "@/types/transaction.types";

export function calculateCategoryTotals(transactions: Transaction[]){
    const totals: Record<string, number> = {};

    for(const transaction of transactions){
        if(transaction.type !== "expense"){
            continue;
        };

        const currentTotal = totals[transaction.category] || 0;

        totals[transaction.category] = currentTotal + transaction.amount;
    }

    return Object.entries(totals).map(([name, value]) => ({
        name,
        value,
    })).sort((a, b) => b.value - a.value)
}