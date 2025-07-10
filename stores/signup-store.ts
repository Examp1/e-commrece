export const useSignUpStore = defineStore("signup-store", () => {
    const registerInputs = ref({
        name: "",
        email: "",
        password: "",
        otpCode: ""
    });

    return {
        registerInputs
    }
});
