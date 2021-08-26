<template>
  <v-container>
      <div class="nav">
        <router-link to="/">
          <button class="my-btn">Main
          </button>
        </router-link>
        <router-link to="/characters">
          <button class="my-btn">Characters
          </button>
        </router-link>
        <router-link to="/starships">
          <button class="my-btn">Starships</button>
        </router-link>

      </div>
  </v-container>
</template>

<script>
export default {

};
</script>

<style scoped>
  v-container {
    margin: 0 auto;
  }

  .nav{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100px;
    width: 100%;
  }

  .my-btn {
    border: 2px solid #ebe302;
    font-size: 15px;
    min-width: 150px;
    height: 50px;
    margin-top: 3px;
    border-radius: 10px;
    background: black;
    color: black;
    cursor: pointer;
  }

  .my-btn:hover {
    border: 3px solid black;
    background: #ebe302;
    transition: background 300ms linear;
  }

</style>
