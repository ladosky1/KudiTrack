import { useState } from "react";

import { 
    Button,
    Paper,
    Stack,
    PasswordInput,
    Text,
    TextInput,
    Title } from "@mantine/core";

import {notifications} from "@mantine/notifications";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "@/services/api/auth.Service";
import { getErrorMessage } from "@/services/api/getErrorMessage";

export default function ResetPasswordPage(){
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const [email, setEmail] = useState(
        searchParams.get("email") || ""
    );

    const [newPassword, setNewPassword] = useState("");

    const [code, setCode] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: React.SubmitEvent){
        e.preventDefault();

        try {
            setIsLoading(true);

            const data = await resetPassword({ 
                email,
                code, 
                newPassword,
            });

            notifications.show({
                color: "green",
                message: data.message,
            });

            navigate("/login");
        } catch(error){
            notifications.show({
                color: "red",
                message: getErrorMessage(error),
            })
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
                Reset Password
            </Title>

            <Text size="sm" c="dimmed" mb="lg">
                Enter the code sent to your email.
            </Text>

            <form onSubmit={handleSubmit}>
                <Stack>
                    <TextInput
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        required/>
                    
                    <TextInput
                        label="Verification Code"
                        value={code}
                        onChange={(e) => setCode(e.currentTarget.value)}
                        required/>
                    
                    <PasswordInput
                        label="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.currentTarget.value)}
                        required/>

                    <Button
                        type="submit"
                        loading={isLoading}>
                        Reset Password
                    </Button>
                </Stack>
            </form>
        </Paper>
    )
}