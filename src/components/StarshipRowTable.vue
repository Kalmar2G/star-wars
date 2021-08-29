<template>
  <v-container>
    <tr class="table-row" @click="openPerson">
      <td class="table-data">{{ starship.id }}</td>
      <td class="table-data" style="font-size: 12px"> <strong>{{ starship.name }} </strong></td>
      <td class="table-data" style="font-size: 10px">{{ starship.model }}</td>
      <td class="table-data">{{ starship.max_atmosphering_speed }}</td>
      <td class="table-data">{{ starship.length }}</td>
      <td class="table-data" style="font-size: 12px">{{ starship.cost_in_credits }}</td>
    </tr>
  </v-container>
</template>

<script>
export default {
  props: {
    starship: {
      type: Object,
      required: true,
    },
  },
  methods: {
    openPerson() {
      this.$emit('openStarship', this.starship);
    },
  },
};
</script>

<style scoped>
.table-data {
  flex: 1 1 20%;
  text-align:center;
}
.table-row {
  width:100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 5px 0;
  cursor: pointer;
}
</style>
