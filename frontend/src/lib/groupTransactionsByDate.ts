import { format } from 'date-fns';

import type { Transaction } from '@/types/transaction.types';

interface GroupedTransactions {
    date: string;
    transactions: Transaction[];
}

export function groupTransactionsByDate(
    transactions: Transaction[]
) : GroupedTransactions[] {

    const groupedMap = new Map<string, Transaction[]>();

    for (const transaction of transactions) {
        const formattedDate = format(new Date(transaction.createdAt), 'MMMM d, yyyy');

        const existingGroup = groupedMap.get(formattedDate);

        if(existingGroup){
            existingGroup.push(transaction);
        } else {
            groupedMap.set(formattedDate, [transaction]);
        }
    }

    return Array.from(groupedMap.entries()).map(([date, transactions]) => ({
        date,
        transactions
    }));
}