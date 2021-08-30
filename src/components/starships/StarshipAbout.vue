<template>
  <v-dialog :value="value" max-width="600px" @click:outside="closeAbout">
    <div class="starship-about-wrapper">
      <h2 class="starship__name">{{ starship.name }}</h2>
      <div class="starship-info" v-if="loaded">
        <div class="films-list">
          <h4>FILMS:</h4>
          <ul v-if="films.length">
            <li v-for="film in films" :key="film.name">
              <span class="films-list__film-title">{{ film.title }}</span>
            </li>
          </ul>
          <span v-else>did not use in films</span>
        </div>
        <div class="pilots-list">
          <h4>PILOTS:</h4>
          <ul v-if="pilots.length">
            <li v-for="pilot in pilots" :key="pilot.name">
              <span class="pilots-list__pilot-name">{{ pilot.name }}</span>
            </li>
          </ul>
          <span v-else>the starship did not use</span>
        </div>
      </div>
      <p class="loading-status" v-else>LOADING...</p>
      <div class="my-button-wrapper" @click="closeAbout">
        <my-button class="button close-button">close</my-button>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import MyButton from '../MyButton.vue';

export default {
  components: {
    MyButton,
  },
  props: {
    starship: {
      type: Object,
      required: true,
    },
    value: {
      type: Boolean,
    },
  },
  data: () => ({
    films: [],
    pilots: [],
    loaded: false,
  }),
  watch: {
    value(newValue) {
      if (newValue) {
        this.loaded = false;
        this.fetchData();
      }
    },
  },
  methods: {
    closeAbout() {
      this.$emit('input', false);
    },
    async fetchData() {
      this.films = [];
      this.pilots = [];
      if (this.starship.films.length) {
        const promises = this.starship.films.map((film) => fetch(film));
        Promise.all(promises)
          .then((responses) => Promise.all(responses.map((r) => r.json())))
          .then((responses) => {
            this.films = responses;
            this.loaded = true;
          });
      }
      if (this.starship.pilots.length) {
        const promises = this.starship.pilots.map((pilot) => fetch(pilot));
        Promise.all(promises)
          .then((responses) => Promise.all(responses.map((r) => r.json())))
          .then((responses) => {
            this.pilots = responses;
          });
      }
    },
  },
};
</script>

<style scoped>
.starship-about-wrapper {
  background: white;
  width: 600px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.starship__name {
  text-align: center;
  padding-top: 5px;
}

.my-button-wrapper {
  align-self: center;
}

.button.close-button {
  margin-bottom: 10px;
  width: 10%;
  min-width: 100px;
  height: 25px;
}

.starship-info {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0 30px;
  height: 200px;
}

.loading-status {
  text-align: center;
  font-size: 20px;
}
</style>
