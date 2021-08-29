<template>
  <v-dialog v-model="showAbout" max-width="600px">
    <div class="person-about-wrapper">
      <h2 class="person__name">{{ person.name }}</h2>
      <div class="person-info" v-if="loaded">
        <div class="films-list">
          <h4>FILMS:</h4>
          <ul v-if="films.length">
            <li v-for="film in films" :key="film.name">
              <span class="films-list__film-title">{{ film.title }}</span>
            </li>
          </ul>
          <span v-else>did not take part in films</span>
        </div>
        <div class="starships-list">
          <h4>STARSHIPS:</h4>
          <ul v-if="starships.length">
            <li v-for="ship in starships" :key="ship.model">
              <span class="starships-list__starship-name">{{ ship.name }}</span>
              <br>
              <span class="starships-list__starship-model">{{ ship.model }}</span>
            </li>
          </ul>
          <span v-else>did not fly the starship</span>
        </div>
      </div>
      <p class="loading-status" v-else>LOADING...</p>
      <div class="my-button-wrapper" @click="showAbout = false">
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
    person: {
      type: Object,
      required: true,
    },
    value: {
      type: Boolean,
    },
  },
  created() {
    this.showAbout = this.value;
  },
  data: () => ({
    films: [],
    starships: [],
    showAbout: false,
    loaded: false,
  }),
  watch: {
    value(newValue) {
      if (newValue) {
        this.loaded = false;
        this.fetchData();
      }
      this.showAbout = newValue;
    },
    showAbout(newValue) {
      this.$emit('input', newValue);
    },
  },
  methods: {
    async fetchData() {
      this.films = [];
      this.starships = [];
      if (this.person.films.length) {
        const promises = this.person.films.map((film) => fetch(film));
        Promise.all(promises)
          .then((responses) => Promise.all(responses.map((r) => r.json())))
          .then((responses) => {
            this.films = responses;
            this.loaded = true;
          });
      }
      if (this.person.starships.length) {
        const promises = this.person.starships.map((ship) => fetch(ship));
        Promise.all(promises)
          .then((responses) => Promise.all(responses.map((r) => r.json())))
          .then((responses) => {
            this.starships = responses;
          });
      }
    },
  },
};
</script>

<style scoped>
.person-about-wrapper {
  background: white;
  width: 600px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.person__name {
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

.person-info {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0 30px;
  height: 200px;
}

.starships-list__starship-model {
  font-size: 10px;
  line-height: 5px;
  text-shadow: none;
  vertical-align: text-top;
}

.loading-status {
  text-align: center;
  font-size: 20px;
}
</style>
