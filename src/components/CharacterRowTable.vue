<template>
  <v-container>
    <tr class="table-row" @click="openPerson">
      <td class="table-data">{{ person.id }}</td>
      <td class="table-data"> <strong>{{ person.name }} </strong></td>
      <td class="table-data">{{ person.gender }}</td>
      <td class="table-data">{{ person.height }}</td>
      <td class="table-data">{{ person.mass }}</td>
      <td class="table-data">{{ person.eye_color }}</td>
    </tr>
  </v-container>
</template>

<script>
export default {
  props: {
    person: {
      type: Object,
      required: true,
    },
  },
  methods: {
    openPerson() {
      this.$emit('openPerson', this.person);
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
    height: 70px;
    padding: 5px 0;

  }
</style>
