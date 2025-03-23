<script setup>
import { useBooksStore } from "@/store/books";
import BookItem from "./BookItem.vue";
import { computed, ref, watch } from "vue";

const booksList = ref([]);

const store = useBooksStore();

const empryMessage = computed(() =>
  store.searchBook.length > 0
    ? "По вашему запросу ничего не найдено"
    : "Список книг пуст, добавте первую"
);

watch(
  () => store.searchBook,
  (newValue, oldValue) => {
    if (newValue !== "") {
      booksList.value = store.filteredBooks;
    } else {
      booksList.value = store.books;
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="container">
    <div v-if="booksList && booksList.length > 0" class="books-list">
      <BookItem v-for="book in booksList" :book="book" :key="book.id" />
    </div>

    <div v-else>{{ empryMessage }}</div>
  </div>
</template>

<style scoped lang="scss">
.books-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
