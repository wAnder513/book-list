import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useBooksStore = defineStore("books", () => {
  const books = ref([]);
  const filteredBooks = ref([]);

  const booksCount = computed(() => books.value.length);

  function addBook(book) {
    books.value.push(book);
  }

  function removeBook(book) {
    books.value = books.value.filter((b) => b !== book);
  }

  function filterBooks(filteredValue) {
    books.value = books.value.filter((b) => b[filteredValue]);
  }

  return { books, filteredBooks, booksCount, addBook, removeBook, filterBooks };
});
