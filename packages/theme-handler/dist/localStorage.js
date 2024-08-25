'use client';
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { useState, useEffect } from 'react';
export function useLocalStorage(defaultValue, key) {
    var _useState = _sliced_to_array(useState(defaultValue), 2), value = _useState[0], setValue = _useState[1];
    useEffect(function() {
        var activeValue = localStorage.getItem(key);
        if (activeValue !== null) {
            setValue(activeValue);
        }
    }, [
        key
    ]);
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
