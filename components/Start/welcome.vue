<template>
  <div class="h-full md:p-5 md:my-10 my-5 w-full">
    <div class="flex items-center w-full justify-center py-5">
      <UiUser class="h-40" />
    </div>
    <div class="text-center py-5 text-lg" v-if="actualUserName != ''">
      <h1>
        Welcome again
        <span class="text-orange-500">{{ actualUserName }}</span> :)
      </h1>
      <div class="flex items-center w-full justify-center md:py-5 py-2">
        <button
          class="text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-l-md text-sm md:px-5 px-1 md:py-3 py-2 mr-1"
          @click.prevent="showRegister = 0"
        >
          Register again
        </button>
        <button
          class="text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-r-md text-sm md:px-5 px-1 md:py-3 py-2"
          @click.prevent="store.setuserName(actualUserName)"
        >
          Let's go to the Game
        </button>
      </div>
    </div>
    <form
      v-if="showRegister == 0"
      @submit.prevent="submitForm"
      class="flex items-center w-full justify-center"
    >
      <input
        id="name"
        v-model="userName"
        placeholder="Type your name here"
        class="input border placeholder-gray-400 appearance-none w-full px-5 py-2.5 focus focus:border-orange-500 focus:outline-none active:border-hunter text-gray-400 rounded-l-md md:w-60 mr-1"
        type="text"
      />
      <button
        type="submit"
        class="text-white bg-blue-950 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-r-md text-sm md:px-5 px-1 md:py-3 py-1"
      >
        Let's Go!
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/store/Global";
const store = useGlobalStore();

//Declare the necessary variables
const userName = ref("");
const showRegister = ref(0);

//I generate a computed variable to check if the user name was already saved or not.
const actualUserName = computed(() => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("userName")) {
      showRegister.value = 1;
      return localStorage.getItem("userName");
    } else {
      return "";
    }
  }
});

//if the name was not saved, I send the form with the new name and store it in the local storage and pinia (vuex).
const submitForm = () => {
  store.setuserName(userName);
  if (typeof window !== "undefined") {
    localStorage.setItem("userName", userName.value);
  }
};
</script>

<style></style>
