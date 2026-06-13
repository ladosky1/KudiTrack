import { MantineProvider } from "@mantine/core";
import { theme } from "@/styles/theme";

import { useTheme } from "./ThemeContext";

export function MantineThemeProvider({
    children,
}: {children: React.ReactNode }){
    const {colorScheme} = useTheme();

    return(
        <MantineProvider
            theme={theme}
            forceColorScheme={colorScheme}>
            {children}
        </MantineProvider>
    )
}