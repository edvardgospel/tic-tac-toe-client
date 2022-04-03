<template>
 <div class="board">
  <button
   class="field"
   v-for="(field, i) in mutableFields"
   :key="i"
   @click="updateField(i)"
  >
   {{ field }}
  </button>
  <p>Next player: {{ mutableNextPlayer }}</p>
  <p>{{ errorMessage }}</p>
  <p>{{ endMessage }}</p>
 </div>
</template>

<script>
import { getGame, putGame, deleteGame } from "../client/index";
import config from "../config";

export default {
 name: "Board",
 props: ["player", "gameId", "fields", "nextPlayer"],
 data() {
  return {
   mutableFields: this.fields,
   mutableNextPlayer: this.nextPlayer,
   errorMessage: "",
   endMessage: "",
  };
 },
 async mounted() {
  await this.getGame();
 },
 methods: {
  async updateField(index) {
   if (this.mutableNextPlayer != this.player) {
    this.errorMessage = "It's not your turn!";
    setTimeout(() => {
     this.errorMessage = "";
    }, config.errorMessageTimeout);
    return;
   }
   const newFields = this.mutableFields;
   newFields.splice(index, 1, this.player);
   const resp = await putGame(this.gameId, {
    fields: newFields,
    nextPlayer: this.player === "X" ? "O" : "X",
   });
   if (resp.status === 200) {
    const { fields, nextPlayer } = await resp.json();
    this.mutableFields = fields;
    this.mutableNextPlayer = nextPlayer;
   }
  },
  async getGame() {
   setInterval(async () => {
    if (this.endMessage === "") {
     const resp = await getGame(this.gameId);
     if (resp.status === 200) {
      const { fields, nextPlayer } = await resp.json();
      if (this.mutableNextPlayer !== nextPlayer) {
       this.mutableNextPlayer = nextPlayer;
      }
      if (JSON.stringify(this.mutableFields) !== JSON.stringify(fields)) {
       this.mutableFields = fields;
      }
     }
    }
   }, config.pollingInterval);
  },
  endGame() {
   deleteGame(this.gameId);
  },
  getWinner(fields) {
   const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
   ];
   for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
     return fields[a];
    }
   }
   return "";
  },
 },
 watch: {
  // eslint-disable-next-line no-unused-vars
  mutableFields(newFields, _) {
   const winner = this.getWinner(newFields);
   if (winner) {
    this.endMessage = winner === this.player ? "You won!" : "You lost!";
    setTimeout(() => {
     this.endGame();
    }, 2 * config.pollingInterval);
   }
   if (newFields.every((element) => element !== "")) {
    const winner = this.getWinner(newFields);
    if (winner) {
     this.endMessage = winner === this.player ? "You won!" : "You lost!";
    } else {
     this.endMessage = "It's a draw!";
    }
    setTimeout(() => {
     this.endGame();
    }, 2 * config.pollingInterval);
   }
  },
 },
};
</script>