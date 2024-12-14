<template>
    <div>
      <h1>Welcome to the landmark catalog</h1>
      <DestinationList />
    </div>
  </template>
  
  <script>
  import DestinationList from '../components/DestinationList.vue';
  
  export default {
    name: 'HomePage',
    components: {
      DestinationList,
    },
  };
  </script>
  
  <style scoped>
  h1 {
    margin-bottom: 16px;
  }
  </style>
  