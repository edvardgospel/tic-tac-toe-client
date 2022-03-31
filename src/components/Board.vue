<template>
 <div class="board">
  <button
   class="field"
   v-for="(field, i) in fields"
   :key="i"
   @click="updateField(i)"
  >
   {{ field }}
  </button>
 </div>
</template>

<script>
import { patchGame, deleteGame } from "../client/index";

export default {
 name: "Board",
 props: ["player", "gameId"],
 data() {
  return {
   fields: ["", "", "", "", "", "", "", "", ""],
  };
 },
 methods: {
  updateField(index) {
   patchGame(this.gameId, { field: index, player: this.player });
   //if (resp == ok)
   this.fields.splice(index, 1, this.player);
   //else show bad message
  },
  endGame() {
   deleteGame(this.gameId);
  },
 },
 watch: {
  // eslint-disable-next-line no-unused-vars
  fields(newFields, _) {
   if (newFields.every((element) => element !== "")) {
    this.endGame();
   }
  },
 },
};
</script>