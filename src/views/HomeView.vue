<template>
  <div class="home">
    <Header></Header>
    <h1>Hello {{ name }}, Welcome to Home Page</h1>

    <div class="overflow-x-auto tableDiv">
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Restaurant Name</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody v-for="item in restaurant" :key="item.id">
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.contact }}</td>
            <td id="action">
              <router-link
                :to="'/update/' + item.id"
                class="bg-black rounded-lg text-white"
                >Update</router-link
              >
              <button
                @click="deleteRestaurant(item.id)"
                class="bg-black rounded-lg text-white m-2"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Header from "@/components/Header.vue";

const router = useRouter();
const name = ref("");
const noData = ref(false);
const restaurant = ref([]);

const deleteRestaurant = async (id) => {
  const result = await axios.delete("http://localhost:3000/restaurant/" + id);
  if (result.status == 200) {
    loadData();
  }
};
const loadData = async () => {
  let user = localStorage.getItem("user-info");
  if (typeof user === "string") name.value = JSON.parse(user).name;
  if (!user) {
    router.push({ name: "Login" });
  }
  const result = await axios.get("http://localhost:3000/restaurant");
  restaurant.value = result.data;
};
onMounted(loadData);
</script>

<style scoped>
.tableDiv {
  scrollbar-width: thin;

  scrollbar-color: #252525 #fff;
}
.home {
  background-image: url("https://media.istockphoto.com/id/1293748749/vector/vector-restaurant-logo-set-11-luxury-restaurant-emblems-cook-and-food-retro-labels-badges.jpg?s=612x612&w=0&k=20&c=DIaONAH9B_KkyaXndP0h_eL7hRfbuvrXedOwEhtRiBc=");
  @apply min-h-[99vh] pb-4 max-md:min-h-[300vh];
}
h1 {
  @apply text-center mt-10 p-4 rounded-xl w-4/5 m-auto font-bold text-2xl max-md:text-base  bg-white;
}
table {
  @apply border-4 bg-white border-solid border-[#252525]   m-auto w-4/5 max-md:mt-2 table-auto mt-10 text-[#252525];
}
table tr,
th,
td {
  @apply border-2 border-solid border-[#252525] max-md:text-sm;
}
table td,
th {
  @apply p-4 text-center font-semibold;
}
a {
  @apply font-semibold hover:text-green-700  p-2;
}
#action button {
  @apply p-2 hover:text-red-700;
}
</style>
