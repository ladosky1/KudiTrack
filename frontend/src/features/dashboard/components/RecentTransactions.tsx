import { Stack, Text, Title, Group, Button, Card } from "@mantine/core";
import TransactionCard from "@/features/transactions/components/TransactionCard";
import type { Transaction } from "@/types/transaction.types";
import { useNavigate } from "react-router-dom";

interface RecentTransactionsProps {
    transactions: Transaction[];
}

export default function RecentTransactions({ transactions, } : RecentTransactionsProps) {
    const navigate = useNavigate();

    return (
        <Stack gap="sm">
            <Group justify="space-between">
                <Title order={4}>
                    Recent Transactions
                </Title>

                <Button
                    variant="subtle"
                    size="xs"
                    onClick={() => navigate("/transactions")}>
                    View All
                </Button>
            </Group>

            {transactions.length === 0 ? (
                <Card
                    radius="xl"
                    padding="lg"
                    withBorder>
                    <Text
                        ta="center"
                        c="dimmed">
                        No Transactions yet.
                    </Text>
                </Card>
            ): (
                transactions.map((transaction) => (
                    <TransactionCard 
                        key={transaction._id} 
                        transaction={transaction} />
                ))
            )}
        </Stack>
    )
}