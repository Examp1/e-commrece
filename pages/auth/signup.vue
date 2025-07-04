<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import formError from "~/components/form/form-error.vue";
import baseInput from "~/components/form/base-input.vue";
import baseBtn from "~/components/form/base-btn.vue";
definePageMeta({
    layout: "auth",
});

const loading = ref(false)
const rules = {
    email: { required, email },
    password: { required },
};

const registerInputs = ref({
    email: "",
    password: "",
});
const v$ = useVuelidate(rules, registerInputs);

async function submitInput() {
    const isValid = v$.value.$validate();
    if (!isValid) return;
    loading.value = true
}
</script>
<template>
    <div class="bg-white flex justify-center items-center h-screen container max-w-800">
        <div>
            <h1>Sign Up</h1>
            {{ registerInputs }}
            <form-error :errors="v$.email.$errors">
                <base-input
                    v-model="registerInputs.email"
                    :type="'text'"
                    :placeholder="'info@gmail.com'"
                />
            </form-error>
            <form-error :errors="v$.password.$errors">
                <base-input
                    v-model="registerInputs.password"
                    :type="'password'"
                    :placeholder="'info@gmail.com'"
                />
            </form-error>
            <base-btn @click="submitInput" label="Sign Up" :loading/>
            <h4>
                Alredy have an account
                <nuxt-link to="/auth/signin" class="text-blue-500"
                    >Sign In</nuxt-link
                >
            </h4>
        </div>
    </div>
</template>
