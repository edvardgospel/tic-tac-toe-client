<template>
 <div class="game">
  <div class="button-group">
   <button class="button" @click="this.startGame">
    {{ this.startGameButtonText }}
   </button>
   <button class="button" @click="this.joinGame">Join game</button>
  </div>
  <Board v-if="gameStarted" />
 </div>
</template>

<script>
import Board from "./Board.vue";

export default {
 name: "Game",
 components: {
  Board,
 },
 data() {
  return {
   gameStarted: false,
  };
 },
 computed: {
  startGameButtonText() {
   return this.gameStarted ? "Restart Game" : "Start Game";
  },
 },
 methods: {
  startGame() {
   if (this.gameStarted) {
    this.restartGame();
   } else {
    this.gameStarted = true;
   }
  },
  restartGame() {
   console.log("restart game");
  },
  joinGame() {
   console.log("join game");
  },
 },
};
</script>