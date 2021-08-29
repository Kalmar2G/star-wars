<template>
  <div class="dialog">
  <v-dialog v-model="showAbout" max-width="600px">
    <div class="person-about-wrapper">
      <h2 class="name">{{ person.name }}</h2>
      <div class="person-about">
        <div class="person-info" v-if="loaded">
          <div class="films-list">
          <h4>
            FILMS:
          </h4>
          <ul v-if="films.length">
            <li v-for="film in films" :key="film.name">
              {{ film.title }}
            </li>
          </ul>
            <span v-else>did not take part in films</span>
          </div>
          <div class="spaceships-list">
            <h4>
              STARSHIPS:
            </h4>
            <ul v-if="starships.length">
              <li v-for="ship in starships" :key="ship.model">
                <span class="starship-name">{{ ship.name }}</span>
                <br>
                <span class="starship-model">{{ ship.model }}</span>
              </li>
            </ul>
            <span v-else >did not fly the starship</span>
          </div>
        </div>
        <p class="loading-info" v-else>
          LOADING...
        </p>
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
          .then((responses) => { this.films = responses; this.loaded = true; });
      }
      if (this.person.starships.length) {
        const promises = this.person.starships.map((ship) => fetch(ship));
        Promise.all(promises)
          .then((responses) => Promise.all(responses.map((r) => r.json())))
          .then((responses) => { this.starships = responses; });
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

  .person-info {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin: 0 30px;
    height: 200px;
  }

  .starship-name{
    line-height: 10px;
  }

  .starship-model{
    font-size: 10px;
    line-height: 5px;
    text-shadow: none;
    vertical-align: text-top;
  }

  .loading-info {
    text-align: center;
    font-size: 20px;
  }
</style>
