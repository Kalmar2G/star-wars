<template>
  <v-dialog v-model="showAbout" max-width="600px">
    <div class="starship-about-wrapper">
      <h2 class="starship-name">{{ starship.name }}</h2>
      <div class="starship-info" v-if="loaded">
        <div class="starship-films-list">
          <h4>
            FILMS:
          </h4>
          <ul v-if="films.length">
            <li v-for="film in films" :key="film.name">
              <span class="starship-films-list__film-title">{{ film.title }}</span>
            </li>
          </ul>
          <span v-else>did not use in films</span>
        </div>
        <div class="starship-pilots-list">
          <h4>
            PILOTS:
          </h4>
          <ul v-if="pilots.length">
            <li v-for="pilot in pilots" :key="pilot.name">
              <span class="starship-pilots-list__pilot-name">{{ pilot.name }}</span>
            </li>
          </ul>
          <span v-else>the starship did not use</span>
        </div>
      </div>
      <p class="loading-status" v-else>
        LOADING...
      </p>
      <button class="my-btn" @click="showAbout = false">
        close
      </button>
    </div>
  </v-dialog>
</template>

<script>
export default {
  props: {
    starship: {
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
    pilots: [],
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

.starship-name {
  text-align: center;
  padding-top: 5px;
}

.my-btn {
  align-self: center;
  border: 2px solid #ebe302;
  font-size: 15px;
  width: 10%;
  min-width: 100px;
  height: 25px;
  margin-bottom: 10px;
  border-radius: 10px;
  background: black;
  cursor: pointer;
}

.my-btn:hover {
  border: 3px solid black;
  background: #ebe302;
  transition: background 300ms linear;
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

.starship-pilots-list__pilot-name {
  line-height: 10px;
}
</style>
