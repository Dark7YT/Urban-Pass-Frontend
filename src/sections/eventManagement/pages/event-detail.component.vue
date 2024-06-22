<script>
import {EventApiService} from "../services/event-api.service.js";
import {Event} from "../model/event.entity.js"; // Importar la clase Event
import { ReviewApiService } from "../services/review-api.service.js";
import reviewCardComponent from "../components/review-card.component.vue";


export default {
    name: "event-detail",
    components:{reviewCardComponent},
    props: ['id'],
    data() {
        return {
            event: null,
            eventsService: null,
            eventEntity: null, // Inicializar eventEntity como una nueva instancia de Event
            rating: null,
            comment: null,
            reviewService: new ReviewApiService(),
            reviews: []
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
      let user = JSON.parse(localStorage.getItem('user'));
      let userId = user._id;

      this.reviewService = new ReviewApiService();
      this.fetchReview();
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
    },
    methods: {
      fetchReview() {
        this.reviewService.getAllReviews()
            .then(response => {
                this.reviews = response.data;
              this.reviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            })
            .catch(e => {
                console.log(e);
            });
      },

      async submitReview() {
        if (!this.rating || !this.comment) {
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'All fields must be filled out.',
            life: 5000
          });
          return;
        }

        const reviewResource = {
          rating: this.rating,
          comment: this.comment
        };

        let user = JSON.parse(localStorage.getItem('user'));
        let userId = user._id;
        console.log('el user id es '+ userId);
        console.log(reviewResource);

        try {
          const response = await this.reviewService.create(reviewResource, this.id, userId);
          console.log(response);
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Review created successfully!',
            life: 5000
          });
          this.$emit('reviewCreated');
        }
        catch (error) {
          console.error(error);
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while creating the review.',
            life: 5000
          });
        }
        this.rating = null;
        this.comment = null;
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
                    <p class="text">Country: {{ event.maxTickets }}</p>
                    <p class="text">Country: {{ event.soldTickets }}</p>
                </div>
                <img class = "event-image" alt="Event Image" :src="imageUrl" />
            </div>
        </div>
        <div class="container-review">
            <h1 class="title">Reviews</h1>
            <div class="column">
                <div class="input-row">
                    <pv-float-label class="event-create-element">
                        <pv-rating id="value" v-model="rating" />
                    </pv-float-label>
                    <pv-float-label class="event-create-element">
                      <pv-textarea class="half-screen-textarea" v-model="comment" auto-resize="true" cols="100"></pv-textarea>
                        <label for="comment">Comment</label>
                    </pv-float-label>
                </div>
                <div class="input-row">
                    <pv-button class="event-create-element" @click="submitReview">Submit Review</pv-button>
                </div>
            </div>
        </div>
      <h1 class="comment-title">Comments</h1>
      <div class="reviews-container">
        <review-card-component
            v-for="review in reviews"
            :key="review.id"
            :review="review">
        </review-card-component>
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
.container-review{
    margin-left: 10rem;
}
.reviews-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 10rem;
}
.comment-title{
    margin-left: 10rem;
    font-size: 2em;
}
</style>