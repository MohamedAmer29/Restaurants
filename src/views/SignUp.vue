<template>
  <div id="Container" class="containerDiv h-[100vh] pt-4 max-md:pt-2">
    <h1>SignUp</h1>

    <div id="inputWrapper">
      <div id="inputField">
        <form class="flex flex-col" v-on:submit.prevent="singUp">
          <input type="text" placeholder="Enter Name" v-model="name" required />
          <input
            type="email"
            placeholder="Enter Email"
            v-model="email"
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            v-model="password"
            required
          />
          <div id="submitDiv"><button>Submit</button></div>
          <span id="loginSpan"
            >have an account
            <button @click="router.push('login')">Login</button></span
          >
        </form>
      </div>
      <div id="imgWrapper">
        <img
          src="https://media.istockphoto.com/id/981368726/vector/restaurant-food-drinks-logo-fork-knife-background-vector-image.jpg?s=612x612&w=0&k=20&c=9M26CBkCyEBqUPs3Ls5QCjYLZrB9sxwrSFmnAmNCopI="
          alt="Logo"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
const name = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();

onMounted(() => {
  const user = localStorage.getItem("user-info");
  if (user) {
    router.push("/login");
  }
});
const singUp = async () => {
  let result = await axios.post("http://localhost:3000/users", {
    email: email.value,
    password: password.value,
    name: name.value,
  });

  if (result.status === 201) {
    localStorage.setItem("user-info", JSON.stringify(result.data));
    router.push("/login");
  }
};
</script>

<style scoped>
.containerDiv {
  background: linear-gradient(to right, #000000, #434343);
}
h1 {
  @apply text-center text-4xl mt-8 text-gray-100  rounded-t-md font-semibold bg-[#252525] mx-auto py-2 max-w-[50rem];
}
img {
  @apply m-auto mt-4;
}
#inputWrapper {
  @apply bg-[#252525] max-w-[50rem] m-auto flex justify-between p-6 rounded-b-md hover:shadow-lg shadow-gray-300 max-md:flex-col-reverse;
}
#inputWrapper input {
  @apply my-4 rounded-lg p-1 hover:opacity-95 placeholder:text-[#252525] placeholder:font-mono w-11/12;
}
#inputWrapper #inputField {
  @apply flex flex-col;
}
#imgWrapper {
  @apply h-full w-3/5 p-1 rounded-tl-lg rounded-br-lg rounded-tr-md rounded-bl-md bg-white max-md:w-11/12;
}
#input #inputWrapper img {
  @apply w-full;
}
#submitDiv {
  @apply w-10/12 mt-10 text-center mb-8;
}

form button {
  @apply w-fit m-auto  p-1 bg-slate-200 rounded-lg hover:bg-slate-100;
}
#loginSpan {
  @apply text-white font-mono;
}
#loginSpan button {
  @apply text-red-600 font-sans;
}
</style>
