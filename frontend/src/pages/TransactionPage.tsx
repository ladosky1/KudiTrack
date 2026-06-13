import { useState, useMemo } from "react"
import { Stack, TextInput, Title, SegmentedControl } from "@mantine/core";
import PageContainer from "@/components/shared/PageContainer";
import TransactionCard from "@/features/transactions/components/TransactionCard";
import { useTransactions } from "@/features/transactions/context/TransactionContext";

import { filterTransactions } from "@/lib/FilterTransaction";
import { groupTransactionsByDate } from "@/lib/groupTransactionsByDate";

type TransactionFilter = | "all" | "income" | "expense";

export default function TransactionsPage(){
    const { transactions } = useTransactions();
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<TransactionFilter>("all");

    const filteredTransactions = useMemo(
        () => 
            filterTransactions(
                transactions, 
                search,
                filter), [transactions, search, filter]);

    const groupedTransactions = useMemo(
        () => 
            groupTransactionsByDate(filteredTransactions), [filteredTransactions]);

    return(
        <PageContainer>
            <Title order={2}>
                Transactions
            </Title>

            <TextInput
                placeholder="Search Transaction..."
                value={search}
                onChange={(e) => 
                    setSearch(e.currentTarget.value)
                }
                radius="xl"/>
            
            <SegmentedControl
                value={filter}
                onChange={(value) => setFilter(value as TransactionFilter)}
                data={[
                    { label: "All", value: "all" },
                    { label: "Income", value: "income" },
                    { label: "Expense", value: "expense" }
                ]}
            />

            <Stack>
                {groupedTransactions.length === 0 ? (
                    <Title
                        order={5}
                        c="dimmed"
                        ta="center">
                        No transactions found
                    </Title>
                ) : (
                    groupedTransactions.map((group) => (
                        <Stack key={group.date}>
                            <Title order={5}>
                                {group.date}
                            </Title>

                            {group.transactions.map((transaction) => (
                                <TransactionCard 
                                    key={transaction._id} 
                                    transaction={transaction} />
                            ))}
                        </Stack>
                    ))
                )}
            </Stack>
        </PageContainer>
    )
}