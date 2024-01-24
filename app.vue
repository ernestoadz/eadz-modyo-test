<template>
  <div class="px-4 md:px-0 py-10 lg:container md:mx-auto xl:max-w-screen-xl">
    <div v-if="store.getuserName" class="text-right text-base md:text-lg">
      {{ store.getuserName }}
    </div>
    <h1
      class="md:text-6xl text-3xl font-thin font-title text-center text-gray-600 md:pb-10"
    >
      Memory!
    </h1>
    <StartWelcome v-if="store.getuserName == null" />
    <TableBoard v-else />
  </div>
</template>
<script setup lang="ts">
import { useGlobalStore } from "@/store/Global";
const store = useGlobalStore();

useHead({
  title: "Memory Game! by Ernesto Díaz",
  meta: [
    { name: "author", content: "Ernesto A. Díaz G." },
    { name: "description", content: "Memory Game for Modyo Test" },
  ],
});
</script>
