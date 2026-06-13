import { Outlet } from 'react-router-dom'
import { AppShell, Container } from '@mantine/core'

import Navbar from '@/components/shared/Navbar'

export default function AppLayout() {
    return (
        <AppShell
            padding="md"
            footer={{ height: 70 }}>

            <AppShell.Main pb={80}>
                <Container size="sm">
                    <Outlet />
                </Container>
            </AppShell.Main>

            <AppShell.Footer>
                <Navbar />
            </AppShell.Footer>
        </AppShell>
    )
}
