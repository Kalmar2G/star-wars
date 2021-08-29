<template>
  <tr class="table-row" @click="openPerson">
    <td class="table-row__data">{{ person.id }}</td>
    <td class="table-row__data">
        <span v-for="(word, index) in splitName"
              :key="index">
          <strong v-if="index < 2">
            {{ word }}
          </strong>
          <span v-else>...</span>
        </span>
    </td>
    <td class="table-row__data"
        style="overflow:hidden; white-space:nowrap;text-overflow: ellipsis;">{{ person.gender }}
    </td>
    <td class="table-row__data">{{ person.height }}</td>
    <td class="table-row__data">{{ person.mass }}</td>
    <td class="table-row__data">{{ person.eye_color }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    person: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.name = `${this.person.name}`;
  },
  data: () => ({
    name: '',
  }),
  methods: {
    openPerson() {
      this.$emit('openPerson', this.person);
    },
  },
  computed: {
    splitName() {
      return this.name.split(' ');
    },
  },
};
</script>

<style scoped>
.table-row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 70px;
  padding: 5px 0;
  cursor: pointer;
}

.table-row__data {
  flex: 1 1 20%;
  text-align: center;
}
</style>
