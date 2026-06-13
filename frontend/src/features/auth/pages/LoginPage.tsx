import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { 
    Button,
    Paper,
    PasswordInput,
    Stack,
    Text,
    TextInput,
    Title } from "@mantine/core";

import { loginUser, getCurrentUser } from "@/services/api/auth.Service";

import { getErrorMessage } from "@/services/api/getErrorMessage";

import { notifications } from "@mantine/notifications";

import { useAuth } from "../context/auth.context";

export default function LoginPage(){
    const navigate = useNavigate();

    const {setUser} = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(e: React.SubmitEvent){
        e.preventDefault();
        try {
            setIsLoading(true);

            const data = await loginUser({ email, password });

            const currentUser = await getCurrentUser();

            setUser(currentUser.user || null);

            notifications.show({
                color: "green",
                message: data.message,
            })

            navigate("/");
        } catch (error) {
            notifications.show({
                color: "red",
                message: getErrorMessage(error),
            });
        } finally{
            setIsLoading(false);
        }
    }

    return(
        <Paper
            p="lg"
            radius="md"
            withBorder
            mt="xl">
            <Title order={2} mb="md">
                Welcome Back
            </Title>

            <Text size="sm" c="dimmed" mb="lg">
                Login to continue using KudiTrack.
            </Text>

            <form onSubmit={handleLogin}>
                <Stack>
                    <TextInput
                        label="Email"
                        placeholder="you@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required/>
                    
                    <PasswordInput
                        label="Password"
                        placeholder="******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required/>
                    
                    <Button
                        type="submit"
                        loading={isLoading}>
                        Login
                    </Button>
                </Stack>

                <Text size="sm" ta="center" mt="sm">
                    Don't have an account?{" "}
                    <Link to="/register">
                        Register
                    </Link>
                </Text>

                <Text size="sm" ta="center" mt="sm">
                    <Link to="/forgot-password">
                        Forgot Password?
                    </Link>
                </Text>
            </form>
        </Paper>
    )
}