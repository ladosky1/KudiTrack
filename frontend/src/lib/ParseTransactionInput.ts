import type { 
    TransactionDraft,
    TransactionType } from "@/types/transaction.types";
import { detectCategory } from "@/lib/DetectCategory";

const incomekeyWords = [
    "salary",
    "income",
    "pay",
    "freelance",
];

function detectType( text: string ) : TransactionType {
    const lowerText = text.toLowerCase();

    const isIncome = incomekeyWords.some((keyword) => 
        lowerText.includes(keyword));

    return isIncome ? "income" : "expense";
}

function parseAmount(input: string): number | null {
    const normalizedInput = input.replace(/,/g, "");

    const amountMatch = normalizedInput.match(/(\d+(\.\d+)?)([km])?/i);

    if (!amountMatch) {
        return null;
    }

    const value = Number(amountMatch[1]);

    const suffix = amountMatch[3]?.toLowerCase();

    if (suffix === "k"){
        return Math.round(value * 1000);
    }

    if(suffix === "m"){
        return Math.round(value * 1_000_000);
    }

    return Math.round(value);
}

export function parseTransactionInput( input: string ) : TransactionDraft | null {
    const trimmedInput = input.trim();

    if(!trimmedInput){
        return null;
    }

    const amount = parseAmount(trimmedInput);

    if(!amount){
        return null;
    }

    const normalizedTitle = trimmedInput
        .replace(/(\d+(\.\d+)?)([km])?/i, "")
        .trim()
        .replace(/\s+/g, " ");

    if(!normalizedTitle){
        return null;
    }

    return {
        title: normalizedTitle,
        amount,
        type: detectType(normalizedTitle),
        category: detectCategory(normalizedTitle),
    }
}