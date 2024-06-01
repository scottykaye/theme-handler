import { type SetStateAction, type ReactNode, type Dispatch } from 'react';
export declare function useLocalStorage(defaultValue: string, key: string): [string, Dispatch<SetStateAction<string>>] | null;
interface ThemeProviderProps {
    children: ReactNode;
    themes: Array<string>;
    defaultTheme: string;
}
export declare function ThemeProvider({ children, themes, defaultTheme, }: ThemeProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useTheme(): {
    theme: string;
    setTheme: (theme?: string[] | undefined) => void;
};
export {};
