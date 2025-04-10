<template>
  <div id="Container">
    <Header />
    <h1>Hello {{ userName }}, Welcome at Update Restaurant</h1>
    <div id="inputWrapper">
      <h1 id="formH1">Update Restaurant</h1>
      <div id="inputField">
        <form @submit.prevent="updateRestaurant">
          <input
            type="text"
            placeholder="Enter Name"
            v-model="name"
            name="name"
            required
          />
          <input
            type="text"
            placeholder="Enter Address"
            v-model="address"
            name="address"
            required
          />
          <input
            type="text"
            placeholder="Enter Contact"
            name="contact"
            v-model="contact"
            required
          />

          <button id="submitBtn">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const name = ref("");
const userName = ref("");
const address = ref("");
const contact = ref("");
const router = useRouter();
const route = useRoute();

const updateRestaurant = async () => {
  let result = await axios.put(
    "http://localhost:3000/restaurant/" + route.params.id,
    {
      address: address.value,
      contact: contact.value,
      name: name.value,
    }
  );
  console.log(result);
  if (result.status === 200) {
    router.push("/");
  }
};
onMounted(async () => {
  let user = localStorage.getItem("user-info");
  if (typeof user === "string") userName.value = JSON.parse(user).name;
  if (!user) {
    router.push({ name: "Login" });
  }

  const result = await axios.get(
    "http://localhost:3000/restaurant/" + route.params.id
  );
  name.value = result.data.name;
  address.value = result.data.address;
  contact.value = result.data.contact;
});
</script>

<style scoped>
#Container {
  background-image: url("https://media.istockphoto.com/id/1397603064/vector/one-continuous-line-drawing-of-food-tools-spoon-fork-and-knife-for-decoration-restoran-menu.jpg?s=612x612&w=0&k=20&c=iCKo-nrpc0xFs_L7qA578p9dcfr743K06uEhlWm57FY=");
  @apply h-[100vh];
}
h1 {
  @apply text-center text-3xl mt-4 mb-4 text-gray-100  rounded-t-md font-semibold bg-white text-[#252525] mx-auto py-2 w-4/5;
}

#inputWrapper {
  @apply bg-[#252525] max-w-[38rem] w-4/5 m-auto  justify-between p-2 pb-4 rounded-md hover:shadow-lg shadow-gray-300;
}
#inputWrapper input {
  @apply mt-6 rounded-lg p-1 hover:opacity-95 placeholder:text-[#252525] placeholder:font-mono m-auto w-11/12;
}

#imgWrapper {
  @apply h-[20vh]  p-1 rounded-tl-lg rounded-br-lg rounded-tr-md rounded-bl-md bg-white;
}
form {
  @apply flex flex-col;
}
#formH1 {
  @apply bg-[#252525] text-white mt-4;
}
form button {
  @apply w-fit m-auto  p-2 px-4 bg-white text-[#252525] font-semibold rounded-lg hover:bg-slate-100 mt-8;
}
</style>
