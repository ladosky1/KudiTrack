import { Card, Group, Stack, Text, ThemeIcon, ActionIcon } from '@mantine/core';
import { motion } from 'framer-motion';
import { 
    HiOutlineWallet,
    HiArrowTrendingUp,
    HiArrowTrendingDown,
    HiEye,
    HiEyeSlash, } from 'react-icons/hi2';
import { formatCurrency } from '@/lib/FormatCurrency';

interface HeroCardProps {
    balance: number;
    income: number;
    expenses: number;
    isBalanceVisible: boolean;
    onToggleBalance: () => void;
}

export default function HeroCard({ 
    balance, income, expenses, isBalanceVisible, onToggleBalance
}: HeroCardProps){

    const hiddenValue = "*******"

    return (
        <Card
            component={motion.div}
            initial={{ opacity: 0, y: 15}}
            animate={{ opacity: 1, y: 0}}
            transition={{ duration: 0.3 }}
            radius="xl"
            padding="lg"
            shadow='sm'>
            <Stack gap="lg">
                <Group justify='space-between'>
                    <Stack gap={2}>
                        <Text size='sm' c="dimmed">
                            Current Balance
                        </Text>

                        <Text fw={800} size='2rem' lh={1}>
                            {isBalanceVisible
                                ? formatCurrency(balance)
                                : hiddenValue}
                        </Text>

                        <Text size='sm' c="dimmed">
                            Financial Overview for today
                        </Text>
                    </Stack>

                    <Group gap="xs">
                        <ActionIcon
                            onClick={onToggleBalance}
                            variant='subtle'
                            color='gray'
                            size='lg'
                            radius='xl'
                            aria-label={
                                isBalanceVisible
                                    ? "Hide Balance"
                                    : "Show Balance"
                            }>
                            {isBalanceVisible 
                                ? <HiEyeSlash size={20}/> 
                                : <HiEye size={20}/>}
                        </ActionIcon>

                        <ThemeIcon
                            size={56}
                            radius='xl'
                            color='blue'
                            variant='light'>
                            <HiOutlineWallet size={28} />
                        </ThemeIcon>
                    </Group>
                </Group>

                <Group grow>
                    <Card
                        radius="lg"
                        padding="sm"
                        bg="green.0"
                        withBorder>
                        <Group gap="xs" mb={4}>
                            <ThemeIcon
                                size={28}
                                radius="xl"
                                color='green'
                                variant='light'>
                                <HiArrowTrendingUp size={16}/>
                            </ThemeIcon>

                            <Text size='sm' c="dimmed">
                                Income
                            </Text>
                        </Group>

                        <Text fw={700} c='green'>
                            {isBalanceVisible
                                ? formatCurrency(income)
                                : hiddenValue}
                        </Text>
                    </Card>

                    <Card
                        radius="lg"
                        padding="sm"
                        bg="red.0"
                        withBorder>
                        <Group gap="xs" mb={4}>
                            <ThemeIcon
                                size={28}
                                radius="xl"
                                color='red'
                                variant='light'>
                                <HiArrowTrendingDown size={16}/>
                            </ThemeIcon>

                            <Text size='sm' c="dimmed">
                                Expenses
                            </Text>
                        </Group>

                        <Text fw={700} c='red'>
                            {isBalanceVisible
                                ? formatCurrency(expenses)
                                : hiddenValue}
                        </Text>
                    </Card>
                </Group>
            </Stack>
        </Card>
    )
}