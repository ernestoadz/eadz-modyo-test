<template>
  <div class="py-1 md:text-xl text-sm grid md:grid-cols-2 grid-cols-1">
    <div v-if="arrayLength > 0">
      <button
        class="hover:text-white text-orange-500 border border-orange-500 hover:bg-orange-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm md:px-5 px-1 md:py-2 py-1 mr-1 my-1"
        @click.prevent="store.setuserName(null)"
      >
        Go back
      </button>

      <br />
      <span class="py-1"
        >Hits: <span class="text-orange-500 font-bold">{{ score }}</span></span
      >
      <br />
      <span class="py-1"
        >Errors:
        <span class="text-orange-500 font-bold">{{ errors }}</span></span
      >
    </div>
  </div>

  <div class="w-full border-2 border-orange-500 rounded-sm md:p-7 p-5 shadow">
    <div v-if="arrayLength > 0" class="grid md:grid-cols-6 grid-cols-3 gap-4">
      <div v-for="(item, index) in memoryArray" :key="index">
        <div :class="item.meta.name == '' ? 'invisible' : ''">
          <div
            @click="matchCards(item.meta.name, index)"
            class="cursor-pointer w-full md:h-60 h-32 bg-blue-950 rounded-md relative hover:-translate-y-0.5 hover:shadow-xl"
          >
            <UiBrain
              :class="index == index1 || index == index2 ? 'invisible' : ''"
              class="flex items-center justify-center absolute h-full w-full text-center text-white text-5xl"
            />
            <div
              :class="index == index1 || index == index2 ? '' : 'invisible'"
              class="h-full w-full"
            >
              <img
                :src="item.fields.image.url"
                :alt="item.fields.image.alt_text"
                :title="item.fields.image.title"
                :description="item.fields.image.description"
                class="object-cover h-full w-full rounded-md"
              />
              <span
                class="absolute font-title text-sm md:text-lg font-thin uppercase -mt-10 text-white w-full text-center"
                >{{ item.fields.image.title }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <FinishEnd v-if="arrayLength == 0" :score="score" :errors="errors" />
  </div>
</template>
<script setup>
import { useGlobalStore } from "@/store/Global";
const store = useGlobalStore();

//Get values from endpoint
const { data } = await useFetch(
  "https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=6"
);

//Duplicating the data obtained in two arrays and merging them randomly
const aux1 = data;
const aux2 = data;
const final = aux1.value.entries.concat(aux2.value.entries);
const memoryArray = final.sort((a, b) => 0.5 - Math.random());

//I get the size of the array and then subtract it when there are hits and know when there are no cards left.
const arrayLength = ref(memoryArray.length);

//I get the user's name through localStorage (persist)
const userName = ref(localStorage.getItem("userName"));

//Declare auxiliary variables to make a comparison between two cards
let cardA = ref("");
let cardB = ref("");
let index1 = ref(-1);
let index2 = ref(-1);
const score = ref(0);
const errors = ref(0);

//Generate a computed variable to obtain the array data.
const filteredCards = computed(() => {
  memoryArray.forEach((e) => {});
  return memoryArray;
});

//Create the method that is called to generate the comparison between two cards
function matchCards(cardName, index) {
  if (cardA.value === "" && index1.value == -1) {
    cardA.value = cardName;
    index1.value = index;
  } else {
    if (cardB.value === "" && index2.value == -1) {
      cardB.value = cardName;
      index2.value = index;
    }
  }

  // Add a timeout to make the comparison 1 second later and modify the score data.
  setTimeout(() => {
    if (cardA.value != "" && cardB.value != "") {
      if (cardA.value == cardB.value) {
        //If two cards are the same
        score.value++;
        arrayLength.value--;
        arrayLength.value--;

        cardA.value = "";
        cardB.value = "";
        index1.value = -1;
        index2.value = -1;

        //Remove the name of the two cards so that they disappear from the board.
        memoryArray.forEach((e) => {
          if (e.meta.name == cardName) {
            e.meta.name = "";
          }
        });
      } else {
        //if two cards are not the same
        errors.value++;
        cardA.value = "";
        cardB.value = "";
        index1.value = -1;
        index2.value = -1;
      }
    }
  }, "1000");
}
</script>
