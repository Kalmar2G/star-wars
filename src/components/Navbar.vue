<template>
  <v-container class="wrapper">
    <div class="navigation">
      <router-link to="/">
        <my-button>Main
        </my-button>
      </router-link>
      <router-link to="/characters">
        <my-button>Characters
        </my-button>
      </router-link>
      <router-link to="/starships">
        <my-button>Starships</my-button>
      </router-link>
    </div>
  </v-container>
</template>

<script>
import MyButton from './MyButton.vue';

export default {
  components: {
    MyButton,
  },
};
</script>

<style scoped>
.wrapper {
  margin: 0 auto;
}

.navigation {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100px;
  width: 100%;
}
</style>
