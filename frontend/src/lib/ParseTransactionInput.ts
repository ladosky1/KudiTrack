import type { 
    TransactionDraft,
    TransactionType } from "@/types/transaction.types";
import { detectCategory } from "@/lib/DetectCategory";

const incomekeyWords = [
    "salary",
    "income",
    "pay",
    "freelance",
    "gift",
    "bonus",
    "refund",
    "dividend",
    "allowance",
    "received"
];

function detectType(text: string): TransactionType {
    const lowerText = text.toLowerCase();
    
    const isIncome = incomekeyWords.some((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, "i");
        return regex.test(lowerText);
    });
    
    return isIncome ? "income" : "expense";
}

const AMOUNT_REGEX = /(\d+(?:\.\d+)?)([km])?\b/i;

function parseAmount(input: string): number | null {

    const normalizedInput = input.replace(/,/g, "");
    
    const words = normalizedInput.split(/\s+/);

    for (let i = words.length - 1; i >= 0; i--) {

        const match = words[i].match(AMOUNT_REGEX);

        if (match) {
            const value = Number(match[1]);

            const suffix = match[2]?.toLowerCase();
            
            if (suffix === "k") return Math.round(value * 1000);

            if (suffix === "m") return Math.round(value * 1_000_000);

            return Math.round(value);
        }
    }

    return null;
}

export function parseTransactionInput(input: string): TransactionDraft | null {
    const trimmedInput = input.trim();

    if (!trimmedInput) return null;

    const amount = parseAmount(trimmedInput);
    
    if (amount === null) return null;

    
    const words = trimmedInput.split(/\s+/);

    let amountToken = "";
    
    for (let i = words.length - 1; i >= 0; i--) {
        if (words[i].replace(/,/g, "").match(AMOUNT_REGEX)) {
            amountToken = words[i];

            break;
        }
    }

    const normalizedTitle = trimmedInput
        .replace(amountToken, "")
        .trim()
        .replace(/\s+/g, " ");

    if (!normalizedTitle) return null;

    return {
        title: normalizedTitle,
        amount,
        type: detectType(normalizedTitle),
        category: detectCategory(normalizedTitle),
    };
}