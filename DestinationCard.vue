<template>
    <div
      class="destination-card"
      @click="viewDetails"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    >
      <div class="destination-info">
        <h2 class="destination-title">{{ destination.name }}</h2>  <!--{{ (vmesto brand go naimenuvah name)destination.model }}-->  
       <!-- <p class="destination-price">Price: {{ car.price }}</p>-->
      </div>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  import defaultDestinationImage from '@/assets/ittaly.jpg';
  
  export default {
    name: 'DestinationCard',
    props: {
      destination: {
        type: Object,
        required: true,
      },
    },
    computed: {
      backgroundImage() {
        try {
          const imageUrl = require(`@/assets/${this.destination.name.toLowerCase()}.jpg`);
          console.log('Background image: ',imageUrl);
          return imageUrl;
        } catch (error) {
          console.log('Error finding image path');
          return defaultDestinationImage;
        }
      },
    },
    setup(props) {
      const router = useRouter(); 
  
      const viewDetails = () => {
        router.push(`/destination/${props.destination.id}`); 
      };
  
      return {
        viewDetails,
      };
    },
  };
  </script>
  
  <style scoped>
  .destination-card {
    width: 300px;
    height: 200px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 16px;
    color: white;
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.8);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .destination-card:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  }
  
  .destination-info {
    background-color: rgba(0, 0, 0, 0.5); /* Dark overlay for text readability */
    padding: 8px;
    border-radius: 4px;
  }
  
  .destination-title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
 <!-- .car-price {
    font-size: 1rem;
  } --> 
  </style>