import { Card, Stack, Text, Title } from "@mantine/core";

interface InsightCardProps {
    insight: string;
}

export default function InsightCard({ insight } 
    : InsightCardProps
){
    return (
        <Card
            radius="xl"
            padding="lg"
            shadow="sm">
            <Stack gap={6}>
                <Title order={5}>
                    KudiTrack Insight
                </Title>

                <Text size="sm" c="dimmed">
                    {insight}
                </Text>
            </Stack>
        </Card>
    )
}