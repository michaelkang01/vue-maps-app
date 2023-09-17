<template>
  <div class="container">
    <Search :locations="locations" @searchLoc="searchLoc"/>
    <Map :locations="locations" :center="center"/>
    <div class="timezone" v-if="localTime">
      <p>Time Zone: {{ localTimeZone }}</p>
      <p>Local Time: {{ localTime }}</p>
    </div>
    <Table :locations="locations" @deleteLocs="deleteLocs"/>
  </div>
</template>

<script>
import Search from './components/Search.vue';
import Map from './components/Map.vue';
import Table from './components/Table.vue';

export default {
  data() {
    return {
      locations: [],
       //Set default to Accuenergy off Google.
      center: { lat: 43.748329, lng: -79.289200 },
      localTime: null,
      localTimeZone: null,
    };
  },
  methods: {
    deleteLocs() {
      this.locations = this.locations.filter((location) => !location.selected);
    },
    async getTimeZone(lat, lng) {
      //Google timezone api service
      const timestamp = Math.floor(Date.now() / 1000)
      const response = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${timestamp}&key=${this.googleMapsKey}`)
      const data = await response.json();
      if (data.status === 'OK') {
        const localTimestamp = timestamp + data.dstOffset + data.rawOffset;
        this.localTime = new Date(localTimestamp * 1000).toLocaleString();
        this.localTimeZone = data.timeZoneId;
      }
    },
    async searchLoc(query) {
      try {
        // Use Google geocoding service
        //If coords are giving search with coords, otherwise use address
        const response = (!(query instanceof String || typeof query === 'string') && 'lng' in query && 'lat' in query) 
          ? await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${query.lat},${query.lng}&key=${this.googleMapsKey}`)
          : await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${this.googleMapsKey}`);
        const data = await response.json();
        if (data.status === 'OK' && data.results.length > 0) {
          // Extract latitude and longitude from the geocoding results
          const location = {
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng,
            name: data.results[0].formatted_address, // Store the name of the location
          };
          //Run TimeZone
          await this.getTimeZone(location.lat, location.lng);
          // Add the location to the locations array
          this.locations.push(location);
          // Center to it
          this.center = location;

        } else {
          console.error('Location not found');
          //Using alerts for ease of visual
          alert('Location not found');
        }
      } catch (error) {
        console.error('Error searching for location:', error);
        //Using alerts for ease of visual
        alert('Error searching for location:', error);
      }
    },
  },
  components: {
    Search,
    Map,
    Table,
  },
};
</script>