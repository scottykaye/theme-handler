import { type ReactNode } from 'react';
declare namespace ThemeProvider {
    interface Props {
        children: ReactNode;
        theme?: string;
        setStoredTheme?: (storageKey: string, theme: string) => void;
        storedKey?: 'theme';
    }
    interface Context {
        theme: string;
        setTheme: (theme: string) => void;
    }
}
export declare function useTheme(): ThemeProvider.Context;
export declare function ThemeProvider({ children, theme: defaultTheme, setStoredTheme, storedKey, }: ThemeProvider.Props): import("react/jsx-runtime").JSX.Element;
export {};
