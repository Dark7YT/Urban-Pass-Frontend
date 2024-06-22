<script>
import { SignUpApiService } from "../services/sign-up-api.service.js";
import router from "../../../router/index.js";
import Toast from "primevue/toast";
export default {
    name: "sign-up.component.vue",
    components: {
        'pv-toast': Toast
    },
    data() {
        return {
            username: null,
            email: null,
            password: null,
            emailIsValid: false,
            apiService: new SignUpApiService()
        }
    },
    methods: {
        validateEmail() {
          let regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
          this.emailIsValid = regex.test(this.email);
        },
        async submitForm() {
            const userResource = {
                username: this.username,
                email: this.email,
                password: this.password
            };
            try {
                const response = await this.apiService.create(userResource);
                console.log(response);
                this.$toast.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Registration successful. Welcome!',
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
                    detail: 'Registration failed. Please try again.',
                    life: 5000
                });
            }
        }
    },
    watch: {
      email() {
        this.validateEmail();
      }
    }
}
</script>
<template>
    <div class="sign-up-container">
        <h1 class="text-2xl font-semibold mb-4">Sign Up</h1>
        <p class="text-sm mb-4">Create an account to get started</p>
        <pv-float-label class="sign-up-element">
            <pv-input-text id="username" class="sign-up-text" v-model="username" />
            <label for="username">Username</label>
        </pv-float-label>
        <pv-float-label class="sign-up-element">
          <pv-input-text id="email" class="sign-up-text" v-model="email" @input="validateEmail" />
          <label for="email">Email</label>
        </pv-float-label>
        <p v-if="!emailIsValid" class="error">Please enter a valid email.</p>
        <pv-float-label class="sign-up-element">
            <pv-password v-model="password" class="sign-up-text" inputId="password" />
            <label for="password">Password</label>
        </pv-float-label>
        <pv-button class="button" label="Submit" @click="submitForm" />
    </div>
</template>
<style scoped>
.sign-up-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 70vh;
}
.sign-up-element {
    width : 300px;
    margin: 20px 0;
}
.sign-up-text {
    width: 300px !important;
}
.button {
    margin-top: 50px;
    width: 300px !important;
}
/deep/ .p-inputtext.p-component.p-password-input {
    width: 300px;
}
</style>