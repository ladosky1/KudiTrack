import { useState, useEffect } from "react";

import { 
    Button,
    Paper,
    PinInput,
    Stack,
    Text,
    Title } from "@mantine/core";

import { useNavigate, useSearchParams } from "react-router-dom";

import { notifications } from "@mantine/notifications";

import { getCurrentUser,
         verifyEmail,
         resendVerificationCode } from "@/services/api/auth.Service";

import { useAuth } from "../context/auth.context";

import { getErrorMessage } from "@/services/api/getErrorMessage";

export default function VerifyEmailPage(){
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const {setUser} = useAuth();

    const email = searchParams.get("email") || "";

    const [code, setCode] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [isResending, setIsResending] = useState(false);

    const [cooldown, setCooldown] = useState(0);

    useEffect(() => {
        if(cooldown <= 0) return;

        const timer = setInterval(() => {
            setCooldown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [cooldown]);

    async function handleVerify(){
        try {
            setIsLoading(true);

            const data = await verifyEmail({ email, code });

            const currentUser = await getCurrentUser();

            setUser(currentUser.user || null);

            notifications.show({
                color: "green",
                message: data.message,
            });

            navigate("/");
        } catch (error) {
            notifications.show({
                color: "red",
                message: getErrorMessage(error),
            })
        } finally{
            setIsLoading(false);
        }
    }

    async function handleResendCode(){
        try{
            setIsResending(true);

            const data = await resendVerificationCode(email);

            setCooldown(60);

            notifications.show({
                color: "green",
                message: data.message,
            })
        } catch(error){
            notifications.show({
                color: "red",
                message: getErrorMessage(error),
            })
        } finally{
            setIsResending(false);
        }
    }

    return(
        <Paper
            p="lg"
            radius="md"
            withBorder
            mt="xl">
            <Title order={2} mb="md">
                Verify Email
            </Title>

            <Text
                size="sm"
                c="dimmed"
                mb="lg">
                Enter the 6-digit code sent to:
                <br/>
                <strong>
                    {email}
                </strong>
            </Text>

            <Stack>
                <PinInput
                    length={6}
                    type="number"
                    value={code}
                    onChange={setCode}/>

                <Button
                    loading={isLoading}
                    onClick={handleVerify}>
                    Verify Account
                </Button>

                <Button
                    variant="subtle"
                    onClick={handleResendCode}
                    disabled={cooldown > 0}
                    loading={isResending}>
                    {cooldown > 0 
                        ? `Resend in ${cooldown}s`
                        : "Resend Code"}
                </Button>
            </Stack>
        </Paper>
    )
}