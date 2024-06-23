<template>
  <div class="home-container">
    <h1 class="title">Bienvenido a UrbanPass</h1>
    <p class="description">El lugar donde podras adquirir tus entradas para los mejores eventos.</p>
  </div>
</template>

<script>
export default {
  name: "home",
  title: "Home"
}
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

.title {
  font-size: 2.5em;
  color: #333;
}

.description {
  font-size: 1.2em;
  color: #666;
}
</style>