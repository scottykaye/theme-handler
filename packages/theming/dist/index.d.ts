import { type ReactNode } from 'react';
export declare const useLocalStorage: (key: any, defaultValue: any) => any[];
interface ThemeProviderProps {
    children: ReactNode;
    themes: Array<string>;
    defaultTheme: string;
}
export declare function useTheme(): {
    theme: string;
    setTheme: (theme?: string[] | undefined) => void;
};
export declare function ThemeProvider({ children, themes, defaultTheme, }: ThemeProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
