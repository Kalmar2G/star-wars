<template>
  <div class="table-wrapper">
    <table class="table">
      <thead>
      <tr class="table-header">
        <td class="table-header__item" style="align-self: center">
          <div @click="clearFilter">
            <my-button class="button clear-button"><span>Clear</span></my-button>
          </div>
        </td>
        <td class="table-header__item">
          <span>name</span>
          <input class="input" type="text" name="name" v-model="nameFilter" @input="inputAction">
        </td>
        <td class="table-header__item"><span>model</span></td>
        <td class="table-header__item"><span>speed</span></td>
        <td class="table-header__item"><span>length</span></td>
        <td class="table-header__item"><span>costs</span>
        </td>
      </tr>
      </thead>
      <tbody v-if="fetchedStarships">
      <starship-row-table class="table-row"
                          v-for="starship in swStarships"
                          :key="starship.id" :starship="starship"
                          @openStarship="openStarship">
      </starship-row-table>
      </tbody>
    </table>
    <div ref="observer"></div>
    <div class="search-status" v-if="!starshipsCount"><span>no matches found</span></div>
    <div class="search-status"
         v-if="swStarships.length === starshipsCount && swStarships.length !== 0">
      <span>all starships loaded</span>
    </div>
    <div class="search-status search-status_loading" v-if="swStarships.length < starshipsCount">
      <div class="loading-text"><span>loading...</span></div>
      <div class="load-button-wrapper" @click="fetchStarships">
        <my-button class="button load-button"><span>force load</span></my-button>
      </div>
    </div>
    <starship-about :starship="currentStarship" v-model="showAbout"></starship-about>
  </div>
</template>

<script>
import { debounce } from 'debounce';
import StarshipRowTable from '../components/starships/StarshipTableRow.vue';
import StarshipAbout from '../components/starships/StarshipAbout.vue';
import MyButton from '../components/MyButton.vue';

const baseURL = new URL('https://swapi.dev/api/starships');

export default {
  components: {
    StarshipRowTable,
    StarshipAbout,
    MyButton,
  },
  data: () => ({
    showAbout: false,
    swStarships: [],
    currentStarship: {},
    nameFilter: '',
    fetchedStarships: false,
    page: 1,
    maxPage: 4,
    starshipsCount: 1,
  }),
  mounted() {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.fetchStarships();
      }
    });
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
      baseURL.search = new URLSearchParams({
        search: this.nameFilter,
        page: `${this.page}`,
      }).toString();
      const response = await fetch(baseURL.toString());
      const data = await response.json();
      if (data.next !== null) {
        const { next } = data;
        this.page = +next.split('')
          .reverse()[0];
      } else {
        this.page = this.maxPage + 1;
      }
      this.starshipsCount = data.count;
      this.maxPage = Math.ceil(data.count / 10) || 1;
      data.results = data.results.map((ship) => ({
        ...ship,
        id: Number(ship.url.slice(32, ship.url.length - 1)),
      }));
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
    inputAction() {
      this.clearPage();
      this.swStarships = [];
      this.fetchStarships();
    },
  },
};
</script>

<style scoped>
.table-wrapper {
  width: 1000px;
  margin: 0 auto;
}

.table {
  border: 1px solid black;
  text-align: center;
  width: 100%;
}

.button.clear-button {
  min-width: 100px;
  width: 70%;
  height: 35px;
  margin-top: 3px;
}

.search-status_loading {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.loading-text {
  flex: 0 1 auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-left: auto;
}

.load-button-wrapper {
  flex: 0 1 auto;
  margin-left: auto;
}

.button.load-button {
  vertical-align: top;
  margin-top: 1px;
  min-width: 80px;
  width: 80px;
  font-size: 9px;
  height: 18px;
}

.search-status {
  height: 30px;
  background: #a3a387;
  padding-top: 5px;
  width: 100%;
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

.table-header__item {
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex: 1 1 20%;
  font-size: 20px;
}

.table-row:hover {
  border: 1px solid black;
  background: #696862;
}

.input {
  font-family: 'Bungee Inline', cursive;
  width: 70%;
  height: 20px;
  font-size: 15px;
  background: white;
  color: black;
  outline: none;
  box-sizing: border-box;
  text-align: center;
}

@media screen and (max-width: 1000px) {
  .table-wrapper {
    width: 1000px;
  }
}

@media screen and (max-width: 1200px) {
  .table-wrapper {
    width: 700px;
  }
}

@media screen and (max-width: 900px) {
  .table-wrapper {
    width: 500px;
  }

  .button.clear-button {
    height: 25px;
  }
}
</style>
