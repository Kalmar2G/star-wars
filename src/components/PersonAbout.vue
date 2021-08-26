<template>
  <v-dialog v-model="showAbout" max-width="600px">
    <div class="person-about-wrapper">
      <h2 class="name">{{ person.name }}</h2>
      <div class="person-about">
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
      <button class="my-btn" @click="showAbout = false">
        close
      </button>
    </div>
  </v-dialog>
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
  }),
  watch: {
    value(newValue) {
      if (newValue) {
        this.fetchFilms();
        this.fetchStarships();
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
      if (this.person.films.length) {
        this.person.films.map(async (film) => {
          const response = await fetch(film);
          const data = await response.json();
          this.films.push(data);
        });
      }
    },
    async fetchStarships() {
      this.starships = [];
      if (this.person.starships.length) {
        this.person.starships.map(async (ship) => {
          const response = await fetch(ship);
          const data = await response.json();
          this.starships.push(data);
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

  .person-about {
    display: flex;
    justify-content: space-between;
    margin: 20px 30px;
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
</style>
