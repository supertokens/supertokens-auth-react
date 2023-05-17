/**
 * This example app uses HashRouter from react-router-dom. The SuperTokens SDK relies on
 * some window properties like location hash, query params etc. Because HashRouter places
 * everything other than the website base in the location hash, we need to add custom
 * handling for some of the properties of the Window API
 */

import Router from "next/router";

let inmemstorage = {};

export default function getWindowHandler(original) {
    return {
        ...original,
        location: {
            ...original.location,
            setHref: (href) => {
                Router.push(href);
            },
        },
        localStorage: {
            ...original.localStorage,
            key: async (index) => {
                try {
                    return window.localStorage.key(index);
                } catch (err) {
                    return Object.keys(inmemstorage)[index];
                }
            },
            getItem: async (key) => {
                try {
                    return window.localStorage.getItem(key);
                } catch (err) {
                    return inmemstorage[key] === undefined ? null : inmemstorage[key];
                }
            },
            clear: async () => {
                try {
                    return window.localStorage.clear();
                } catch (err) {
                    inmemstorage = {};
                }
            },
            removeItem: async (key) => {
                try {
                    return window.localStorage.removeItem(key);
                } catch (err) {
                    delete inmemstorage[key];
                }
            },
            setItem: async (key, value) => {
                try {
                    return window.localStorage.setItem(key, value);
                } catch (err) {
                    inmemstorage[key] = value;
                }
            },
            keySync: (index) => {
                try {
                    return window.localStorage.key(index);
                } catch (err) {
                    return Object.keys(inmemstorage)[index];
                }
            },
            getItemSync: (key) => {
                try {
                    return window.localStorage.getItem(key);
                } catch (err) {
                    return inmemstorage[key] === undefined ? null : inmemstorage[key];
                }
            },
            clearSync: () => {
                try {
                    return window.localStorage.clear();
                } catch (err) {
                    inmemstorage = {};
                }
            },
            removeItemSync: (key) => {
                try {
                    return window.localStorage.removeItem(key);
                } catch (err) {
                    delete inmemstorage[key];
                }
            },
            setItemSync: (key, value) => {
                try {
                    return window.localStorage.setItem(key, value);
                } catch (err) {
                    inmemstorage[key] = value;
                }
            },
        },
    };
}
