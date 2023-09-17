<!-- This handles the map to display everything and markers-->
<template>
  <!-- Google Map -->
  <GoogleMap id="map" :api-key="this.googleMapsKey" :center="center" :zoom="15" ref="myMarker">
    <!-- Markers for each stored location-->
    <Marker v-for="(location, index) in locations" :key="index" :options="{position: {lat: location.lat, lng: location.lng}, label: location.name}"/>
  </GoogleMap>
</template>

<script>
//Map component as requested.
import { defineComponent } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";

export default defineComponent({
  components: { GoogleMap, Marker },
  props: ['locations', 'center'],
});
</script>