<script setup>
definePageMeta({
    layout: "auth",
});
const loginInputs = ref({
    email: "",
    password: "",
});
</script>
<template>
    <div
        class="bg-white flex justify-center items-center h-screen container"
    >
        <form>
            <h1>Sign In</h1>
            <fieldset>
                <input
                    type=" email"
                    name="email"
                    placeholder="info@gmail.com"
                    autocomplete="given-namc                      e"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"

                />
            </fieldset>
            <input type="submit" value="Subscribe" />
            <h4>
                Dont have an account ?
                <nuxt-link to="/auth/signup" class="text-blue-500"
                    >Sign Up</nuxt-link
                >
            </h4>
        </form>
    </div>
</template>
