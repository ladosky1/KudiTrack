import type { TransactionCategory } from "@/types/transaction.types";

const categoryMap: Record<TransactionCategory, string[]> = {
    Food: [
        "food",
        "rice",
        "groceries",
        "restaurant",
        "pizza",
        "burger",
        "beans",
        "garri",
        "yam",
        "snacks",
        "egg",
        "burger",
        "restaurant",
        "chicken",
        "meat",
        "fish",
        "suya",
        "pizza",
        "bread",
        "groundnut",
        "eba",
    ],
    Bills: [
        "airtime",
        "data",
        "electricity",
        "wifi",
        "subscription",
        "netflix",
        "rent",
        "fuel",
    ],
    Transport: [
        "uber",
        "taxi",
        "bus",
        "transport",
        "car",
        "bike",
    ],
    Income: [
        "salary",
        "pay",
        "freelance",
        "hustle",
    ],
    Entertainment: [
        "movies",
        "game",
        "cinema",
        "pubg",
        "cod",
    ],
    Health: [
        "medicine",
        "drug",
        "clinic",
        "hospital",
    ],
    Education:[
        "book",
        "courses",
        "school",
        "fees",
        "handout",
    ],
    Shopping: [
        "bags",
        "clothes",
        "shirt",
        "short",
        "trouser",
        "underwear",
        "shoes",
        "shopping",
        "generator",
        "fan",
    ],
    Appliances: [
        "fan",
        "generator",
        "bed",
        "iron",
        "bulb",
        "extensions",
        "socket"
    ],
    Gadgets: [
        "phone",
        "laptop",
        "charger",
        "earpiece",
        "earbuds",
        "headphone",
        "powerbank",
        "pouch",
        "screenguards",
        "camera",
        "keyboard",
        "mouse",
        "watch",
        "console",
        "ps4",
        "ps5",
        "xbox"
    ],
    Other: [],
}

export function detectCategory(input: string) : TransactionCategory {
    const lowerInput = input.toLowerCase();

    for (const category in categoryMap) {
        const keywords = categoryMap[
            category as TransactionCategory
        ];

        const matched = keywords.some((keyword) => 
            lowerInput.includes(keyword)
        );

        if(matched){
            return category as TransactionCategory;
        }
    }

    return "Other";
}