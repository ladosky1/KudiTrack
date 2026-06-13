import { Stack, } from '@mantine/core';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';


interface PageContainerProps {
    children: ReactNode;
}

export default function PageContainer(
    { children, } 
    : PageContainerProps) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 15}}
                animate={{ opacity: 1, y: 0}}
                transition={{ duration: 0.3 }}>
            <Stack
                py="md"
                gap="lg">
                    {children}
            </Stack>
            </motion.div>
        )
    }