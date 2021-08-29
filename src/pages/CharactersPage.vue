<template>
  <v-container>
    <table class="table">
      <thead>
      <tr class="table-header">
        <td class="header__item">
          <button class="my-btn" @click="clearFilter">
            Clear
          </button>
        </td>
        <td class="header__item">name
          <input type="text" name="name"
                 v-model="nameFilter"
                 @input="clearPage(); swPeople = []; fetchPeople();">
        </td>
        <td class="header__item">gender
          <select v-model="selectedGender" @change="filtration">
            <option value=""></option>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="n/a">n/a</option>
            <option value="hermaphrodite">hermaphrodite</option>
          </select>
        </td>
        <td class="header__item" style="align-self: flex-start;">height</td>
        <td class="header__item" style="align-self: flex-start;">mass</td>
        <td class="header__item">eye
          <select v-model="selectedEyeColor" @change="filtration">
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
      <tbody v-if="fetchedCharacters">
      <character-row-table class="table-row" v-for="person in swPeopleFiltered"
                           :key="person.id" :person="person" @openPerson="openPerson">
      </character-row-table>
      </tbody>
    </table>
    <div ref="observer"></div>
    <div class="observer" v-if="!charactersFilteredCount">no matches found</div>
    <div class="observer"
         v-if="swPeople.length === charactersCount && swPeople.length !== 0">
      all characters loaded
    </div>
    <div class="observer loader" v-if="swPeople.length < charactersCount">
      <div class="center">loading...</div>
      <button class="my-btn force-load" @click="fetchPeople">force load</button>
    </div>
    <person-about :person="currentPerson" v-model="showAbout"/>
  </v-container>
</template>

<script>
import { debounce } from 'debounce';
import PersonAbout from '../components/characters/CharacterAbout.vue';
import CharacterRowTable from '../components/characters/CharacterTableRow.vue';

export default {
  components: {
    CharacterRowTable,
    PersonAbout,
  },
  data: () => ({
    showAbout: false,
    baseURL: new URL('https://swapi.dev/api/people?search='),
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
    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    };
    const callback = (entries) => {
      if (entries[0].isIntersecting) {
        this.fetchPeople();
      }
    };
    const observer = new IntersectionObserver(callback, options);
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
      this.charactersCount = data.count;
      this.maxPage = Math.ceil(data.count / 10) || 1;
      data.results.forEach((person) => {
        /* eslint-disable-next-line */
        person.id = Number(person.url.slice(29, person.url.length - 1));
      });
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
