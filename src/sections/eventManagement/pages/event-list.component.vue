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
            console.log(this.events.find(event => event.id === this.id));
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
              <router-link
                      class="router-link"
                      v-for="event in events"
                      :key="event.id"
                      :to="'/event/' + event._id">
              <event-card-component
                      class="event-card"
                      :event="event"
              ></event-card-component>
              </router-link>
          </div>
      </div>
    </div>
  </div>
  <event-create></event-create>
</template>

<style scoped>
.router-link {
    all: unset;
    cursor: pointer;
}
.container{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center; /* Los elementos se alinearán al centro del contenedor */
}
.event-card {
    flex: 0 0 20%; /* Las tarjetas no crecerán más allá de su base de 25% */
    margin: 0.5rem;
    margin-bottom: 2rem;
    height: 38rem;
}
/deep/ .p-card-header{
    height: 30%;
    overflow: hidden;
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