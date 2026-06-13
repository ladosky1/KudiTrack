import type { 
    Transaction,
    TransactionType } from "@/types/transaction.types";

export function filterTransactions(
    transactions: Transaction[],
    search: string,
    filter: | "all" | TransactionType
){

    const trimmedSearch = search.trim().toLowerCase();

    return transactions.filter((transaction) => {
        const matchesSearch = trimmedSearch === ""
            ? true
            : transaction.title.toLowerCase().includes(trimmedSearch);

        const matchesFilter = filter === "all" 
            ? true
            : transaction.type === filter;

        return (matchesSearch && matchesFilter);
    })
}