import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFavoriteStore = defineStore('favoriteStore', () => {
  const favorites = ref([]);

  const toggleFavorite = (destinationId) => {
    if (favorites.value.includes(destinationId)) {
      favorites.value = favorites.value.filter((id) => id !== destinationId);
    } else {
      favorites.value.push(destinationId);
    }
  };

  const isFavorite = (destinationId) => {
    return favorites.value.includes(destinationId);
  };

  const getFavoriteDestinations = (allDestinations) => {
    return allDestinations.filter((destination) => favorites.value.includes(destination.id));
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    getFavoriteDestinations,
  };
});
