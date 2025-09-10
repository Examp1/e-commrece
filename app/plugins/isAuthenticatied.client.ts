export default defineNuxtPlugin({
    name: "isAuthenticatied",
    parallel: true,
    async setup(nuxtApp) {
        nuxtApp.provide("isAuthenticatied", (error: Ref<any>) => {
            const statusCode = error.value?.statusCode;
            if (statusCode === 401) {
                window.location.href = "/auth/signin";
                showCustomError("Unauthenticated!");
            }
        });
    },
});
