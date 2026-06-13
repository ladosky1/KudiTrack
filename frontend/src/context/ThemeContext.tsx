import { 
    useContext,
    createContext,
    useState,
    useEffect } from "react";

type ColorScheme = "light" | "dark";

interface ThemeContextValue {
    colorScheme: ColorScheme;
    toggleColorScheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({
    children,
} : { children: React.ReactNode }){
    const [colorScheme, setColorScheme] = useState<ColorScheme>(
        () => {
            const saved = localStorage.getItem("kuditrack-theme");

            return saved === "dark" ? "dark" : "light";
        }
    );

    useEffect(() => {
        localStorage.setItem(
            "kuditrack-theme", colorScheme
        )
    }, [colorScheme]);

    function toggleColorScheme(){
        setColorScheme((current) => current === "light" ? "dark" : "light")
    };

    return(
        <ThemeContext.Provider value={{colorScheme, toggleColorScheme}}>
            {children}
        </ThemeContext.Provider>
    )
};

export function useTheme(){
    const context = useContext(ThemeContext);

    if(!context){
        throw new Error(
            "useTheme must be used within Theme Provider"
        )
    }

    return context;
}