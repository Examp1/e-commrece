// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-05-15",
    devtools: { enabled: true },
    css: ["@picocss/pico"],
    components: [
        {
            path: "~/components",
            pathPrefix: false,
        },
    ],
    modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@prisma/nuxt"],
    runtimeConfig: {
        // private is accessible only the server
        JWT_TOKEN_KEY: process.env.JWT_TOKEN_KEY,
        REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
        DATABASE_URL: process.env.DATABASE_URL,
        public: {
             // public is accessible only the client
        }
    }
});