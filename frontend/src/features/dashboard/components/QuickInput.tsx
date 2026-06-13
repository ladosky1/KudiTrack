import { useState } from 'react';
import { parseTransactionInput } from '@/lib/ParseTransactionInput';
import { ActionIcon, Card, Group, TextInput, Modal } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { HiArrowUp } from 'react-icons/hi';
import type { TransactionDraft } from '@/types/transaction.types';
import { TransactionPreview } from './TransactionPreview';
import { formatCurrency } from '@/lib/FormatCurrency';

interface QuickInputProps {
    onAddTransaction: (transaction: TransactionDraft) => Promise<void>;
}

export default function QuickInput({ onAddTransaction }: QuickInputProps){

    const [input, setInput] = useState("");
    const [
        previewTransaction, 
        setPreviewTransaction] = useState<TransactionDraft | null>(null);

    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(){
        const trimmed = input.trim();

        if(!trimmed) return

        const parsed = parseTransactionInput(trimmed);

        if(!parsed){
            notifications.show({
                title: "Invalid input",
                message: "Enter something like 'rice 2500' or 'salary 5k'",
                color: "red",
            });

            return;
        }

        setPreviewTransaction(parsed);
    }

    async function handleConfirm(){
        if(!previewTransaction){
            return;
        }

        try {
            setIsLoading(true);

            await onAddTransaction(previewTransaction)

            notifications.show({
                title: "Transaction parsed",
                message: `${previewTransaction.title} • ${previewTransaction.category} • ${formatCurrency(previewTransaction.amount)}`,
                color: "green",
            });

            setPreviewTransaction(null);

            setInput("");
        } catch{
            notifications.show({
                title: "Error",
                message: "could not save transaction",
                color: "red",
            });
        } finally{
            setIsLoading(false);
        }
    }

    function handleCancel(){
        setPreviewTransaction(null);
    }
    return(
        <>
        <Card
            radius="xl"
            padding="md"
            shadow='sm'>
                <Group>
                    <TextInput
                        placeholder='e.g rice 2500 or rice 2.5k or rice 2.5m'
                        flex={1}
                        radius="xl"
                        maxLength={50}
                        value={input}
                        onChange={(e) => setInput(e.currentTarget.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter"){
                                handleSubmit();
                            }
                        }}
                    />

                    <ActionIcon
                        size={48}
                        radius="xl"
                        variant='filled'
                        onClick={handleSubmit}
                        disabled={!input.trim()}
                        loading={isLoading}>
                        <HiArrowUp size={18} />
                    </ActionIcon>
                </Group>
        </Card>
        <Modal
            opened={!!previewTransaction}
            onClose={handleCancel}
            centered
            radius="xl">
            {previewTransaction && (
                <TransactionPreview
                    transaction={previewTransaction}
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}/>
            )}
        </Modal>
        </>
    )
}