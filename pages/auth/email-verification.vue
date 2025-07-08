<script setup lang="ts">
import { ref } from "vue";
import baseBtn from "~/components/form/base-btn.vue";
import VOtpInput from "vue3-otp-input";

const signupStore = useSignUpStore();
const { registerInputs } = storeToRefs(signupStore);

const loading = ref<boolean>(false);
const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null);
const router = useRouter();

const handleOnComplete = (value: string) => {
    registerInputs.value.otpCode = value;
    console.log("OTP completed: ", value);
};

const handleOnChange = (value: string) => {
    console.log("OTP changed: ", value);
};

async function verifyEmail() {
    try {
        loading.value = true;
        const res = await $fetch("/api/auth/email-verification", {
            method: "POST",
            body: JSON.stringify(registerInputs.value),
        });
        loading.value = false;
        successMsg(res?.message);
        router.push("/auth/signin");
    } catch (error) {
        loading.value = false;
        console.log("error:", error?.message);
    }
}
</script>

<template>
    <div class="bg-white h-screen">
        <div class="flex justify-between">
            <div></div>
            <div class="w- mt-20">
                <div class="flex flex-col gap-2">
                    <!-- {{ otpInput }}
          {{ registerInput }} -->
                    <h1 class="text-2xl mb-3">E-mail verification</h1>
                    <v-otp-input
                        ref="otpInput"
                        input-classes="otp-input"
                        :conditionalClass="['one', 'two', 'three', 'four']"
                        separator=""
                        inputType="letter-numeric"
                        :num-inputs="6"
                        v-model:value="bindValue"
                        :should-auto-focus="true"
                        :should-focus-order="true"
                        @on-change="handleOnChange"
                        @on-complete="handleOnComplete"
                        :placeholder="['*', '*', '*', '*']"
                    />

                    <BaseBtn
                        class="w-[100%]"
                        @click="verifyEmail"
                        :loading="loading"
                        label="Verify your Email Adress"
                    ></BaseBtn>
                </div>
            </div>
            <div></div>
        </div>
    </div>
</template>

<style>
.otp-input {
    width: 40px;
    height: 40px;
    padding: 5px;
    margin: 0 10px;
    font-size: 20px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    text-align: center;
}
/* Background colour of an input field with value */
.otp-input.is-complete {
    background-color: #e4e4e4;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input::placeholder {
    font-size: 15px;
    text-align: center;
    font-weight: 600;
}
</style>
