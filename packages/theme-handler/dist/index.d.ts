import { type SetStateAction, type ReactNode, type Dispatch } from 'react';
declare namespace ThemeProvider {
    interface Props {
        children: ReactNode;
        themes?: Array<string>;
        defaultTheme?: string;
    }
    interface Context {
        theme: string;
        setTheme: Dispatch<SetStateAction<string>>;
    }
}
export declare function useTheme(): ThemeProvider.Context;
export declare function ThemeProvider({ children, themes, defaultTheme, }: ThemeProvider.Props): import("react/jsx-runtime").JSX.Element;
export {};
