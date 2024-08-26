'use client';
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useEffect, useContext, useRef, useState } from 'react';
var themeContext = /*#__PURE__*/ createContext({
    theme: 'system',
    setTheme: function() {}
});
export function useTheme() {
    return useContext(themeContext);
}
function setCookie(name, value, days) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
}
function themePreference(theme, previousTheme) {
    var colorPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    function getThemeWithSystem(theme) {
        switch(theme){
            case 'system':
                return colorPreference;
            default:
                return theme;
        }
    }
    var currentTheme = getThemeWithSystem(theme);
    var previousThemeWithPreference = previousTheme != null ? getThemeWithSystem(previousTheme) : null;
    if (previousThemeWithPreference != null) {
        document.documentElement.classList.remove(previousThemeWithPreference);
    }
    document.documentElement.classList.add(currentTheme);
}
export function ThemeProvider(param) {
    var children = param.children, tmp = param.theme, defaultTheme = tmp === void 0 ? 'system' : tmp, _param_setStoredTheme = param.setStoredTheme, setStoredTheme = _param_setStoredTheme === void 0 ? function(storageKey, theme) {
        var date = new Date();
        return setCookie(storageKey, theme, date.setFullYear(date.getFullYear() + 10));
    } : _param_setStoredTheme, _param_storedKey = param.storedKey, storedKey = _param_storedKey === void 0 ? 'theme' : _param_storedKey;
    var _useState = _sliced_to_array(useState(defaultTheme), 2), theme = _useState[0], setTheme = _useState[1];
    var ref = useRef(null);
    useEffect(function() {
        setStoredTheme(storedKey, theme);
        themePreference(theme, ref.current);
        ref.current = theme;
        setTheme(theme);
    }, [
        theme
    ]);
    return /*#__PURE__*/ _jsxs(themeContext.Provider, {
        value: {
            theme: theme,
            setTheme: setTheme
        },
        children: [
            /*#__PURE__*/ _jsx("script", {
                suppressHydrationWarning: true,
                dangerouslySetInnerHTML: {
                    __html: "(".concat(themePreference.toString(), ")('").concat(theme, "', 'null')")
                }
            }),
            children
        ]
    });
}
