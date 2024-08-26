'use client';
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { useState, useEffect } from 'react';
export function useLocalStorage(defaultValue, key) {
    var _useState = _sliced_to_array(useState(function() {
        if (typeof window === 'undefined') {
            return defaultValue;
        }
        var storedValue = localStorage.getItem(key) || null;
        return storedValue !== null ? storedValue : defaultValue;
    }), 2), value = _useState[0], setValue = _useState[1];
    useEffect(function() {
        localStorage.setItem(key, value);
    }, [
        key,
        value
    ]);
    return [
        value,
        setValue
    ];
}
