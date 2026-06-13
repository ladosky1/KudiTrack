import type { TransactionCategory } from "@/types/transaction.types";

export const categoryColors: Record<TransactionCategory, string> = {
    Food: "#f59f00",
    Transport: "#228be6",
    Shopping: "#ae3ec9",
    Bills: "#fa5252",
    Health: "#40c057",
    Entertainment: "#fd7e14",
    Education: "#15aabf",
    Appliances: "#9fbede",
    Income: "#12b886",
    Other: "#868e96"
}