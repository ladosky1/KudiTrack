import { 
    Stack, 
    Button, 
    Title, 
    Popover,
    Switch, 
    Text,
    Divider,
    ThemeIcon, 
    Group,
    Card } from "@mantine/core";

import { HiUser, HiTrash, HiArrowRightOnRectangle, HiMoon, HiSun } from "react-icons/hi2";
import { notifications } from "@mantine/notifications";
import PageContainer from "@/components/shared/PageContainer";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/features/auth/context/auth.context";
import { useTransactions } from "@/features/transactions/context/TransactionContext";


export default function SettingsPage(){

    const [confirmReset, setConfirmReset] = useState(false);
    const {colorScheme, toggleColorScheme} = useTheme();
    const {logout, user} = useAuth();
    const {clearTransactions} = useTransactions();

    function handleReset(){
        clearTransactions();

        notifications.show({
            title: "Data Reset",
            message: "Refresh app to restore default",
            color: "red",
        });
    }

    async function handleLogout(){
        try {
            await logout();
        } catch (error) {
            notifications.show({
                color: "red",
                message: "Logout Failed"
            })
        }
    };

    return(
        <PageContainer>
            <Stack>
                <Title order={2}>
                    Settings
                </Title>

                <Card
                    radius="xl"
                    shadow="sm"
                    padding="lg">
                    <Group mb="md">
                        <ThemeIcon
                            radius="xl"
                            size={42}
                            variant="light">
                            <HiUser size={18}/>
                        </ThemeIcon>

                        <div>
                            <Text fw={600}>
                                {user?.name}
                            </Text>

                            <Text size="sm" c="dimmed">
                                {user?.email}
                            </Text>
                        </div>
                    </Group>
                </Card>

                <Card
                    radius="xl"
                    shadow="sm"
                    padding="lg">
                    <Group justify="space-between">
                        <Group>
                            <ThemeIcon 
                                radius="xl" 
                                variant="light"
                                color={colorScheme === "dark"
                                    ? "yellow"
                                    : "blue"
                                }>
                                {colorScheme === "dark" ? (
                                    <HiMoon size={16}/>
                                ): (
                                    <HiSun size={16}/>
                                )}
                            </ThemeIcon>

                            <div>
                                <Text fw={500}>
                                    Appearance
                                </Text>

                                <Text size="sm" c="dimmed">
                                    {colorScheme === "dark"
                                        ? "Dark mode enabled"
                                        : "Light mode enabled"}
                                </Text>
                            </div>
                        </Group>

                        <Switch
                            checked={colorScheme === "dark"}
                            onChange={toggleColorScheme}
                            size="md"/>
                    </Group>
                </Card>

                <Card
                    radius="xl"
                    shadow="sm"
                    padding="lg">
                    <Stack>
                        <Group>
                            <ThemeIcon
                                color="red"
                                radius="xl"
                                variant="light">
                                <HiTrash size={16}/>
                            </ThemeIcon>

                            <div>
                                <Text fw={500}>
                                    Data Management
                                </Text>

                                <Text size="sm" c="dimmed">
                                    Permanently remove all transactions
                                </Text>
                            </div>
                        </Group>

                        <Divider/>

                        <Popover
                            opened={confirmReset}
                            onClose={() => setConfirmReset(false)}>
                            <Popover.Target>
                                <Button
                                    color="red"
                                    radius="xl"
                                    variant="light"
                                    onClick={() => setConfirmReset(true)}>
                                    Reset Transactions
                                </Button>
                            </Popover.Target>

                            <Popover.Dropdown>
                                <Text fw={500}>
                                    Delete all Transactions?
                                </Text>

                                <Text size="sm" c="dimmed" mb="md">
                                    This action cannot be undone
                                </Text>

                                <Group>
                                    <Button
                                        size="xs"
                                        variant="light"
                                        onClick={() => {
                                            setConfirmReset(false);
                                        }}>
                                        Cancel
                                    </Button>

                                    <Button
                                        size="xs"
                                        color="red"
                                        onClick={() => {
                                            handleReset();
                                            setConfirmReset(false);
                                        }}>
                                        Delete
                                    </Button>
                                </Group>
                            </Popover.Dropdown>
                        </Popover>
                    </Stack>
                </Card>

                <Card
                    radius="xl"
                    shadow="sm"
                    padding="lg">
                    <Group justify="space-between">
                        <Group>
                            <ThemeIcon
                                color="red"
                                radius="xl"
                                variant="light">
                                <HiArrowRightOnRectangle size={16}/>
                            </ThemeIcon>

                            <div>
                                <Text fw={500}>
                                    Account
                                </Text>

                                <Text size="sm" c="dimmed">
                                    Sign out of your account
                                </Text>
                            </div>
                        </Group>

                        <Button
                            color="red"
                            variant="subtle"
                            onClick={handleLogout}>
                            Logout
                        </Button>
                    </Group>
                </Card>
            </Stack>
        </PageContainer>
    )
   
}