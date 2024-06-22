<script>
import {SignInApiService} from "../services/sign-in-api.service.js";
import Toast from "primevue/toast";
import router from "../../../router/index.js";
export default {
    name: "sign-in.component",
    components: {
        'pv-toast': Toast
    },
    data() {
        return {
            username: null,
            email: null,
            password: null,
            apiService: new SignInApiService()
        }
    },
    methods: {
        async submitForm() {
            const userResource = {
                username: this.username,
                password: this.password
            };
            try {
                const response = await this.apiService.signIn(userResource);
                console.log(response);
                this.$toast.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Login successful. Welcome!',
                    life: 5000
                });
                localStorage.setItem('user', JSON.stringify(response.data));
                window.dispatchEvent(new Event('storage'));
                this.$router.push('/eventManagement/event');
            } catch (error) {
                console.error(error);
                this.username = null;
                this.email = null;
                this.password = null;
                this.$router.push('/sign-up');
                this.$toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Login failed. Please try again.',
                    life: 5000
                });
            }
        }
    }
}
</script>
<template>
    <div class="sign-in-container">
        <h1 class="text-2xl font-semibold mb-4">Sign In</h1>
        <p class="text-sm mb-4">Please enter your details to sign in</p>
        <pv-float-label class="sign-in-element">
            <pv-input-text id="username" class="sign-in-text" v-model="username" />
            <label for="username">Username</label>
        </pv-float-label>
        <pv-float-label class="sign-in-element">
            <pv-password v-model="password" class="sign-in-text" inputId="password" />
            <label for="password">Password</label>
        </pv-float-label>
        <pv-button class="button" label="Submit" @click="submitForm" />
    </div>
</template>

<style scoped>
.sign-in-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 70vh;
}
.sign-in-element {
    width : 300px;
    margin: 20px 0;
}
.sign-in-text {
    width: 300px !important;
}
/deep/ .p-inputtext.p-component.p-password-input {
    width: 300px;
}
</style>