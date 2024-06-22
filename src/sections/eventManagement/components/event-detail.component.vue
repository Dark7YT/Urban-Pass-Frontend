<script>
import {EventApiService} from "../services/event-api.service.js";
import {Event} from "../model/event.entity.js"; // Importar la clase Event

export default {
    name: "event-detail.component",
    props: ['id'],
    data() {
        return {
            event: null,
            eventsService: null,
            eventEntity: null, // Inicializar eventEntity como una nueva instancia de Event
        }
    },
    created() {
        this.eventsService = new EventApiService();
        this.eventsService.getEventById(this.id)
            .then(response => {
                this.event = response.data;
                console.log(this.id)
                console.log(this.event.name);
            })
            .catch(e => {
                console.log(e);
            });
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
    <div>
        <div class="container">
            <h1 class="title">Event Detail</h1>
            <div class="column flex-container">
                <div class="event-container">
                    <h5 class="title">Event Name: {{ event.name }}</h5>
                    <p class="text">Description: {{ event.description }}</p>
                    <p class="text">Date: {{ event.date }}</p>
                    <p class="text">Venue: {{ event.location.venue }}</p>
                    <p class="text">City: {{ event.location.city }}</p>
                    <p class="text">Country: {{ event.location.country }}</p>
                </div>
                <img class = "event-image" alt="Event Image" :src="imageUrl" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.flex-container {
    display: flex;
    justify-content: space-between;
}

.event-container {
    margin-left: 10rem;
    flex: 1;
    margin-right: 20px;
}

.title {
    font-size: 2em; /* Aumenta el tamaño de la fuente del título */
}

.event-image {
    width: 500px; /* Ancho fijo */
    height: 500px; /* Alto fijo */
    object-fit: cover; /* Asegura que la imagen cubra el espacio disponible sin distorsionarse */
    margin-right: 10rem; /* Agrega un margen a la derecha de la imagen */
}
</style>