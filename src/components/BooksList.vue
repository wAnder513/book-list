<script setup>
import BookItem from "./BookItem.vue";
</script>

<template>
  <div class="books-list">
    <BookItem />
  </div>
</template>

<style scoped lang="scss">
.books-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
