<script>
import { watchEffect } from 'vue';

export default {
    name: "header-content",
    data() {
        return {
            items: [
                {label: 'About', to: '/about'},
                {label: 'Events', to: '/eventManagement/event'},
                {label: 'Sign Up', to: '/sign-up'},
                {label: 'Sign In', to: '/sign-in'}
            ],
            isLogged: false
        }
    },
    created() {
        watchEffect(() => {
            this.isLogged = !!localStorage.getItem('user');
        });
        window.addEventListener('storage', () => {
            this.isLogged = !!localStorage.getItem('user');
        });
    },
    computed: {
        filteredItems() {
            if (this.isLogged) {
                return this.items.filter(item => item.label !== 'Sign Up' && item.label !== 'Sign In');
            } else {
                return this.items;
            }
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('user');
            this.isLogged = false;
        }
    }
}
</script>

<template>
    <div class="card">
        <pv-toolbar style="border-radius: 3rem; padding: 1rem 1rem 1rem 1.5rem">
            <template #start>
                <router-link to="/home">
                    <img class="image" src="../../../public/urbanPass-logo.png" alt="">
                </router-link>
                <h1 class="title">Urban Pass</h1>
            </template>

            <template #end>
                <div class="button-container">
                    <router-link v-for="item in filteredItems" :key="item.label" v-slot="{ navigate, href}" :to="item.to" custom>
                        <pv-button :href="href" class="p-button-text text-black" @click="navigate">
                            {{ item.label }}
                        </pv-button>
                    </router-link>
                    <router-link v-if="isLogged" to="/eventManagement/event" @click.native="logout">
                        <pv-button class="p-button-text text-black">
                            Sign Out
                        </pv-button>
                    </router-link>
                </div>
            </template>
        </pv-toolbar>
        <pv-toast position="top-right"></pv-toast>

    </div>
</template>

<style scoped>
.button-container {
    flex-direction: column;
}
.image {
    width: 5rem;
}
.title{
    font-size: 1.5rem;
    margin-left: 1rem;
}
.card {
    width: 100%;
    border-bottom: 1px solid black;
    margin-bottom: 20px;
}
</style>