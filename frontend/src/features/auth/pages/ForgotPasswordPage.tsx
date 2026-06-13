import { useState } from "react";

import { 
    Button,
    Paper,
    Stack,
    Text,
    TextInput,
    Title } from "@mantine/core";

import {notifications} from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "@/services/api/auth.Service";
import { getErrorMessage } from "@/services/api/getErrorMessage";

export default function ForgotPasswordPage(){
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: React.SubmitEvent){
        e.preventDefault();

        try {
            setIsLoading(true);

            const data = await forgotPassword(email);

            notifications.show({
                color: "green",
                message: data.message,
            });

            navigate(`/reset-password?email=${encodeURIComponent(email)}`);
        } catch(error) {
            notifications.show({
                color: "red",
                message: getErrorMessage(error),
            });
        } finally {
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
                Forgot Password
            </Title>

            <Text
                size="sm"
                c="dimmed"
                mb="lg">
                Enter your email to receive a password reset link.
            </Text>
            
            <form onSubmit={handleSubmit}>
                <Stack>
                    <TextInput
                        label="Email"
                        placeholder="you@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        required/>
                    
                    <Button
                        type="submit"
                        loading={isLoading}>
                        Send Reset Code
                    </Button>
                </Stack>
            </form>
        </Paper>
    )
}
