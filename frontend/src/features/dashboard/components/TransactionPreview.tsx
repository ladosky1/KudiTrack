import { Badge, Button, Group, Stack, Text, Title } from "@mantine/core";

import type { TransactionDraft } from "@/types/transaction.types";

import { formatCurrency } from "@/lib/FormatCurrency";

interface TransactionPreviewProps{
    transaction: TransactionDraft;

    onConfirm: () => void;

    onCancel: () => void;

    isLoading: boolean;
}

export function TransactionPreview({ 
    transaction, onConfirm, onCancel, isLoading }: TransactionPreviewProps){
    
    const isIncome = transaction.type === "income";

    return(
            <Stack gap="md">
                <Title size="sm" c="dimmed" fw={500}>
                    Review Transaction
                </Title>
                <Group justify="space-between">
                    <Stack gap={2}>
                        <Text fw={700}>
                            {transaction.title}
                        </Text>

                        <Text
                            size="sm"
                            c="dimmed">
                            {formatCurrency(transaction.amount)}
                        </Text>
                    </Stack>

                    <Badge
                        color={
                            isIncome 
                                ? "green"
                                : "red"
                        }
                        variant="light">
                        {isIncome ? "income" : "expense"}
                    </Badge>
                </Group>

                <Stack>
                    <Button
                        fullWidth
                        radius="xl"
                        loading={isLoading}
                        onClick={onConfirm}>
                        save
                    </Button>

                    <Button
                        fullWidth
                        variant="light"
                        color="gray"
                        radius="xl"
                        disabled={isLoading}
                        onClick={onCancel}>
                        cancel
                    </Button>
                </Stack>
            </Stack>
    )
}