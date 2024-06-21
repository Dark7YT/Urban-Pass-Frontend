<script>
import {EventApiService} from "../services/event-api.service.js";

export default {
  name: "event-create",
  data() {
    return {
      name: null,
      description: null,
      date: null,
      venue: null,
      city: null,
      country: null,
      apiService: new EventApiService()
    }
  },
  methods: {
    async submitForm() {
      if (!this.name || !this.description || !this.date || !this.venue || !this.city || !this.country) {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'All fields must be filled out.',
          life: 5000
        });
        return;
      }

      const eventResource = {
        name: this.name,
        description: this.description,
        date: this.date,
        location: {
          venue: this.venue,
          city: this.city,
          country: this.country
        }
      };
      try {
        const response = await this.apiService.create(eventResource);
        console.log(response);
        this.$toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Event created successfully!',
          life: 5000
        });
        this.$router.push('/eventManagement/event');
      } catch (error) {
        console.error(error);
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Event creation failed. Please try again.',
          life: 5000
        });
      }

      // Limpiar los campos del formulario
      this.name = null;
      this.description = null;
      this.date = null;
      this.venue = null;
      this.city = null;
      this.country = null;
    }
  }
}
</script>

<template>
  <div class="event-create-container">
    <h1 class="text-2xl font-semibold mb-4">Create Event</h1>
    <div class="input-container">
      <div class="input-row">
        <pv-float-label class="event-create-element">
          <pv-input-text id="name" class="event-create-text" v-model="name" />
          <label for="name">Name</label>
        </pv-float-label>
        <pv-float-label class="event-create-element">
          <pv-input-text id="description" class="event-create-text" v-model="description" />
          <label for="description">Description</label>
        </pv-float-label>
      </div>
      <div class="input-row">
        <pv-float-label class="event-create-element">
          <pv-input-text id="date" class="event-create-text" v-model="date" />
          <label for="date">Date</label>
        </pv-float-label>
        <pv-float-label class="event-create-element">
          <pv-input-text id="venue" class="event-create-text" v-model="venue" />
          <label for="venue">Venue</label>
        </pv-float-label>
      </div>
      <div class="input-row">
        <pv-float-label class="event-create-element">
          <pv-input-text id="city" class="event-create-text" v-model="city" />
          <label for="city">City</label>
        </pv-float-label>
        <pv-float-label class="event-create-element">
          <pv-input-text id="country" class="event-create-text" v-model="country" />
          <label for="country">Country</label>
        </pv-float-label>
      </div>
    </div>
    <pv-button class="event-create-button" @click="submitForm">Create Event</pv-button>
  </div>
</template>

<style scoped>
.event-create-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px; /* Agrega un margen en la parte inferior */
}
.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.input-row {
  display: flex;
  justify-content: space-between;
  width: 40%;
}
.event-create-element {
  margin: 10px 0;

}
.event-create-text {
  width: 300px !important;
}
.event-create-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  width: 300px !important;
}
</style>