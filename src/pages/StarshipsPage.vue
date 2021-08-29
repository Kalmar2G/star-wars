<template>
  <v-container>
    <table class="table">
      <thead>
      <tr class="table-header">
        <td class="header__item" style="align-self: center">
          <button class="my-btn" @click="clearFilter">
            Clear
          </button>
        </td>
        <td class="header__item">name
          <input type="text" name="name"
                 v-model="nameFilter" @input="clearPage(); swStarships = []; fetchStarships();">
        </td>
        <td class="header__item">model
        </td>
        <td class="header__item">speed</td>
        <td class="header__item">length</td>
        <td class="header__item">costs
        </td>
      </tr>
      </thead>
      <tbody v-if="fetchedStarships">
      <starship-row-table class="table-row" v-for="starship in swStarships"
                          :key="starship.id" :starship="starship" @openStarship="openStarship">
      </starship-row-table>
      </tbody>
    </table>
    <div ref="observer"></div>
    <div class="observer" v-if="!starshipsCount">no matches found</div>
    <div class="observer" v-if="swStarships.length === starshipsCount && swStarships.length !== 0">
      all starships loaded
    </div>
    <div class="observer loader" v-if="swStarships.length < starshipsCount">
      <div class="center">loading...</div>
      <button class="my-btn force-load" @click="fetchStarships">force load</button>
    </div>
    <starship-about :starship="currentStarship" v-model="showAbout"></starship-about>
  </v-container>
</template>

<script>
import { debounce } from 'debounce';
import StarshipRowTable from '../components/starships/StarshipTableRow.vue';
import StarshipAbout from '../components/starships/StarshipAbout.vue';

export default {
  components: {
    StarshipRowTable,
    StarshipAbout,
  },
  data: () => ({
    showAbout: false,
    baseURL: new URL('https://swapi.dev/api/starships?search='),
    swStarships: [],
    currentStarship: {},
    nameFilter: '',
    fetchedStarships: false,
    page: 1,
    maxPage: 4,
    starshipsCount: 1,
  }),
  mounted() {
    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    };
    const callback = (entries) => {
      if (entries[0].isIntersecting) {
        this.fetchStarships();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
  methods: {
    clearPage() {
      this.page = 1;
    },
    fetchStarships: debounce(async function () {
      this.fetchedStarships = true;
      if (this.page > this.maxPage) {
        return;
      }
      const response = await fetch(`${this.baseURL}${this.nameFilter}&page=${this.page}`);
      const data = await response.json();
      if (data.next !== null) {
        const { next } = data;
        // eslint-disable-next-line prefer-destructuring
        this.page = +next.split('')
          .reverse()[0];
      } else {
        this.page = this.maxPage + 1;
      }
      this.starshipsCount = data.count;
      this.maxPage = Math.ceil(data.count / 10) || 1;
      data.results.forEach((ship) => {
        /* eslint-disable-next-line */
        ship.id = Number(ship.url.slice(32, ship.url.length - 1));
      });
      if (this.page === 1) {
        this.swStarships = [...data.results];
      } else {
        this.swStarships = [...this.swStarships, ...data.results];
      }
    }, 500),
    clearFilter() {
      this.nameFilter = '';
      this.swStarships = [];
      this.page = 1;
      this.maxPage = 4;
      this.starshipsCount = 1;
      this.fetchStarships();
    },
    openStarship(starship) {
      this.currentStarship = starship;
      this.showAbout = true;
    },
  },
};
</script>

<style scoped>
.my-btn {
  border: 2px solid #ebe302;
  font-size: 15px;
  width: 70%;
  min-width: 100px;
  height: 35px;
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

.loader {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.center {
  flex: 0 1 auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-left: auto;

}

.force-load {
  width: 100px;
  font-size: 9px;
  height: 18px;
  flex: 0 1 auto;
  margin-left: auto;
}

.observer {
  height: 30px;
  background: #a3a387;
  padding-top: 5px;
}

.table {
  width: 100%;
  border: 1px solid black;
  text-align: center;
}

.table-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: #24241f;
  padding: 5px 0;
  align-items: flex-start;
  text-align: center;
}

.table-row:nth-of-type(odd) {
  background: #eff0da;
}

.table-row:nth-of-type(even) {
  background: #fcfca2;
}

.header__item {
  flex: 1 1 20%;
}

.header__item {
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  font-size: 20px;
}

.table-row:hover {
  border: 1px solid black;
  background: #696862;
}

input {
  width: 70%;
  height: 20px;
  font-size: 15px;
  background: white;
  color: black;
  outline: none;
  box-sizing: border-box;
  text-align: center;
}

select {
  width: 70%;
  height: 20px;
  font-size: 15px;
  background: white;
  color: black;
  outline: none;
  text-align-last: center;
}
</style>
