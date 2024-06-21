<script>
import { Event } from "../model/event.entity.js";

export default {
    name: "event-card",
    props: {
        event: Event,
    },
    computed: {
        imageUrl() {
            // Verificar si la imagen existe
            if (this.event.image) {
                return `data:image/jpeg;base64,${this.event.image}`;
            } else {
                // Proveer una imagen por defecto o manejar el caso cuando no hay imagen
                return 'path/to/default-image.jpg'; // Cambia esto a la ruta de tu imagen por defecto
            }
        }
    }
}
</script>
<template>
    <pv-card class= "card" style="width: 25rem; overflow: hidden">
        <template class = "event-image-container" #header>
            <img class = "event-image" alt="Event Image" :src="imageUrl" />
        </template>
        <template #title>{{ event.name }}</template>
        <template #subtitle>Description: {{event.description}}<br><br>Date: {{ event.date }}</template>
        <template #content>
            <p class="card-text">Country: {{ event.location.country }}</p>
            <p class="card-text">City: {{ event.location.city }}</p>
            <p class="card-text">Venue: {{ event.location.venue }}</p>
        </template>
        <template #footer>
            <p>Tickets: {{ event.maxTickets }}</p>
            <p>Sold Tickets: {{ event.soldTickets }}</p>
        </template>
    </pv-card>
</template>

<style scoped>
.card{
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border-radius: 10px;
    transition: transform 0.3s;
}
.card:hover {
    box-shadow: 0 8px 8px 0 rgba(0,0,0,0.2);
    transform: scale(1.05);
    transition: transform 0.3s;
}
.card-text {
    font-size: 1rem;
}
.event-image-container{
    height: 50%;
    overflow: hidden;
}
.event-image {
    width: 100%;
    height: auto;
    object-fit: contain;
}
</style>
