import type { Transaction } from "@/types/transaction.types";
import { formatCurrency } from "./FormatCurrency";

export function generateInsight(transactions: Transaction[]){
    if(transactions.length === 0){
        return "Start tracking your expenses to unclock insights.";
    };

    const expenses = transactions.filter(
        (transaction) => transaction.type === "expense"
    );

    const income = transactions.filter(
        (transaction) => transaction.type === "income"
    );

    if(expenses.length === 0){
        return "No expenses recorded yet. Add some transactions to see insights.";
    }

    const totalExpense = expenses.reduce(
        (sum, transaction) => sum + transaction.amount, 0
    );

    const totalIncome = income.reduce(
        (sum, transaction) => sum + transaction.amount, 0
    );

    const categoryTotals: Record<string, number> = {};

    expenses.forEach(
        (transaction) => {
            categoryTotals[transaction.category] = 
                (categoryTotals[transaction.category] || 0) + transaction.amount;
        }
    );

    const topCategory = Object.entries(categoryTotals).sort(
        (a, b) => b[1] - a[1]
    )[0];

    const topCategoryName = topCategory?.[0] ?? "other";

    const topCategoryAmount = topCategory?.[1] ?? 0;

    if(totalIncome === 0){
        return `Most of your spending is in ${topCategoryName}. 
                Total spent: ${formatCurrency(totalExpense)}`;
    }

    if(totalExpense > totalIncome){
        return `You have spent more than you have earned. 
                Your biggest expense category: ${topCategoryName}.`;
    };
    
    const savings = totalIncome - totalExpense;

    if(savings > totalIncome * 0.3){
        return `Strong financial position. You retained over 30% of your income after expenses.`;
    };

    return `Your highest spending category is ${topCategoryName} with ${formatCurrency(topCategoryAmount)}`;
}