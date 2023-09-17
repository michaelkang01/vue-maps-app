<!-- This handles the button to acquire current location, search module.-->
<template>
  <div class="search">
    <button @click="getUserLocation">Current Location</button>
    <!-- @keyup.enter to have enter key also perform the search.-->
    <input id="location" v-model="searchTerm" @keyup.enter="searchLocation" type="text" placeholder="Enter a location" />
    <button @click="searchLocation">Search</button>
  </div>
</template>

<script>
export default {
  props: ['locations'],
  data() {
    return {
      searchTerm: '',
    };
  },
  methods: {
    getUserLocation() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            this.$emit('searchLoc', userLocation);
          },
          (error) => {
            console.error('Error getting user location:', error);
            //Using alerts for ease of visual
            alert('Error getting user location', error);
          }
        );
      } else {
        console.error('Geolocation not available.');
        //Using alerts for ease of visual
        alert('Geolocation is not available');
      }
    },
    searchLocation() {
      if (this.searchTerm.trim() !== '') {
        this.$emit('searchLoc', this.searchTerm);
        this.searchTerm = '';
      }
    }
  },
};
</script>