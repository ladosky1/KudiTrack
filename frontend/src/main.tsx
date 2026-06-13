import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { TransactionProvider } from "@/features/transactions/context/TransactionContext";
import { AuthProvider } from './features/auth/context/auth.context';
import { MantineThemeProvider } from './context/MantineThemeProvider';

import '@/index.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from '@/app/Router';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
    <MantineThemeProvider>
      <Notifications />
      <ModalsProvider>
      <AuthProvider>
        <TransactionProvider>
          <RouterProvider router={router}/>
        </TransactionProvider>  
      </AuthProvider>
      </ModalsProvider>
    </MantineThemeProvider>
    </ThemeProvider>
  </StrictMode>,
)
