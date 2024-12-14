<template>
    <div class="destination-list-container">
  
      <!-- Search Bar -->
      <div class="search-bar">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search destinations by name..."
        />
      </div>
  
      <div class="destination-list">
        <DestinationCard
          v-for="destination in filteredDestinations"
          :key="destination.id"
          :destination="destination"
        />
        <p v-if="filteredDestinations.length === 0">No destinations match your search.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue';
  import DestinationCard from './DestinationCard.vue';
  
  export default {
    name: 'DestinationList',
    components: {
      DestinationCard,
    },
    setup() {
      const destinations = ref([]); 
      const searchQuery = ref('');
  
      // Списък с желани дестинации, които ще се показват
      const desiredDestinations = [
        'Italy',
        'Greece',
        'Spain',
        'London',
        'Holland',
        'Germany',
        'Norway',
      ];
  
      // Извличане на данни за дестинации от API
      const fetchDestinations = async () => {
        try {
          const response = await fetch('https://example.com/api/destinations');
          const data = await response.json();
          console.log('API response: ', data);
  
          // Обработка на данните
          destinations.value = data.destinations.map((destination) => ({
            id: destination.id,
            //name: destination.name,
            name: destination.destination,
            //location: destination.location,
            location: destination.destination_location,
            //description: destination.description,
            description: destination.destination_description,
            image: destination.image,
          }))
          .filter((destination) => desiredDestinations.includes(destination.name));
  
          console.log('Parsed destinations:', destinations.value);
        } catch (error) {
          console.error('Error fetching destination data:', error);
        }
      };
  
      onMounted(() => {
        fetchDestinations();
      });
  
      // Филтриране на дестинациите по текстово търсене
      const filteredDestinations = computed(() => {
        return destinations.value.filter((destination) => {
          return destination.name.toLowerCase().includes(searchQuery.value.toLowerCase());
        });
      });
  
      return {
        destinations,
        searchQuery,
        filteredDestinations,
      };
    },
  };
  </script>
  
  <style scoped>
  .destination-list-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
  }
  
  .search-bar {
    margin-bottom: 16px;
    width: 100%;
    max-width: 500px;
  }
  
  .search-bar input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .destination-list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
  }
  
  p {
    margin-top: 16px;
    font-size: 18px;
    color: gray;
  }
  </style>
  