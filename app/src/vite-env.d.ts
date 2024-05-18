/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_STRIPE_KEY: string;
	readonly VITE_STRIPE_SECRET: string;
	readonly VITE_CLIENT_SECRET: string;
	// more env variables...
}
interface ImportMeta {
	readonly env: ImportMetaEnv;
}
