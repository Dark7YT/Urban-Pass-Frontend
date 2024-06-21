<script>
import { Event } from "../model/event.entity.js";

export default {
  name: "event-card",
  props: {
    event: Event,
  },
    mounted() {
        console.log(this.event.location.city);
    }
}
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ event.name }}</h5>
      <p class="card-text">{{ event.description }}</p>
      <p class="card-text">{{ event.date }}</p>
      <p class="card-text">{{ event.location.venue }}</p>
      <p class="card-text">{{ event.location.city }}</p>
      <p class="card-text">{{ event.location.country }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 18rem;
  margin: 1rem;
}
.card-body {
  padding: 1rem;
}
.card-title {
  font-size: 1.5rem;
  font-weight: bold;
}
.card-text {
  font-size: 1rem;
}
</style>