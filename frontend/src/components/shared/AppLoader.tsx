import {Center, Loader, Stack, Text, Title} from "@mantine/core";

export default function AppLoader(){
    return(
        <Center h="100vh">
            <Stack align="center" gap="xs">
                <Title order={1} fw={800}>
                    KudiTrack
                </Title>

                <Text c="dimmed" size="sm">
                    Track every naira with confidence.
                </Text>

                <Loader size="md" mt="sm"/>
            </Stack>
        </Center>
    )
}