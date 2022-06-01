<script setup>
import Sidebar from "./components/Sidebar.vue";
// import * as bootstrap from "bootstrap";
</script>

<template>
  <div class="app">
    <Sidebar />
    <router-view style="background-color: #f5f5f5" />
  </div>
</template>

<style lang="scss">
:root {
  --primary: #9933ff;
  --primary-alt: #22c55e;
  --grey: #64748b;
  --dark: #1b1f3b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 300px;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Press Start 2P", cursive;
  border-image-repeat: unset !important;
}
body {
  background: var(--light);
}
button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}
.app {
  main {
    padding: 2rem;
    padding-left: 6rem;

    @media (max-width: 768px) {
      z-index: -1;
      padding: 1rem;
      padding-left: 5rem;

      .container {
        padding: 1rem;
      }
    }
  }
}
</style>
