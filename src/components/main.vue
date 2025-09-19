<template>
    <div class="app-container">
      <!-- <Side />  -->
       <Header />
      <QuarterScreenComponent />
      <Center />
      <Left />
    </div>
  </template>
  <script lang="ts">
  import { defineComponent } from 'vue';
  import Header from '../view/header.vue';  // Header 组件路径
  import QuarterScreenComponent from '../view/rigth.vue';  // QuarterScreenComponent 组件路径
  import Center from '../view/center.vue';
  import Left from '../view/left.vue';
  import Side from '../components/side.vue';
  export default defineComponent({
    name: 'main',
    components: {
      Header,
      QuarterScreenComponent,
      Center,
      Left,
      Side
    },
    }
  );

  </script>
  <style lang="css">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .app-container {
    display: flex;
    width: 100vw;
    height:fit-content;
    background-color: transparent;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  </style>
  