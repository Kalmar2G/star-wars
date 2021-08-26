<template>
  <v-container>
    <table class="table" v-if="fetched">
      <thead>
      <tr class="table-header">
        <td class="header__item">
          <button class="my-btn" @click="clearFilter">
            Clear
          </button>
        </td>
        <td class="header__item">name
          <input type="text" name="name"
                 v-model="nameFilter" @input="clearPage(); fetchPeople();">
        </td>
        <td class="header__item">gender
          <select v-model="selectedGender" @change="filtration">
            <option disabled value=""></option>
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
            <option disabled value=""></option>
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
      <tbody v-if="swPeopleFiltered.length">
        <row-table class="table-row" v-for="person in swPeopleFiltered"
                   :key="person.id" :person="person" @openPerson="openPerson">
        </row-table>
      </tbody>
      <div class="observer" v-else>no matches found</div>
    </table>
    <div ref="observer"></div>
    <div class="observer" v-if="page === 10">ALL CHARACTERS LOADED</div>
    <person-about :person="currentPerson" v-model="showAbout"/>
  </v-container>
</template>

<script>
import RowTable from '../components/CharacterRowTable.vue';
import PersonAbout from '../components/PersonAbout.vue';

export default {
  components: {
    RowTable, PersonAbout,
  },
  data: () => ({
    showAbout: false,
    baseURL: new URL('https://swapi.dev/api/people?search='),
    swPeople: [],
    swPeopleFiltered: [],
    currentPerson: {},
    personId: 0,
    nameFilter: '',
    selectedGender: '',
    selectedEyeColor: '',
    fetched: false,
    page: 1,
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
    async fetchPeople() {
      this.fetched = true;
      if (this.page > 9) {
        return;
      }
      const response = await fetch(`${this.baseURL}${this.nameFilter}&page=${this.nameFilter ? '' : this.page}`);
      const data = await response.json();
      data.results.forEach((person) => {
        /* eslint-disable-next-line */
        person.id = this.personId += 1;
      });
      if (this.nameFilter) {
        this.personId = 0;
        this.page = 1;
        this.swPeople = [...data.results];
      } else {
        if (this.page === 1) {
          this.swPeople = [...data.results];
        } else {
          this.swPeople = [...this.swPeople, ...data.results];
        }
        this.page += 1;
      }
      this.swPeopleFiltered = [...this.swPeople];
      this.filtration();
    },
    filtration() {
      let filteredPeople = [...this.swPeople];
      if (this.selectedGender) {
        filteredPeople = filteredPeople.filter((person) => person.gender === this.selectedGender);
      }

      if (this.selectedEyeColor) {
        filteredPeople = filteredPeople
          .filter((person) => person.eye_color === this.selectedEyeColor);
      }
      this.swPeopleFiltered = filteredPeople;
    },
    clearFilter() {
      this.selectedEyeColor = '';
      this.selectedGender = '';
      this.nameFilter = '';
      this.swPeopleFiltered = [];
      this.swPeople = [];
      this.page = 1;
      this.personId = 0;
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

  .observer {
    height: 30px;
    background: #a3a387;
    padding-top: 5px;
  }
  .table {
    width:100%;
    border:1px solid black;
    text-align: center;
  }

  .table-header {
    display:flex;
    justify-content: space-between;
    width:100%;
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
    text-transform:uppercase;
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
