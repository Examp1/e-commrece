<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import formError from "~/components/base-components/form-error.vue";
import baseInput from "~/components/base-components/base-input.vue";
import baseBtn from "~/components/base-components/base-btn.vue";
definePageMeta({
    layout: "auth",
});
const loginInputs = ref({
    email: "",
    password: "",
});
const rules = {
    email: { required, email },
    password: { required },
};

const v$ = useVuelidate(rules, loginInputs);

const loading = ref(false);
const router = useRouter();

const userCookie = useCookie("user", userCookieSettings);

async function submitInput(event) {
    const isValid = v$.value.$validate();
    if (!isValid) return;
    try {
        loading.value = true;
        const res = await $fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(loginInputs.value),
        });
        loading.value = false;
        userCookie.value = res.data;

        if (userCookie.value.user.role === "ADMIN" ) {
            router.push("/admin/dashboard");
        } else {
            router.push("/");
        }

    } catch (error) {
        loading.value = false;
        showApiError(error);
    }
}
</script>
<template>
    <div class="bg-white h-screen">
        <div class="flex justify-between">
            <div></div>
            <div class="w-[300px] mt-20">
                <div class="flex flex-col gap-2">
                    <h1 class="text-2xl mb-3">Sign In</h1>

                    <form-error :errors="v$.email.$errors">
                        <base-input
                            v-model="loginInputs.email"
                            :type="'text'"
                            :placeholder="'info@gmail.com'"
                        />
                    </form-error>

                    <form-error :errors="v$.password.$errors">
                        <base-input
                            v-model="loginInputs.password"
                            :type="'password'"
                            :placeholder="'password'"
                        />
                    </form-error>

                    <base-btn
                        @click="submitInput"
                        :loading="loading"
                        label="Sign in"
                    ></base-btn>
                    <p
                        class="text-sm font-normal text-center text-gray-700 dark:text-gray-500 sm:text-start"
                    >
                        Dont have an account ?
                        <NuxtLink
                            to="/auth/signup"
                            class="text-indigo-500 hover:text-brand-600 font-semibold"
                            >Sign up</NuxtLink
                        >
                    </p>
                </div>
            </div>
            <div></div>
        </div>
    </div>
</template>
