import { type SetStateAction, type ReactNode, type Dispatch } from 'react';
declare namespace ThemeProvider {
    interface Props {
        children: ReactNode;
        theme?: string;
        setStoredTheme?: (storageKey: string, theme: string) => void;
        storedKey?: 'theme';
    }
    interface Context {
        theme: string;
        setTheme: Dispatch<SetStateAction<string>>;
    }
}
export declare function useTheme(): ThemeProvider.Context;
export declare function ThemeProvider({ children, theme: defaultTheme, setStoredTheme, storedKey, }: ThemeProvider.Props): import("react/jsx-runtime").JSX.Element;
export {};
