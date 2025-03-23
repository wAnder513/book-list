<script setup>
const props = defineProps({
  book: { type: Object, requred: true },
});
</script>

<template>
  <div class="book">
    <span class="book_name">{{ props.book.name }}</span>
    <div class="book_info">
      <span class="book_info-text">{{ props.book.author }}</span
      ><span class="book_info-text">{{ props.book.year }}</span
      ><span class="book_info-text">{{ props.book.genre }} </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/scss/var.scss" as *;

.book {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border-radius: 8px;
  background-color: $light-color;

  .book_name {
    font-size: 16px;
    word-wrap: break-word;
  }

  .book_info {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;

    .book_info-text {
      font-size: 14px;
      color: $dark-gray-color;
    }
  }
}
</style>
