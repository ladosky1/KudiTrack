import { apiClient } from "./client";

import type { 
    Transaction, 
    TransactionType } from "@/types/transaction.types";

export interface createTransactionPayload {
    title: string;

    amount: number;

    category: string;

    type: TransactionType;
}

interface TransactionResponse{
    transactions: Transaction[];

    count: number;
}

export async function getTransactions(){
    const response = await apiClient.get<TransactionResponse>(
        "/transactions"
    );

    return response.data;
}

export async function createTransaction(payload: createTransactionPayload){
    const response = await apiClient.post<{
        message: string;

        transaction: Transaction;
    }>("/transactions", payload);

    return response.data;
}

export async function updateTransactionRequest(
    id: string,
    payload: Partial<createTransactionPayload>
){
    const response = await apiClient.patch<{
        message: string;

        transaction: Transaction;
    }>(`/transactions/${id}`, payload);

    return response.data;
}

export async function deleteTransactionRequest(id: string){
    const response = await apiClient.delete<{
        message: string
    }>(`/transactions/${id}`);

    return response.data;
}

export async function clearTransactionsRequest(){
    const response = await apiClient.delete<{
        message: string
    }>("/transactions/clear-all")

    return response.data;
};