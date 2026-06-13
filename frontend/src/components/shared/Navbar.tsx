import { Group, Text, UnstyledButton, Stack } from "@mantine/core";
import { HiHome, HiOutlineCog6Tooth, } from "react-icons/hi2";
import { HiOutlineReceiptTax } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const navItems = [
    {
        label: "Home",
        path: "/",
        icon: HiHome,
    },
    {
        label: "Transactions",
        path: "/transactions",
        icon: HiOutlineReceiptTax,
    },
    {
        label: "Settings",
        path: "/settings",
        icon: HiOutlineCog6Tooth,
    },
];

export default function Navbar(){
    return (
        <Group justify="space-around" px="md" h="100%">
            
            {navItems.map((item) => {
                const Icon = item.icon

                return(
                    <NavLink
                        key={item.path}
                        to={item.path}
                        style={{
                            textDecoration: "none",
                            color: "inherit"
                        }}>
                        {({ isActive}) => (
                            <UnstyledButton
                                style={{
                                    transition: "all 0.2s ease",
                                }}>
                                <Stack
                                    gap={4}
                                    align="center">
                                    <Icon 
                                        size={22}
                                        style={{
                                            transition: "color 0.2s ease"
                                        }}
                                        color={
                                            isActive 
                                            ? "#228be6"
                                            : "#868e96"
                                        }/>
                                    <Text
                                        size="xs"
                                        style={{
                                            transition: "all 0.2s ease",
                                        }}
                                        c={
                                            isActive
                                            ? "blue"
                                            : "dimmed"
                                        }
                                        fw={
                                            isActive
                                            ? 700
                                            : 500
                                        }>
                                        {item.label}
                                    </Text>
                                </Stack>
                            </UnstyledButton>
                        )}
                    </NavLink>
                );
            })}
        </Group>
    )
}