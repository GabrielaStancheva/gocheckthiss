<template>
    <div class="favorite-destinations">
      <h1>My Favorite Destinations</h1>
      <div v-if="favoriteDestinations.length > 0" class="destination-list">
        <DestinationCard
          v-for="destination in favoriteDestinations"
          :key="destination.id"
          :destination="destination"
        />
      </div>
      <p v-else class="no-favorites">You haven't added any destinations to your favorites yet!</p>
    </div>
  </template>
  
  <script>
  import { computed, onMounted, ref } from 'vue';
  import { useFavoriteStore } from '@/stores/favoriteStore';
  import DestinationCard from '@/components/DestinationCard.vue'; 
  
  export default {
    name: 'FavoriteDestinations',
    components: {
      DestinationCard,
    },
    setup() {
      const favoriteStore = useFavoriteStore();
      const allDestinations = ref([]); 
      const loading = ref(true);
  
      // Fetch all destination data
      const fetchDestinations = async () => {
        try {
          loading.value = true;
          const response = await fetch('https://myfakeapi.com/api/destinations');
          const data = await response.json();
  
          allCars.value = data.cars.map((car) => ({
            brand: car.car,
            id: car.id,
            model: car.car_model,
            color: car.car_color,
            year: car.car_model_year,
            vin: car.car_vin,
            price: car.price,
            availability: car.availability,
          }));






          allDestinations.value = data.destinations.map((destination) => ({
          id: destination.id,
          //name: destination.name,
          name: destination.destination,
          location: destination.destination_location,
          description: destination.destination_description,
          image: destination.image,
        }));







        } catch (error) {
          console.error('Error fetching destination data:', error);
        } finally {
          loading.value = false;
        }
      };
  
      const favoriteDestinations = computed(() => {
        return favoriteStore.getFavoriteDestinations(allDestinations.value);
      });
  
      onMounted(async () => {
        await fetchDestinations();
      });
  
      return {
        favoriteDestinations,
        loading,
      };
    },
  };
  </script>
  
  <style scoped>
  .favorite-destinations {
    padding: 16px;
    text-align: center;
  }
  
  .destination-list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
  }
  
  .no-favorites {
    margin-top: 20px;
    font-size: 18px;
    color: gray;
  }
  </style>
  