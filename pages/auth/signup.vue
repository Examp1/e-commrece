<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import formError from "~/components/form/form-error.vue";
import baseInput from "~/components/form/base-input.vue";
import baseBtn from "~/components/form/base-btn.vue";
definePageMeta({
    layout: "auth",
});

const rules = {
    email: { required, email },
    password: { required },
};

const signupStore = useSignUpStore();
const { registerInputs } = storeToRefs(signupStore);

const v$ = useVuelidate(rules, registerInputs);
const loading = ref(false);
const router = useRouter();

async function submitInput() {
    const isValid = v$.value.$validate();
    if (!isValid) return;
    try {
        loading.value = true;
        await $fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(registerInputs.value),
        });
        loading.value = false;
        router.push("/auth/email-verification");
    } catch (error) {
        loading.value = false;
        showLoginOrSignUpError(error);
    }
}
</script>
<template>
  <div class="bg-white h-screen">
    <div class="flex justify-between">
      <div></div>
      <div class="w-[300px] mt-20">
        <div class="flex flex-col gap-2">
          <h1 class="text-2xl mb-3">Sign up</h1>
        
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
              :placeholder="'password'"
            />
          </form-error>

          <base-btn
            @click="submitInput"
            :loading="loading"
            label="Sign up"
          ></base-btn>

          <p
            class="text-sm font-normal text-center text-gray-700 dark:text-gray-500 sm:text-start"
          >
            Already have an account?
            <NuxtLink
              to="/auth/signin"
              class="text-indigo-500 hover:text-brand-600 font-semibold"
              >Sign in</NuxtLink
            >
          </p>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>