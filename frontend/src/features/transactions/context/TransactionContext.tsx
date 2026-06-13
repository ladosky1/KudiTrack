import { createContext, useContext, useState, useEffect } from "react";
import type { Transaction } from "@/types/transaction.types";
import { 
    getTransactions,
    createTransaction,
    updateTransactionRequest,
    deleteTransactionRequest,
    clearTransactionsRequest } from "@/services/api/transaction.service";
import { getErrorMessage } from "@/services/api/getErrorMessage";
import { notifications } from "@mantine/notifications";
import { useAuth } from "@/features/auth/context/auth.context";

interface TransactionContextValue {
    transactions: Transaction[];

    isLoading: boolean;

    setTransactions:  
        React.Dispatch<
            React.SetStateAction<
                Transaction[]
            >
        >
    addTransaction: (
        transaction: {
            title: string,

            amount: number,

            category: string,

            type: | "income" | "expense"
        }
    ) => Promise<void>;

    deleteTransaction: (_id: string) => Promise<void>;

    updateTransaction: (transaction: Transaction) => Promise<void>;

    clearTransactions: () => Promise<void>;
}

const TransactionContext = 
    createContext<TransactionContextValue | undefined>(undefined);

export function TransactionProvider({ 
    children 
} : {children: React.ReactNode;}){
    
    const [transactions, setTransactions] = useState<Transaction[]>([]); 

    const [isLoading, setIsLoading] = useState(true);

    const { user } = useAuth();

    useEffect(() => {
        if(!user){
            setTransactions([]);
            return;
        }
        async function loadTransactions(){
            try {
                setIsLoading(true);
                const data = await getTransactions();

                setTransactions(data.transactions);
            } catch(error) {
                notifications.show({
                    color: "red",
                    message: getErrorMessage(error),
                })
                setTransactions([]);
            } finally {
                setIsLoading(false);
            }
        }

        loadTransactions();
    }, [user]);

    async function addTransaction(
        transactionData: {
            title: string;

            amount: number;

            category: string;

            type: | "income" | "expense";
        }
    ){
        const data = await createTransaction(transactionData);

        setTransactions(
            (prev) => [data.transaction, ...prev]
        )
    };

    async function deleteTransaction(id: string){
        await deleteTransactionRequest(id);

        setTransactions(
            (prev) => prev.filter((transaction) =>
                transaction._id !== id)
        )
    }

    async function updateTransaction(
        updatedTransaction: Transaction
    ){
        const data = await updateTransactionRequest(
            updatedTransaction._id,
            updatedTransaction
        );

        setTransactions(
            (prev) =>
                prev.map((transaction) => 
                    transaction._id === updatedTransaction._id
                                            ? data.transaction
                                            : transaction
            )
        );
    }

    async function clearTransactions() {
        await clearTransactionsRequest();

        setTransactions([]);
    }

    return (
        <TransactionContext.Provider
            value={{
                transactions,

                isLoading,

                setTransactions,

                addTransaction,

                deleteTransaction,

                updateTransaction,

                clearTransactions,
            }}>
            {children}
        </TransactionContext.Provider>
    )
}

export function useTransactions(){
    const context = useContext(TransactionContext);

    if(!context) {
        throw new Error("useTransactions must be used within a TransactionProvider");
    }

    return context;
}