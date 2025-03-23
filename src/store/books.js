import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";

export const useBooksStore = defineStore("books", () => {
  const books = ref([]);
  const filteredBooks = ref([]);
  const searchBook = ref("");

  const booksCount = computed(() => books.value.length);

  function addBook(book) {
    books.value.push(book);

    searchBook.value = "";
  }

  function removeBook(book) {
    books.value = books.value.filter((b) => b !== book);
  }

  function filterBooks() {
    if (searchBook.value.length > 0) {
      filteredBooks.value = books.value.filter((book) =>
        book.name.toLowerCase().includes(searchBook.value.toLowerCase())
      );
    } else {
      filteredBooks.value = [];
    }
  }

  function setSearch(search) {
    searchBook.value = search;
  }

  watch(
    searchBook,
    () => {
      if (searchBook.value.length > 0) {
        filterBooks();
      } else {
        filteredBooks.value = [];
      }
    },
    { immediate: true }
  );

  return {
    books,
    filteredBooks,
    searchBook,
    booksCount,
    addBook,
    removeBook,
    filterBooks,
    setSearch,
  };
});
