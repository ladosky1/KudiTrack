import { Button, Group, Modal, Stack, TextInput} from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { useState, useEffect } from "react";

import type { Transaction } from "@/types/transaction.types";
import { getErrorMessage } from "@/services/api/getErrorMessage";

interface EditTransactionModalProps {
    opened: boolean;

    onClose: () => void;

    transaction: Transaction;

    onSave: (
        transaction: Transaction
    ) => Promise<void>;
}

export default function EditTransactionModal({
    opened, onClose, transaction, onSave, 
}: EditTransactionModalProps){

    const [title, setTitle] = useState(transaction.title);

    const [amount, setAmount] = useState(transaction.amount.toString());

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setTitle(transaction.title);

        setAmount(transaction.amount.toString());
    }, [transaction]);

    async function handleSave(){
        try {
            setIsLoading(true);
            const numericAmount = Number(amount);

            if(Number.isNaN(numericAmount) || numericAmount <= 0){
                return;
            };

            await onSave({
                ...transaction,
                title,
                amount: numericAmount,
            });

            onClose();

            notifications.show({
                title: "Transaction Updated",
                message: "Your transaction has been updated successfully.",
                color: "green",
            })
        } catch (error) {
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
        <Modal
            opened={opened}
            onClose={onClose}
            title="Edit Transaction"
            centered>
            <Stack>
                <TextInput
                    label="Title"
                    value={title}
                    onChange={(e) => 
                        setTitle(e.currentTarget.value)
                    }/>
                
                <TextInput
                    label="amount"
                    value={amount}
                    onChange={(e) => 
                        setAmount(e.currentTarget.value)
                    }/>

                <Group>
                    <Button
                        variant="light"
                        color="gray"
                        onClick={onClose}>
                        Cancel
                    </Button>

                    <Button
                        onClick={handleSave}
                        loading={isLoading}>
                        Save
                    </Button>
                </Group>
            </Stack>
        </Modal>
    )

}