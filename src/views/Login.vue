<template>
  <div
    class="absolute w-[100vw] h-[90vh] z-0 containerDiv h-full"
    @click="alert = false"
  ></div>
  <div id="Container" class="z-10 pt-[100px] relative max-md:pt-[4px]">
    <h1 id="loginH1">Login</h1>

    <div id="inputWrapper">
      <div id="inputField">
        <form class="flex flex-col" v-on:submit.prevent="login">
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
            >haven't an account
            <button @click="router.push('sign-up')">SignUp</button></span
          >
        </form>
      </div>
      <div id="imgWrapper">
        <img
          src="https://media.istockphoto.com/id/1147574099/vector/restaurant-logo-isolated-on-white-background-restaurant-menu-logo-template-with-knife-fork.jpg?s=612x612&w=0&k=20&c=I72JcaDk6nmwuYHxPWOVVKL2RNIkgwfIv3KnOJdA9PU="
          alt="Logo"
        />
      </div>
    </div>
  </div>

  <div v-if="alert">
    <div id="blure" @click="alert = false">.</div>
    <div id="alert">
      <button id="cancel" @click="alert = false">
        <img src="../assets/cancel.svg" alt="" />
      </button>
      <h1>{{ loginError }}</h1>
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
const alert = ref(false);
const loginError = ref("");
onMounted(() => {
  const user = localStorage.getItem("user-info");
  if (user) {
    router.push({ name: "home" });
  }
});
const login = async () => {
  let result = await axios.get(
    `http://localhost:3000/users?email=${email.value}&password=${password.value}`
  );
  let resultEmail = await axios.get(
    `http://localhost:3000/users?email=${email.value}`
  );
  let resultPassword = await axios.get(
    `http://localhost:3000/users?password=${password.value}`
  );
  console.log(result);
  if (result.status === 200 && result.data.length > 0) {
    localStorage.setItem("user-info", JSON.stringify(result.data[0]));
    router.push("/");
  } else {
    alert.value = true;
    if (result.status === 200 && resultEmail.data.length) {
      loginError.value = "Please check your Password";
    } else if (result.status === 200 && resultPassword.data.length) {
      loginError.value = "Please check your Email address";
    } else if (
      result.status === 200 &&
      result.data.password !== password.value &&
      result.data.email !== email.value
    ) {
      loginError.value = "Please Check Your Email and Password";
    } else {
      loginError.value = "Please check your connection";
    }
  }
};
</script>

<style scoped>
.containerDiv {
  background: linear-gradient(to right, #000000, #434343);
}
#loginH1 {
  @apply text-center text-4xl mt-8 text-gray-100  rounded-t-md font-semibold bg-[#252525] mx-auto py-2 max-w-[50rem] max-lg:max-w-[44rem] h-[4rem];
}
img {
  @apply m-auto mt-4;
}
#inputWrapper {
  @apply bg-[#252525] max-w-[50rem] m-auto flex justify-between p-8 rounded-b-md hover:shadow-lg shadow-gray-300 px-4 max-lg:max-w-[44rem] max-md:flex-col-reverse;
}
#inputWrapper input {
  @apply my-4 rounded-lg p-1 hover:opacity-95 placeholder:text-[#252525] placeholder:font-mono w-11/12;
}
#inputWrapper #inputField {
  @apply flex flex-col;
}
#imgWrapper {
  @apply w-3/5 p-1 rounded-tl-lg rounded-br-lg rounded-tr-md rounded-bl-md bg-gray-100 max-md:w-11/12;
}
#input #inputWrapper img {
  @apply w-full;
}
#submitDiv {
  @apply w-10/12 mt-10 text-center mb-8;
}

form button {
  @apply w-fit m-auto text-[#252525]  p-1 bg-slate-200 rounded-lg hover:bg-slate-100;
}
#loginSpan {
  @apply text-white font-mono;
}
#loginSpan button {
  @apply text-red-600 font-sans;
}
#alert {
  @apply absolute top-[15vh] left-[20vw] w-[32rem] bg-[#252525] rounded-md text-white flex justify-center items-center font-bold text-xl h-[12rem] opacity-75 z-30;
}

#cancel {
  @apply absolute top-[-10px] right-0;
}
#blure {
  @apply absolute w-[90vw] h-[50vh] z-10   top-[3rem] left-[3rem] blur-[40px] bg-transparent bg-white;
}
</style>
