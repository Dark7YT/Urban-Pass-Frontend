<script>
import HeaderContentComponent from "./public/components/header-content.component.vue";

export default {
  name: "app",
  title: "Urban Pass",

  components: {HeaderContentComponent},
}
</script>

<template>
  <header-content-component></header-content-component>
  <router-view></router-view>
</template>

<style scoped>
</style>

