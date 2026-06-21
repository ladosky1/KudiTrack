import { useMemo, useEffect, useState } from "react";
import { Title, Stack, Text, Skeleton } from "@mantine/core";
import PageContainer from "@/components/shared/PageContainer";

import HeroCard from "@/features/dashboard/components/HeroCard";
import QuickInput from "@/features/dashboard/components/QuickInput";
import ExpenseChart from "@/features/dashboard/components/ExpenseChart";
import InsightCard from "@/features/dashboard/components/InsightCard";
import RecentTransactions from "@/features/dashboard/components/RecentTransactions";

import { generateInsight } from "@/lib/generateInsight";
import { calculateBalance } from "@/lib/CalculateBalance";
import { calculateCategoryTotals } from "@/lib/calculateCategoryTotals";
import { useTransactions } from "@/features/transactions/context/TransactionContext";
import { useAuth } from "@/features/auth/context/auth.context";
import { categoryColors } from "@/lib/categoryColor";

export default function DashboardPage(){

    const { transactions, addTransaction, isLoading } = useTransactions();
    const { user } = useAuth();
    const [isBalanceVisible, setIsBalanceVisible] = useState<boolean>(() =>{
        return JSON.parse(localStorage.getItem("balance_visible") ?? "true")
    });

    useEffect(() => {
        localStorage.setItem(
            "balance_visible", 
            String(isBalanceVisible)
        );
    }, [isBalanceVisible]);

    function toggleBalanceVisibility() {
        setIsBalanceVisible((prev) => !prev);
    }

    const summary = useMemo(
        () => 
            calculateBalance(transactions), [transactions]);

    const recentTransactions = useMemo(
        () => 
            transactions.slice(0, 5), [transactions]);
        
    const categoryTotals = useMemo(
        () => 
            calculateCategoryTotals(transactions), [transactions]);

    const insight = useMemo(
        () => 
            generateInsight(transactions), [transactions]);
    
    function getGreeting(){
        const hour = new Date().getHours();

        if(hour < 12) return "Good Morning";
        if(hour < 17) return "Good Afternoon";

        return "Good Evening";
    };

    function formatName(name?: string){
        if(!name) return "User";

        return name.charAt(0).toUpperCase() + name.slice(1);
    }


    const chartData = categoryTotals.map((category) => ({
        name: category.name,

        value: category.value,

        color: categoryColors[category.name] || categoryColors.Other,
    }));
    
    return (
        <PageContainer>
            <Stack gap={2}>
                <Text size="sm" c="dimmed" fw={500}>
                    {getGreeting()}
                </Text>

                <Title
                    order={1}
                    fw={900}
                    style={{lineHeight: 1.1,}}>
                    {formatName(user?.name)}
                </Title>

                <Text c="dimmed" size="sm">
                    Track your spending and stay in control.
                </Text>
            </Stack>

            {isLoading ? (
                <Skeleton
                    height={180}
                    radius="xl"/>
            ): (
                <HeroCard
                    balance={summary.balance}
                    income={summary.income}
                    expenses={summary.expenses}
                    isBalanceVisible={isBalanceVisible}
                    onToggleBalance={toggleBalanceVisibility} />
            )}

            <QuickInput 
                onAddTransaction={addTransaction} />

            {isLoading ? (
                <Skeleton
                    height={320}
                    radius="xl"/>
            ) : (
                <ExpenseChart data={chartData} />
            )}
            
            <InsightCard insight={insight} />

            {isLoading ? (
                <Stack>
                    <Skeleton height={80} radius="xl"/>
                    <Skeleton height={80} radius="xl"/>
                    <Skeleton height={80} radius="xl"/>
                </Stack>
            ): (
                <RecentTransactions transactions={recentTransactions}/>
            )}                      
        </PageContainer>
    )
}