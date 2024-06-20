<script>
import eventCardComponent from "../components/event-card.component.vue";
import {EventApiService} from "../services/event-api.service.js";

export default {
  name: "event-list.component",
  components: { eventCardComponent },
  props: ['id'],
  data() {
    return {
      title: "Events",
      events: [],
      eventsService: null,
    }
  },
  created() {
    this.eventsService = new EventApiService();
    this.eventsService.getAllEvents()
        .then(response => {
            this.events = response.data;
        })
        .catch(e => {
            console.log(e);
        });
  }
}
</script>

<template>
  <div>
    <div class="container">
      <div class="column">
        <h1 class="title">Events</h1>
        <div class="card-container">
          <event-card-component
              class="event-card"
              v-for="event in events"
              :key="event.id"
              :event="event"
          ></event-card-component>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>