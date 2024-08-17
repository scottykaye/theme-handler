'use client';
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useState, useEffect, useContext, useRef } from 'react';
var themeContext = /*#__PURE__*/ createContext({
    theme: 'system',
    setTheme: function() {}
});
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
function getThemeWithSystem(theme) {
    var colorPreference = isClient && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    switch(theme){
        case 'system':
            return colorPreference;
        case 'light':
            return 'light';
        case 'dark':
        default:
            return 'dark';
    }
}
function themePreference(theme) {
    var currentTheme = getThemeWithSystem(theme);
    document.documentElement.classList.remove('system', 'light', 'dark');
    document.documentElement.classList.add(theme);
}
export function useTheme() {
    return useContext(themeContext);
}
var isClient = typeof window !== 'undefined';
export function ThemeProvider(param) {
    var children = param.children, _param_themes = param.themes, themes = _param_themes === void 0 ? [
        'system',
        'light',
        'dark'
    ] : _param_themes, _param_defaultTheme = param.defaultTheme, defaultTheme = _param_defaultTheme === void 0 ? 'system' : _param_defaultTheme;
    var _useState = _sliced_to_array(useState(localStorage.getItem('theme') || defaultTheme), 2), currentTheme = _useState[0], setCurrentTheme = _useState[1];
    var _useLocalStorage = _sliced_to_array(useLocalStorage(currentTheme, 'theme'), 2), theme = _useLocalStorage[0], setThemeState = _useLocalStorage[1];
    var colorPreference = isClient && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var previousTheme = useRef();
    function setTheme(theme) {
        setThemeState(theme);
        themePreference(theme);
    }
    if (theme !== previousTheme.current) {
        setCurrentTheme(theme);
        setThemeState(theme);
        themePreference(theme);
        previousTheme.current = currentTheme;
    }
    var params = JSON.stringify(theme);
    return /*#__PURE__*/ _jsxs(themeContext.Provider, {
        value: {
            theme: theme,
            setTheme: setTheme
        },
        children: [
            /*#__PURE__*/ _jsx("script", {
                suppressHydrationWarning: true,
                nonce: typeof window !== 'undefined' ? '' : '',
                dangerouslySetInnerHTML: {
                    __html: "(".concat(themePreference.toString(), ")(").concat(params, ")")
                }
            }),
            children
        ]
    });
}
