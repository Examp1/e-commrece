export const useSignUpStore = defineStore("signup-store", () => {
    const registerInputs = ref({
        email: "",
        password: "",
        otpCode: ""
    });

    return {
        registerInputs
    }
});
