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
  <Board
   v-if="gameStarted"
   :player="player"
   :gameId="gameId"
   :fields="fields"
   :nextPlayer="nextPlayer"
  />
 </div>
</template>

<script>
import Board from "./Board.vue";
import { postGame, putGame, joinGame } from "../client/index";
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
   fields: [],
   nextPlayer: "",
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
   const resp = await postGame();
   if (resp.status === 201) {
    const { id, fields, nextPlayer } = await resp.json();
    this.gameId = id;
    this.fields = fields;
    this.nextPlayer = nextPlayer;
    this.player = "X";
    this.gameStarted = true;
   }
  },
  async restartGame() {
   this.gameStarted = false;
   const resp = await putGame(this.gameId, {
    fields: ["", "", "", "", "", "", "", "", ""],
    nextPlayer: "X",
   });
   if (resp.status === 200) {
    const { id } = await resp.json();
    this.gameId = id;
    this.fields = ["", "", "", "", "", "", "", "", ""];
    this.nextPlayer = "X";
    this.gameStarted = true;
   }
  },
  async joinGame() {
   const resp = await joinGame();
   if (resp.status === 200) {
    const { id, fields, nextPlayer } = await resp.json();
    this.gameId = id;
    this.fields = fields;
    this.nextPlayer = nextPlayer;
    this.player = "O";
    this.gameStarted = true;
   }
  },
 },
};
</script>