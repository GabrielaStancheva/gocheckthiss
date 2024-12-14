<template>
    <div class="destination-details">
      <button @click="goBack" class="back-button">Back to Destinations</button>
      <div v-if="destination">
        <h1>{{ destination.name }}</h1>
        <p><strong>Location:</strong> {{ destination.location }}</p>
        <p><strong>Description:</strong> {{ destination.description }}</p>
  
        <button @click="toggleFavorite" class="favorite-button">
          {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
        </button>
      </div>
      
      <p v-else>Loading destination details...</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useFavoriteStore } from '../stores/favoriteStore';
  
  export default {
    name: 'DestinationDetails',
    setup() {
      const route = useRoute(); 
      const router = useRouter(); 
      const destination = ref(null); 
      const loading = ref(true); 
      const favoriteStore = useFavoriteStore();
  
      // Fetch destination details by ID from the API
      const fetchDestinationDetails = async () => {
        try {
          loading.value = true;
          const response = await fetch(`https://example.com/api/destinations/${route.params.id}`);
          const data = await response.json();
          console.log('API response', data);
  
          destination.value = {
  id: data.Destination.id,
  name: data.Destination.destination,
  location: data.Destination.destination_location,
  description: data.Destination.destination_description,
};

          console.log('Updated destination:', destination.value); 
        } catch (error) {
          console.error('Error fetching destination details:', error);
        } finally {
          loading.value = false;
        }
      };
  
      // Favorite functionality
      const isFavorite = computed(() => {
        return destination.value ? favoriteStore.isFavorite(destination.value.id) : false;
      });
  
      const toggleFavorite = () => {
        if (destination.value) {
          favoriteStore.toggleFavorite(destination.value.id);
        }
      };
  
      const goBack = () => {
        router.push('/');
      };
  
      onMounted(async () => {
        await fetchDestinationDetails();
      });
  
      return {
        destination,
        loading,
        isFavorite,
        toggleFavorite,
        goBack,
      };
    },
  };
  </script>
  
  <style scoped>
  .destination-details {
    text-align: center;
    padding: 20px;
  }
  
  .back-button {
    background-color: #42b983;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  
  .back-button:hover {
    background-color: #369f6b;
  }
  
  .favorite-button {
    background-color: #ff4c4c;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 20px;
  }
  
  .favorite-button:hover {
    background-color: #d93838;
  }
  </style>
  