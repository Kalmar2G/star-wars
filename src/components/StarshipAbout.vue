<template>
  <div class="dialog">
  <v-dialog v-model="showAbout" max-width="600px">
    <div class="starship-about-wrapper">
      <h2 class="name">{{ starship.name }}</h2>
      <div class="starship-about">
        <div class="films-list">
          <h4>
            FILMS:
          </h4>
          <ul v-if="films.length">
            <li v-for="film in films" :key="film.name">
              {{ film.title }}
            </li>
          </ul>
          <span v-else>did not use in films</span>
        </div>
        <div class="pilots-list">
          <h4>
            PILOTS:
          </h4>
          <ul v-if="pilots.length">
            <li v-for="pilot in pilots" :key="pilot.name">
              <span class="pilot-name">{{ pilot.name }}</span>
            </li>
          </ul>
          <span v-else>the starship did not use</span>
        </div>
      </div>
      <button class="my-btn" @click="showAbout = false">
        close
      </button>
    </div>
  </v-dialog>
  </div>
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
  }),
  watch: {
    value(newValue) {
      if (newValue) {
        this.fetchFilms();
        this.fetchSPilots();
      }
      this.showAbout = newValue;
    },
    showAbout(newValue) {
      this.$emit('input', newValue);
    },
  },
  methods: {
    async fetchFilms() {
      this.films = [];
      if (this.starship.films.length) {
        this.starship.films.map(async (film) => {
          const response = await fetch(film);
          const data = await response.json();
          this.films.push(data);
        });
      }
    },
    async fetchSPilots() {
      this.pilots = [];
      if (this.starship.pilots.length) {
        this.starship.pilots.map(async (pilot) => {
          const response = await fetch(pilot);
          const data = await response.json();
          this.pilots.push(data);
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
  justify-content: space-around;
}

.name {
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
  margin-top: 3px;
  border-radius: 10px;
  background: black;
  cursor: pointer;
}

.my-btn:hover {
  border: 3px solid black;
  background: #ebe302;
  transition: background 300ms linear;
}

.starship-about {
  display: flex;
  justify-content: space-between;
  margin: 20px 30px;
}

.pilot-name {
  line-height: 10px;
}
</style>
