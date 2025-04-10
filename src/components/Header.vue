<template>
  <nav>
    <router-link to="/"
      ><i class="material-icons">home</i
      ><span id="span"> Home</span></router-link
    >
    <router-link to="/add"
      ><i class="material-icons">add</i>
      <span id="span">Add Restaurant</span></router-link
    >
    <router-link to="/update"
      ><i class="material-icons">update</i>
      <span id="span"> Update Restaurant</span></router-link
    >
    <router-link to="#" @click="logoutPage"
      ><i class="material-icons">logout</i>
      <span id="span"> Logout</span></router-link
    >
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const logoutPage = () => {
  localStorage.clear();
  router.push("/login");
};
</script>

<style scoped>
nav {
  @apply bg-[#252525] text-white    text-xl overflow-hidden p-2 pl-0;
}
nav a {
  @apply text-center mx-2 hover:bg-gray-200 hover:text-[#252525] p-1 rounded-md;
}
nav a i {
  @apply pl-4 translate-y-[4px];
}
</style>
