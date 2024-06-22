<script>
import { Review } from "../model/review.entity.js";
import {UserApiService} from "../services/user-api.service.js";
import {ReviewApiService} from "../services/review-api.service.js";

export default {
  name: "review-card",
  props: {
    review: Review,
  },
  data() {
    return {
      title: "Reviews",
      user: [],
      userService: null,
      reviewService: null,
      isClicked: false,
      reaction: []
    }
  },
  created() {
    this.userService = new UserApiService();
    this.reviewService = new ReviewApiService();
    this.fetchReviews();
    let user = JSON.parse(localStorage.getItem('user'));
    let userId = user._id;
    if (this.review.reaction.userIdList.includes(userId)) {
      this.isClicked = true;
    }
  },
  methods: {
    fetchReviews() {
      this.userService.getUserById(this.review.userId)
          .then(response => {
            this.user = response.data;
            console.log(this.user);
          })
          .catch(e => {
            console.log(e);
          });
    },
    toggleLike() {
      this.isClicked = !this.isClicked;
      let user = JSON.parse(localStorage.getItem('user'));
      let userId = user._id;
      console.log('el user id es ' + userId);
      console.log('el review id es ' + this.review._id);

      if (!this.isClicked) {
        this.reviewService.deleteReactions(this.review._id, userId)
            .then(response => {
              console.log(response.data);
              this.reaction.pop(userId);
            })
            .catch(e => {
              console.log(e);
            });
      } else {
        this.reviewService.createReactions(this.review._id, userId)
            .then(response => {
              console.log(response.data);
              this.reaction.push(userId);
            })
            .catch(e => {
              console.log(e);
            });
      }
    }
  }
}
</script>

<template>
  <div>
    <div class="container">
      <div class="column">
          <div class="card-container">
              <pv-card class= "card" style="width: 51rem; overflow: hidden">
                  <template #title>{{ user.username }}</template>
                  <template #subtitle>{{ review.comment }}</template>
                  <template #content>
                    <pv-rating v-model="review.rating" readonly :cancel="false" />
                  </template>
                  <template #footer>
                      <button class="like-button" @click="toggleLike" :class="{ clicked: isClicked }">Like</button>
                  </template>
              </pv-card>
          </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card{
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border-radius: 10px;
    transition: transform 0.3s;
}
.card-text {
    font-size: 1rem;
}
.container{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.card-container {
    margin-top: 1rem;
}
.like-button {
  background-color: #ccc;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

.like-button.clicked {
  background-color: #ff0000;
  color: #fff;
}
</style>