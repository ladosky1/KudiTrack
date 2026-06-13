import {Card, Center, Stack, Title, Text, ThemeIcon, Group} from "@mantine/core";

import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer,} from "recharts";
import { formatCurrency } from "@/lib/FormatCurrency";

interface ExpenseChartProps {
    data: {
        name: string;
        value: number;
        color: string;
    }[];
}

export default function ExpenseChart({ data }: ExpenseChartProps){

    const hasData = data.length > 0;
    
    return(
        <Card
            radius="xl"
            padding="lg"
            shadow="sm">
            <Stack>
                <Title order={4}>
                    Expense Overview
                </Title>

                {!hasData ? (
                    <Center h={250}>
                        <Stack
                            gap={4}
                            align="center">
                            <Text fw={600}>
                                No expense data.
                            </Text>

                            <Text size="sm" c="dimmed">
                                Add transactions to visualize your expenses.
                            </Text>
                        </Stack>
                    </Center>
                ): (
                    <Stack>
                    <div
                        style={{
                            width:"100%",
                            height:250,
                        }}>
                        <ResponsiveContainer
                            width="100%"
                            height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={100}
                                    innerRadius={70}
                                    paddingAngle={4}
                                    strokeWidth={2}
                                >
                                    {data.map((entry) => (
                                        <Cell
                                            key={entry.name}
                                            fill={entry.color}/>
                                    ))}
                                </Pie>
                                <Tooltip/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                        <Stack gap="xs" mt="md">
                            {data.map((item) => (
                                <Group key={item.name} justify="space-between">
                                    <Group gap="xs">
                                    <ThemeIcon
                                        size={12}
                                        radius="xl"
                                        color={item.color}
                                        variant="filled"/>
                                    
                                    <Text size="sm" fw={600}>
                                        {item.name}
                                    </Text>
                                    </Group>

                                    <Text size="sm" fw={600}>
                                        {formatCurrency(item.value)}
                                    </Text>
                                </Group>
                            ))}
                        </Stack>
                    </Stack>
                )} 
            </Stack>
        </Card>
    )
}