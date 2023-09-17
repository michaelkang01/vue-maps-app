<!-- This handles paginated table, checkbox of selection, and delete-->
<template>
  <div class="classTable">
    <button class="deleteButton" @click="deleteLocations">Delete Selected</button>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Latitude</th>
          <th>Longitude</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(location, index) in pagLocations" :key="index">
          <td><input type="checkbox" v-model="location.selected" /></td>
          <td>{{ location.name }}</td>
          <td>{{ location.lat }}</td>
          <td>{{ location.lng }}</td>
        </tr>
      </tbody>
      <div class="pagination">
        <!-- Pagination buttons, disable if pages are  -->
        <button @click="updatePag(curPage - 1)" :disabled="curPage === 0">&lt&lt Prev</button>
        <p>Page {{ curPage + 1 }} of {{ maxPage }}</p>
        <button @click="updatePag(curPage + 1)" :disabled="(curPage + 1) * 10 >= locations.length">Next &gt&gt</button>
      </div>
    </table>
  </div>
</template>

<script>
export default {
  props: ['locations'],
  //For pagination
  data() {
    return {
      curPage: 0,
    }
  },
  computed: {
    startPagIndex() {
      return this.curPage * 10;
    },
    endPagIndex() {
      return (this.curPage + 1) * 10
    },
    pagLocations() {
      return this.locations.slice(this.startPagIndex, this.endPagIndex);
    },
    maxPage() {
      return Math.floor(this.locations.length / 10) + 1;
    },
  },
  methods: {
    // Delete 
    deleteLocations() {
      this.$emit('deleteLocs');
    },
    // Pagination
    updatePag(pageNum) {
      this.curPage = pageNum;
    },
  },
};
</script>