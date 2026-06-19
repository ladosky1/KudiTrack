import React, { useState, } from "react"; 

import { 
    Button,
    Paper,
    PasswordInput,
    Stack,
    Text,
    TextInput,
    Title } from "@mantine/core";

import { notifications } from "@mantine/notifications";

import { registerUser } from "@/services/api/auth.Service";

import { getErrorMessage } from "@/services/api/getErrorMessage";

import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage(){
    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: React.SubmitEvent){
        e.preventDefault();

        try {
            setIsLoading(true);

            const data = await registerUser({
                name, email, password
            });

            notifications.show({
                color: "green",
                message: data.message,
            });

            navigate(`/verify-email?email=${encodeURIComponent(email)}`);
        } catch (error) {
            notifications.show({
                color: "red",
                message: getErrorMessage(error),
            })
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
                Create Account
            </Title>

            <Text size="sm" c="dimmed" mb="lg">
                Start tracking your finances smarter.
            </Text>

            <form onSubmit={handleSubmit}>
                <Stack>
                    <TextInput
                        label="Name"
                        placeholder="e.g basit, ladosky"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required/>
                    
                    <TextInput
                        label="Email"
                        placeholder="you@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required/>

                    <PasswordInput
                        label="Password"
                        description="Must be at least 6 characters with an uppercase letter, lowercase letter and a number"
                        placeholder="******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required/>

                    <Button
                        type="submit"
                        loading={isLoading}>
                        Create Account
                    </Button>
                </Stack>

                <Text size="sm" ta="center" mt="sm">
                    Already have an account?{""}
                    <Link to="/login">
                        Login
                    </Link>
                </Text>
            </form>
        </Paper>
    )
}