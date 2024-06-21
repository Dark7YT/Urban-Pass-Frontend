<script>
import eventCardComponent from "../components/event-card.component.vue";
import {EventApiService} from "../services/event-api.service.js";
import EventCreate from "../components/event-create.component.vue";

export default {
  name: "event-list.component",
  components: {EventCreate, eventCardComponent },
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
  <event-create></event-create>
</template>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.event-card {
  flex: 1 0 20%; /* Cada tarjeta comenzará con un 20% del ancho total, permitiendo hasta 4 tarjetas por fila */
  margin: 0.5rem;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

/* Ajustes para pantallas más pequeñas */
@media (max-width: 1200px) {
  .event-card {
    flex: 1 0 30%; /* En pantallas más pequeñas, cada tarjeta comenzará con un 30% del ancho total, permitiendo hasta 3 tarjetas por fila */
  }
}

@media (max-width: 800px) {
  .event-card {
    flex: 1 0 45%; /* En pantallas aún más pequeñas, cada tarjeta comenzará con un 45% del ancho total, permitiendo 2 tarjetas por fila */
  }
}

@media (max-width: 500px) {
  .event-card {
    flex: 1 0 90%; /* En pantallas muy pequeñas, cada tarjeta comenzará con un 90% del ancho total, permitiendo 1 tarjeta por fila */
  }
}
</style>