<script>
import { Event } from "../model/event.entity.js";

export default {
  name: "event-card.component",
  props: {
    event: Event,
  }
}
</script>

<template>
  <pv-card class="custom-card" style="width: 25rem; height: 10rem; overflow: hidden">
    <template #content>
      <div class="card-content">
        <div class="card-details">
          <h2 class="card-title">{{event.name}}</h2>
          <p class="card-subtitle">{{event.description}}</p>
          <p class="card-subtitle">{{event.date}}</p>
          <p class="card-subtitle">{{event.location.venue}}</p>
          <p class="card-subtitle">{{event.location.city}}</p>
          <p class="card-subtitle">{{event.location.country}}</p>
          <p class="card-subtitle">{{event.maxTickets}}</p>
          <p class="card-subtitle">{{event.soldTickets}}</p>
        </div>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>

</style>