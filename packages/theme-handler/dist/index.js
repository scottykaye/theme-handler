'use client';
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { createContext, useContext, useRef, useState } from 'react';
var themeContext = /*#__PURE__*/ createContext({
    theme: 'system',
    setTheme: function() {},
    isNestedThemeProvider: false
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
function RenderedElement(param) {
    var isNested = param.isNested, theme = param.theme, children = param.children;
    if (isNested) {
        return /*#__PURE__*/ _jsx("div", {
            style: {
                display: 'contents'
            },
            className: "".concat(theme, " ").concat(theme),
            children: children
        });
    }
    return /*#__PURE__*/ _jsx(_Fragment, {
        children: children
    });
}
export function ThemeProvider(param) {
    var children = param.children, tmp = param.theme, defaultTheme = tmp === void 0 ? 'system' : tmp, _param_setStoredTheme = param.setStoredTheme, setStoredTheme = _param_setStoredTheme === void 0 ? function(storageKey, theme) {
        var date = new Date();
        return setCookie(storageKey, theme, date.setFullYear(date.getFullYear() + 10));
    } : _param_setStoredTheme, _param_storedKey = param.storedKey, storedKey = _param_storedKey === void 0 ? 'theme' : _param_storedKey;
    var _useState = _sliced_to_array(useState(defaultTheme), 2), theme = _useState[0], setThemeState = _useState[1];
    var ref = useRef(theme);
    var isNestedThemeProvider = useTheme().isNestedThemeProvider;
    function setTheme(theme) {
        setStoredTheme(storedKey, theme);
        themePreference(theme, ref.current);
        ref.current = theme;
        setThemeState(theme);
    }
    return /*#__PURE__*/ _jsxs(themeContext.Provider, {
        value: {
            theme: theme,
            setTheme: setTheme,
            isNestedThemeProvider: true
        },
        children: [
            /*#__PURE__*/ _jsx("script", {
                suppressHydrationWarning: true,
                dangerouslySetInnerHTML: {
                    __html: isNestedThemeProvider ? '' : "(".concat(themePreference.toString(), ")('").concat(theme, "', 'null')")
                }
            }),
            /*#__PURE__*/ _jsx(RenderedElement, {
                isNested: isNestedThemeProvider,
                theme: theme,
                children: children
            })
        ]
    });
}
