import {createContext, FC, ReactNode, useCallback, useContext, useEffect, useMemo, useState} from 'react';

import {defaultContent} from './defaultContent';
import {SiteContent} from './types';

const CONTENT_STORAGE_KEY = 'topdental.siteContent.v1';
const PUBLIC_CONTENT_PATH = '/site-content.json';

interface IContentContextValue {
    content: SiteContent;
    isRemoteContentEnabled: boolean;
    resetContent: (adminPassword?: string) => Promise<void>;
    saveContent: (nextContent: SiteContent, adminPassword?: string) => Promise<void>;
    verifyAdminPassword: (adminPassword: string) => Promise<boolean>;
}

const ContentContext = createContext<IContentContextValue | undefined>(undefined);
const CONTENT_API_URL = (process.env.REACT_APP_CONTENT_API_URL || '').replace(/\/$/, '');

const isObject = (value: unknown): value is Record<string, unknown> => (
    typeof value === 'object' && value !== null && !Array.isArray(value)
);

const mergeDeep = <T,>(base: T, override: unknown): T => {
    if (Array.isArray(base)) {
        return Array.isArray(override) ? override as T : base;
    }

    if (!isObject(base) || !isObject(override)) {
        return override === undefined || override === null ? base : override as T;
    }

    return Object.keys(base).reduce<Record<string, unknown>>((acc, key) => {
        acc[key] = mergeDeep(base[key as keyof typeof base], override[key]);
        return acc;
    }, {}) as T;
};

const readStoredContent = () => {
    try {
        const raw = window.localStorage.getItem(CONTENT_STORAGE_KEY);

        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
};

const resolveInitialContent = () => {
    if (typeof window === 'undefined') {
        return defaultContent;
    }

    return mergeDeep(defaultContent, readStoredContent());
};

const ContentProvider: FC<{children: ReactNode}> = ({children}) => {
    const [content, setContent] = useState<SiteContent>(resolveInitialContent);
    const isRemoteContentEnabled = Boolean(CONTENT_API_URL);

    const requestRemoteContent = useCallback(async (path: string, options: RequestInit = {}) => {
        const response = await fetch(`${CONTENT_API_URL}${path}`, {
            ...options,
            headers: {
                ...(options.body ? {'Content-Type': 'application/json'} : {}),
                ...options.headers,
            },
        });

        if (!response.ok) {
            throw new Error(`Content API request failed with status ${response.status}`);
        }

        return response;
    }, []);

    useEffect(() => {
        let isMounted = true;
        const contentUrl = isRemoteContentEnabled ? `${CONTENT_API_URL}/content` : PUBLIC_CONTENT_PATH;

        fetch(contentUrl, {cache: 'no-cache'})
            .then(response => response.ok ? response.json() : null)
            .then(remoteContent => {
                if (!isMounted || !remoteContent) {
                    return;
                }

                const localOverride = isRemoteContentEnabled ? null : readStoredContent();
                setContent(mergeDeep(mergeDeep(defaultContent, remoteContent), localOverride));
            })
            .catch(() => undefined);

        return () => {
            isMounted = false;
        };
    }, [isRemoteContentEnabled]);

    useEffect(() => {
        const handleStorage = (event: StorageEvent) => {
            if (event.key === CONTENT_STORAGE_KEY) {
                setContent(mergeDeep(defaultContent, event.newValue ? JSON.parse(event.newValue) : null));
            }
        };

        if (isRemoteContentEnabled) {
            return undefined;
        }

        window.addEventListener('storage', handleStorage);

        return () => window.removeEventListener('storage', handleStorage);
    }, [isRemoteContentEnabled]);

    const saveContent = useCallback(async (nextContent: SiteContent, adminPassword = '') => {
        if (isRemoteContentEnabled) {
            await requestRemoteContent('/content', {
                method: 'PUT',
                body: JSON.stringify(nextContent),
                headers: {
                    'X-Admin-Password': adminPassword,
                },
            });
        } else {
            window.localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(nextContent));
        }

        setContent(mergeDeep(defaultContent, nextContent));
    }, [isRemoteContentEnabled, requestRemoteContent]);

    const resetContent = useCallback(async (adminPassword = '') => {
        if (isRemoteContentEnabled) {
            await requestRemoteContent('/content', {
                method: 'DELETE',
                headers: {
                    'X-Admin-Password': adminPassword,
                },
            });
        } else {
            window.localStorage.removeItem(CONTENT_STORAGE_KEY);
        }

        setContent(defaultContent);
    }, [isRemoteContentEnabled, requestRemoteContent]);

    const verifyAdminPassword = useCallback(async (adminPassword: string) => {
        if (!isRemoteContentEnabled) {
            return true;
        }

        try {
            await requestRemoteContent('/auth', {
                method: 'POST',
                headers: {
                    'X-Admin-Password': adminPassword,
                },
            });

            return true;
        } catch {
            return false;
        }
    }, [isRemoteContentEnabled, requestRemoteContent]);

    const value = useMemo<IContentContextValue>(() => ({
        content,
        isRemoteContentEnabled,
        resetContent,
        saveContent,
        verifyAdminPassword,
    }), [content, isRemoteContentEnabled, resetContent, saveContent, verifyAdminPassword]);

    return (
        <ContentContext.Provider value={value}>
            {children}
        </ContentContext.Provider>
    );
};

const useContent = () => {
    const context = useContext(ContentContext);

    if (!context) {
        throw new Error('useContent must be used inside ContentProvider');
    }

    return context;
};

export {CONTENT_API_URL, CONTENT_STORAGE_KEY, ContentProvider, mergeDeep, useContent};
