import { type Dispatch, type SetStateAction } from 'react';
export declare function useLocalStorage(defaultValue: string, key: string): [string, Dispatch<SetStateAction<string>>];
