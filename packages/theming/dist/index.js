'use client';
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useState, useEffect, useContext } from 'react';
var themeContext = /*#__PURE__*/ createContext({
    theme: 'system',
    setTheme: function() {}
});
function getStorageValue(key, defaultValue) {
    if (typeof window === 'undefined') {
        return defaultValue;
    }
    // getting stored value
    var saved = localStorage.getItem(key);
    var initial = JSON.parse(saved);
    return initial || defaultValue;
}
export var useLocalStorage = function(key, defaultValue) {
    var _useState = _sliced_to_array(useState(function() {
        return getStorageValue(key, defaultValue);
    }), 2), value = _useState[0], setValue = _useState[1];
    useEffect(function() {
        // storing input name
        localStorage.setItem(key, JSON.stringify(value));
    }, [
        key,
        value
    ]);
    return [
        value,
        setValue
    ];
};
function themePreference(theme) {
    var themes = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [
        'light',
        'dark',
        'system'
    ];
    var _document_documentElement_classList;
    var colorPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var currentTheme;
    switch(theme){
        case 'system':
            currentTheme = colorPreference;
            break;
        case 'light':
            currentTheme = 'light';
            break;
        case 'dark':
        default:
            currentTheme = 'dark';
            break;
    }
    (_document_documentElement_classList = document.documentElement.classList).remove.apply(_document_documentElement_classList, _to_consumable_array(themes));
    document.documentElement.classList.add(currentTheme);
    document.documentElement.setAttribute('style', "color-scheme: ".concat(currentTheme, ";"));
    document.documentElement.style.colorScheme = currentTheme;
}
export function useTheme() {
    return useContext(themeContext);
}
export function ThemeProvider(param) {
    var children = param.children, _param_themes = param.themes, themes = _param_themes === void 0 ? [
        'system',
        'light',
        'dark'
    ] : _param_themes, _param_defaultTheme = param.defaultTheme, defaultTheme = _param_defaultTheme === void 0 ? 'system' : _param_defaultTheme;
    var _useState = _sliced_to_array(useState(defaultTheme), 2), currentTheme = _useState[0], setCurrentTheme = _useState[1];
    var _useLocalStorage = _sliced_to_array(useLocalStorage('theme', currentTheme), 2), theme = _useLocalStorage[0], setThemeStorage = _useLocalStorage[1];
    function setTheme(theme) {
        setThemeStorage(theme);
        themePreference(theme);
    }
    var params = JSON.stringify(theme);
    useEffect(function() {
        setCurrentTheme(localStorage.getItem('theme'));
        themePreference(theme);
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
                nonce: typeof window !== 'undefined' ? '' : '',
                dangerouslySetInnerHTML: {
                    __html: "(".concat(themePreference.toString(), ")(").concat(params, ")")
                }
            }),
            children
        ]
    });
}
