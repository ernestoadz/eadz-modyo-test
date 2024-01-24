<template>
  <img
    src="/images/party-finish.png"
    title="finish"
    alt="finish"
    class="object-cover h-60 m-auto"
  />
  <div class="text-center w-full">
    <h1 class="text-xl py-5">
      Congratulations!
      <span class="text-orange-500 font-bold">{{ store.getuserName }}</span> You
      have completed the game
    </h1>
    <span class="py-1 text-xl"
      >Hits: <span class="text-orange-500 font-bold">{{ score }}</span></span
    >
    <br />
    <span class="py-1 text-xl"
      >Errors: <span class="text-orange-500 font-bold">{{ errors }}</span></span
    >
    <div class="w-full md:py-2 py-3">
      <button
        class="text-white border hover:border-orange-500 bg-orange-500 focus:ring-4 font-medium rounded-md text-sm md:px-5 px-1 py-2 mr-1 my-1 w-full md:w-60"
        @click.prevent="store.setuserName(null)"
      >
        Go back
      </button>
    </div>
  </div>
</template>
<script setup>
import { useGlobalStore } from "@/store/Global";
const store = useGlobalStore();

const props = defineProps({
  score: {
    type: Number,
    require: true,
    default: 0,
  },
  errors: {
    type: Number,
    require: true,
    default: 0,
  },
});
</script>
