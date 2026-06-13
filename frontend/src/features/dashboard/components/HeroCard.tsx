import { Card, Group, Stack, Text, ThemeIcon } from '@mantine/core';
import { motion } from 'framer-motion';
import { 
    HiOutlineWallet,
    HiArrowTrendingUp,
    HiArrowTrendingDown } from 'react-icons/hi2';
import { formatCurrency } from '@/lib/FormatCurrency';

interface HeroCardProps {
    balance: number;
    income: number;
    expenses: number;
}

export default function HeroCard({ balance, income, expenses,}: HeroCardProps){
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
                            {formatCurrency(balance)}
                        </Text>

                        <Text size='sm' c="dimmed">
                            Financial Overview for today
                        </Text>
                    </Stack>
                    
                    <ThemeIcon
                        size={56}
                        radius='xl'
                        color='blue'
                        variant='light'>
                        <HiOutlineWallet size={28} />
                    </ThemeIcon>
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
                            {formatCurrency(income)}
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
                            {formatCurrency(expenses)}
                        </Text>
                    </Card>
                </Group>
            </Stack>
        </Card>
    )
}