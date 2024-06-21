<script>
import HeaderContentComponent from "./public/components/header-content.component.vue";
import FooterContent from "./public/components/footer-content.component.vue";

export default {
  name: "app",
  title: "Urban Pass",

  components: {FooterContent, HeaderContentComponent},
}
</script>

<template>
  <header-content-component></header-content-component>
  <router-view></router-view>
  <footer-content></footer-content>
</template>

<style scoped>
</style>

