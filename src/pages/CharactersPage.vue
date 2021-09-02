<template>
  <div class="table-wrapper">
    <table class="table">
      <thead>
      <tr class="table-header">
        <td class="table-header__item">
          <div @click="clearFilter">
            <my-button class="button clear-button"><span>Clear</span></my-button>
          </div>
        </td>
        <td class="table-header__item"><span>name</span>
          <input class="input" type="text" name="name" v-model="nameFilter" @input="inputAction">
        </td>
        <td class="table-header__item"><span>gender</span>
          <select class="select" v-model="selectedGender" @change="filtration">
            <option value=""></option>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="n/a">n/a</option>
            <option value="hermaphrodite">hermaphrodite</option>
          </select>
        </td>
        <td class="table-header__item" style="align-self: flex-start;"><span>height</span></td>
        <td class="table-header__item" style="align-self: flex-start;"><span>mass</span></td>
        <td class="table-header__item"><span>eye</span>
          <select class="select" v-model="selectedEyeColor" @change="filtration">
            <option value=""></option>
            <option value="blue">blue</option>
            <option value="yellow">yellow</option>
            <option value="red">red</option>
            <option value="brown">brown</option>
            <option value="black">black</option>
            <option value="orange">orange</option>
            <option value="hazel">hazel</option>
            <option value="blue-gray">blue-gray</option>
            <option value="pink">pink</option>
            <option value="white">white</option>
            <option value="unknown">unknown</option>
          </select>
        </td>
      </tr>
      </thead>
      <tbody class="table-body" v-if="fetchedCharacters">
      <character-row-table class="table-row"
                           v-for="person in swPeopleFiltered"
                           :key="person.id" :person="person"
                           @openPerson="openPerson">
      </character-row-table>
      </tbody>
    </table>
    <div ref="observer"></div>
    <div class="search-status" v-if="!charactersFilteredCount"><span>no matches found</span></div>
    <div class="search-status"
         v-if="swPeople.length === charactersCount && swPeople.length !== 0">
      <span>all characters loaded</span>
    </div>
    <div class="search-status search-status_loading" v-if="swPeople.length < charactersCount">
      <div class="loading-text"><span>loading...</span></div>
      <div class="load-button-wrapper" @click="fetchPeople">
        <my-button class="button load-button"><span>force load</span></my-button>
      </div>
    </div>
    <person-about :person="currentPerson" v-model="showAbout"/>
  </div>
</template>

<script>
import { debounce } from 'debounce';
import PersonAbout from '../components/characters/CharacterAbout.vue';
import CharacterRowTable from '../components/characters/CharacterTableRow.vue';
import MyButton from '../components/MyButton.vue';

const baseURL = new URL('https://swapi.dev/api/people');

export default {
  components: {
    CharacterRowTable,
    PersonAbout,
    MyButton,
  },
  data: () => ({
    showAbout: false,
    swPeople: [],
    swPeopleFiltered: [],
    currentPerson: {},
    nameFilter: '',
    selectedGender: '',
    selectedEyeColor: '',
    fetchedCharacters: false,
    page: 1,
    maxPage: 9,
    charactersCount: 1,
    charactersFilteredCount: 1,
  }),
  mounted() {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.fetchPeople();
      }
    }, {
      threshold: 1.0,
    });
    observer.observe(this.$refs.observer);
  },
  methods: {
    clearPage() {
      this.page = 1;
    },
    fetchPeople: debounce(async function () {
      this.fetchedCharacters = true;
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
      this.charactersCount = data.count;
      this.maxPage = Math.ceil(data.count / 10) || 1;
      data.results = data.results.map((person) => ({
        ...person,
        id: Number(person.url.slice(29, person.url.length - 1)),
      }));
      if (this.page === 1) {
        this.swPeople = [...data.results];
      } else {
        this.swPeople = [...this.swPeople, ...data.results];
      }
      this.swPeopleFiltered = [...this.swPeople];
      this.filtration();
    }, 500),
    filtration() {
      let filteredPeople = [...this.swPeople];
      if (this.selectedGender) {
        filteredPeople = filteredPeople.filter((person) => person.gender === this.selectedGender);
      }

      if (this.selectedEyeColor) {
        filteredPeople = filteredPeople
          .filter((person) => person.eye_color === this.selectedEyeColor);
      }
      this.charactersFilteredCount = filteredPeople.length;
      this.swPeopleFiltered = filteredPeople;
    },
    clearFilter() {
      this.selectedEyeColor = '';
      this.selectedGender = '';
      this.nameFilter = '';
      this.swPeopleFiltered = [];
      this.swPeople = [];
      this.page = 1;
      this.maxPage = 10;
      this.charactersCount = 1;
      this.charactersFilteredCount = 1;
      this.fetchPeople();
    },
    openPerson(person) {
      this.currentPerson = person;
      this.showAbout = true;
    },
    inputAction() {
      this.clearPage();
      this.swPeople = [];
      this.fetchPeople();
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

.search-status_loading {
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
}

.table-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: #24241f;
  padding: 5px 0;
  text-align: center;
}

.table-body {
  width: 100%;
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

.select {
  font-family: 'Bungee Inline', cursive;
  width: 70%;
  height: 20px;
  font-size: 15px;
  background: white;
  color: black;
  outline: none;
  text-align-last: center;
}

@media screen and (max-width: 2000px) {
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
