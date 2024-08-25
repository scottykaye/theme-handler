'use client';
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useEffect, useContext, useRef } from 'react';
import { useLocalStorage } from './localStorage';
var themeContext = /*#__PURE__*/ createContext({
    theme: 'system',
    setTheme: function() {}
});
export function useTheme() {
    return useContext(themeContext);
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
    try {
        var currentTheme = getThemeWithSystem(theme);
        var previousThemeWithPreference = previousTheme != null ? getThemeWithSystem(previousTheme) : null;
        if (previousThemeWithPreference != null) {
            document.documentElement.classList.remove(previousThemeWithPreference);
        }
        document.documentElement.classList.add(currentTheme);
    } catch (e) {
        console.log('Error applying theme:', e);
    }
}
export function ThemeProvider(param) {
    var children = param.children, _param_themes = param.themes, themes = _param_themes === void 0 ? [
        'system',
        'light',
        'dark'
    ] : _param_themes, _param_defaultTheme = param.defaultTheme, defaultTheme = _param_defaultTheme === void 0 ? 'system' : _param_defaultTheme;
    var _localStorage_getItem;
    var _useLocalStorage = _sliced_to_array(useLocalStorage((_localStorage_getItem = localStorage.getItem('theme')) !== null && _localStorage_getItem !== void 0 ? _localStorage_getItem : defaultTheme, 'theme'), 2), theme = _useLocalStorage[0], setTheme = _useLocalStorage[1];
    var ref = useRef(null);
    useEffect(function() {
        themePreference(theme, ref.current);
        setTheme(theme);
        ref.current = theme;
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
                    __html: "(".concat(themePreference.toString(), ")('").concat(theme, "', ").concat(JSON.stringify(themes), ")")
                }
            }),
            children
        ]
    });
}
