'use client';
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
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
function script() {
    var attribute = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 'class', value = arguments.length > 1 ? arguments[1] : void 0, forcedTheme = arguments.length > 2 ? arguments[2] : void 0, defaultTheme = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 'dark', storageKey = arguments.length > 4 ? arguments[4] : void 0, themes = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : themes;
    var isClass = attribute === 'class';
    var classes = isClass && value ? themes.map(function(t) {
        return value[t] || t;
    }) : themes;
    function setColorScheme(theme) {
        document.documentElement.style.colorScheme = theme;
    }
    function updateDOM(theme) {
        if (isClass) {
            var _document_documentElement_classList;
            (_document_documentElement_classList = document.documentElement.classList).remove.apply(_document_documentElement_classList, _to_consumable_array(classes));
            document.documentElement.classList.add(theme);
        } else {
            document.documentElement.setAttribute(attribute, theme);
        }
        setColorScheme(theme);
    }
    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    if (forcedTheme) {
        updateDOM(forcedTheme);
    } else {
        try {
            var themeName = localStorage.getItem(storageKey) || defaultTheme;
            var isSystem = themeName === 'system';
            var theme = isSystem ? getSystemTheme() : themeName;
            updateDOM(theme);
        } catch (e) {
        //
        }
    }
}
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
    console.log({
        currentTheme: currentTheme
    });
    (_document_documentElement_classList = document.documentElement.classList).remove.apply(_document_documentElement_classList, _to_consumable_array(themes));
    document.documentElement.classList.add(currentTheme);
    document.documentElement.setAttribute('style', "color-scheme: ".concat(currentTheme, ";"));
    document.documentElement.style.colorScheme = currentTheme;
}
export function ThemeProvider(param) {
    var children = param.children, _param_themes = param.themes, themes = _param_themes === void 0 ? [
        'system',
        'light',
        'dark'
    ] : _param_themes, _param_defaultTheme = param.defaultTheme, defaultTheme = _param_defaultTheme === void 0 ? 'system' : _param_defaultTheme;
    var _useState = _sliced_to_array(useState(defaultTheme), 2), preTheme = _useState[0], setpreTheme = _useState[1];
    var _useLocalStorage = _sliced_to_array(useLocalStorage(typeof window !== 'undefined' && localStorage.getItem('theme') || preTheme, 'theme'), 2), theme = _useLocalStorage[0], setThemeState = _useLocalStorage[1];
    var colorPreference = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var previousTheme = useRef();
    function setTheme(theme) {
        setThemeState(theme);
    }
    useEffect(function() {
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
        document.documentElement.classList.add(currentTheme);
        document.documentElement.setAttribute('style', "color-scheme: ".concat(currentTheme, ";"));
        // Remove opposite theme class
        if (previousTheme.current && previousTheme.current !== currentTheme) {
            document.documentElement.classList.remove(previousTheme.current);
        }
        previousTheme.current = currentTheme;
    }, [
        theme
    ]);
    var params = JSON.stringify([
        theme
    ]);
    var scriptArgs = JSON.stringify([
        'class',
        theme,
        undefined,
        theme,
        'theme',
        [
            'system',
            'light',
            'dark'
        ]
    ]).slice(1, -1);
    return /*#__PURE__*/ _jsxs(themeContext.Provider, {
        value: {
            theme: theme,
            setTheme: setTheme
        },
        children: [
            /*#__PURE__*/ _jsx("script", {
                suppressHydrationWarning: true,
                nonce: typeof window === 'undefined' ? '' : '',
                dangerouslySetInnerHTML: {
                    //__html: `(${themePreference.toString()})(${params})`,
                    __html: "(".concat(script.toString(), ")(").concat(scriptArgs, ")")
                }
            }),
            children
        ]
    });
}
export function useTheme() {
    return useContext(themeContext);
}
