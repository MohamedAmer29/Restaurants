<template>
  <div class="home">
    <Header></Header>
    <h1>Hello {{ name }}, Welcome to Update Page</h1>

    <table>
      <thead>
        <tr>
          <th>Restaurant Name</th>

          <th>Actions</th>
        </tr>
      </thead>
      <tbody v-for="item in restaurant" :key="item.id">
        <tr>
          <td>{{ item.name }}</td>

          <td>
            <router-link
              class="bg-black text-white rounded-xl p-2"
              :to="'/update/' + item.id"
              >Update</router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Header from "@/components/Header.vue";

const router = useRouter();
const name = ref("");

const restaurant = ref([]);
onMounted(async () => {
  let user = localStorage.getItem("user-info");
  if (typeof user === "string") name.value = JSON.parse(user).name;
  if (!user) {
    router.push({ name: "Login" });
  }
  const result = await axios.get("http://localhost:3000/restaurant");
  restaurant.value = result.data;
});
</script>

<style scoped>
.home {
  background-image: url("https://media.istockphoto.com/id/1293748749/vector/vector-restaurant-logo-set-11-luxury-restaurant-emblems-cook-and-food-retro-labels-badges.jpg?s=612x612&w=0&k=20&c=DIaONAH9B_KkyaXndP0h_eL7hRfbuvrXedOwEhtRiBc=");
  @apply min-h-[99vh] pb-4;
}
h1 {
  @apply text-center mt-10 p-4 rounded-xl w-4/5 m-auto font-bold text-2xl  bg-white  max-w-[40rem];
}
table {
  @apply border-4 bg-white border-solid border-[#252525]  m-auto w-1/2 max-w-[39rem] mt-10 text-[#252525];
}
table tr,
th,
td {
  @apply border-2 border-solid border-[#252525];
}
table td,
th {
  @apply p-4 text-center font-semibold;
}
a {
  @apply font-semibold hover:text-[#bb1f1f];
}
</style>
