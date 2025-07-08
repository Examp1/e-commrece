// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-05-15",
    devtools: { enabled: true },
    // css: ["@picocss/pico"],
    components: [
        {
            path: "~/components",
            pathPrefix: false,
        },
    ],
    modules: [
        "@nuxtjs/tailwindcss",
        "@pinia/nuxt",
        "@prisma/nuxt",
        "nuxt-nodemailer",
    ],
    nodemailer: {
        from: "E-commerse app <noreply@app.com>",
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: false,
        auth: {
            user: process.env.MAIL_TRAP_USER,
            pass: process.env.MAIL_TRAP_PASSWORD,
        },
    },
    runtimeConfig: {
        // private is accessible only the server
        JWT_TOKEN_KEY: process.env.JWT_TOKEN_KEY,
        REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
        DATABASE_URL: process.env.DATABASE_URL,
        public: {
            // public is accessible only the client
        },
    },
});
