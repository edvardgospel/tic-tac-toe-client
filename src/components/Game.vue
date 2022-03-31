<template>
 <div class="game">
  <div class="button-group">
   <button class="button" @click="this.initializeGame">
    {{ this.startGameButtonText }}
   </button>
   <button class="button" @click="this.joinGame" :disabled="this.gameStarted">
    Join game
   </button>
  </div>
  <Board v-if="gameStarted" :player="player" :gameId="gameId" />
 </div>
</template>

<script>
import Board from "./Board.vue";
import { postGame, putGame } from "../client/index";
export default {
 name: "Game",
 components: {
  Board,
 },
 data() {
  return {
   gameStarted: false,
   player: "",
   gameId: 0,
  };
 },
 computed: {
  startGameButtonText() {
   return this.gameStarted ? "Restart Game" : "Start Game";
  },
 },
 methods: {
  initializeGame() {
   if (this.gameStarted) {
    this.restartGame();
   } else {
    this.startGame();
   }
  },
  async startGame() {
   this.player = "X";
   this.gameStarted = true;
   const resp = await postGame();
   this.gameId = resp.id;
  },
  async restartGame() {
   await putGame(this.gameId);
  },
  joinGame() {
   this.player = "O";
   this.gameStarted = true;
  },
 },
};
</script>