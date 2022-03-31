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

export default {
 name: "Board",
 data() {
  return {
   fields: ["", "", "", "", "", "", "", "", ""],
  };
 },
 methods: {
  updateField(index) {
   this.fields.splice(index, 1, 'X');
  },
 },
};
</script>