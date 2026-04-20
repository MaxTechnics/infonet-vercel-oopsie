// eslint-disable-next-line spaced-comment
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_API_ENDPOINT: string;
    readonly VITE_APP_VERSION: string
    readonly VITE_APP_COMPILED_DATE: string;
    readonly VITE_APP_TEST_MODE: string;
    readonly VITE_APP_DEVBAR_MESSAGE: string;
    readonly VITE_APP_SUPABASE_URL: string;
    readonly VITE_APP_SUPABASE_KEY: string;
    readonly VITE_APP_FORCE_ORG: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
