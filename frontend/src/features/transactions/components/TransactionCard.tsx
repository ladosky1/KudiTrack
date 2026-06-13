import { useState, memo } from "react";
import { Card, Group, Stack, Text, ThemeIcon, Popover, ActionIcon, Button } from "@mantine/core";
import { HiArrowDown, HiArrowUp } from "react-icons/hi";
import { HiPencil, HiTrash } from "react-icons/hi2";

import { useTransactions } from "../context/TransactionContext";
import { getErrorMessage } from "@/services/api/getErrorMessage";
import type {  Transaction } from "@/types/transaction.types";

import EditTransactionModal from "./EditTransactionModal";

import { formatCurrency } from "@/lib/FormatCurrency";
import { notifications } from "@mantine/notifications";

interface TransactionProps {
    transaction: Transaction;
}

function TransactionCard({ transaction, } : TransactionProps) {

    const {deleteTransaction, updateTransaction} = useTransactions();

    const [openEdit, setOpenEdit] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const isIncome = transaction.type === "income";

    async function handleDelete(){
        try {
            setIsLoading(true);
            await deleteTransaction(transaction._id);
            
            notifications.show({
                title: "Transaction Deleted",
                message: "Your transaction has been deleted successfully.",
                color: "green",
            });
        } catch(error) {
            notifications.show({
                title: "Error",
                message: getErrorMessage(error),
                color: "red",
            });
        } finally {
            setIsLoading(false);
        }     
    }

    return(
        <>
        <Card
            radius="xl"
            padding="md"
            shadow="sm">
            <Group justify="space-between">
                <Group>
                    <ThemeIcon
                        color={
                            isIncome ? "green" : "red"
                        }
                        variant="light"
                        radius="xl"
                        size={45}>
                        {isIncome ? (
                            <HiArrowDown size={20}/>
                        ) : (
                            <HiArrowUp size={20}/>
                        )}
                    </ThemeIcon>

                    <Stack gap={0}>
                        <Text fw={600}>
                            {transaction.title}
                        </Text>

                        <Text
                            size="sm"
                            c="dimmed">
                            {transaction.type}
                        </Text>
                    </Stack>
                </Group>
                
                <Stack
                    gap={4}
                    align="flex-end">
                    <Text
                        fw={700}
                        c={
                            isIncome ? "green" : "red"
                        }>
                        {isIncome ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                    </Text>

                    <Group gap={4}>
                        <ActionIcon
                            variant="light"
                            color="blue"
                            onClick={() => 
                                setOpenEdit(true)
                            }>
                            <HiPencil size={14}/>
                        </ActionIcon>
                        
                        <Popover
                            opened={openConfirm}
                            onClose={() => setOpenConfirm(false)}
                            position="top-end"
                            withArrow
                            shadow="md">
                            <Popover.Target>
                                <ActionIcon
                                    variant="light"
                                    color="red"
                                    onClick={() => setOpenConfirm(true)}>
                                    <HiTrash size={14}/>
                                </ActionIcon>
                            </Popover.Target>
                            <Popover.Dropdown>
                                <Text size="sm" fw={500} mb={6}>
                                    Delete Transaction
                                </Text>
                                <Text size="xs" c="dimmed" mb="sm">
                                    This can't be undone
                                </Text>

                                <Group gap={6} justify="flex-end">
                                    <Button
                                        size="xs"
                                        variant="light"
                                        onClick={() => setOpenConfirm(false)}>
                                        Cancel
                                    </Button>

                                    <Button
                                        size="xs"
                                        color="red"
                                        onClick={() => {
                                            handleDelete();
                                            setOpenConfirm(false)}}
                                        loading={isLoading}>
                                        Delete
                                    </Button>
                                </Group>
                            </Popover.Dropdown>
                        </Popover>
                    </Group>
                </Stack>
            </Group>
        </Card>

            <EditTransactionModal
                opened={openEdit}
                onClose={() =>
                    setOpenEdit(false)
                }
                transaction={transaction}
                onSave={updateTransaction}/>
        </>
    )
}

export default memo(TransactionCard);