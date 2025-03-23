<script setup>
import { useBooksStore } from "../../store/books";
import logo from "../../assets/img/book-logo.svg";
import search from "../../assets/img/search.svg";
import { CATALOG_AND_SEARCH_TEXTS } from "../../constants";
import { ref, watch } from "vue";

const store = useBooksStore();

const emit = defineEmits(["openModal"]);

const navigationBookList = ref({
  text: CATALOG_AND_SEARCH_TEXTS.CATALOG,
  variable: store.booksCount,
});

watch(
  [() => store.searchBook, () => store.books],
  ([newSearchBook]) => {
    if (newSearchBook === "") {
      navigationBookList.value.text = CATALOG_AND_SEARCH_TEXTS.CATALOG;
      navigationBookList.value.variable = `${store.booksCount}`;
    } else {
      navigationBookList.value.text = CATALOG_AND_SEARCH_TEXTS.SEARCH;
      navigationBookList.value.variable = `«${newSearchBook}»`;
    }
  },
  { deep: true, immediate: true }
);

function openModal() {
  emit("openModal");
}

function setSearchBook(event) {
  store.setSearch(event.target.value);
}
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header_wrapper">
        <div class="header_container">
          <div class="header_logo">
            <img class="header_logo-img" :src="logo" alt="logo" />
          </div>

          <div class="header_search-wrapper">
            <img :src="search" alt="search" class="header_search-input-icon" />
            <input
              class="header_search-input"
              type="text"
              placeholder="Найти ту самую книгу"
              :value="store.searchBook"
              @input="setSearchBook"
            />
          </div>
        </div>

        <div class="header_books">
          <div class="header_books-counter">
            <span class="header_books-counter-text">{{
              navigationBookList.text
            }}</span>
            <span class="header_books-counter-number">{{
              navigationBookList.variable
            }}</span>
          </div>

          <button @click="openModal" class="header_books-add-book">
            <span class="header_books-img"></span>
            Добавить книгу
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@use "../../assets/scss/var.scss" as *;

.header {
  background-color: $light-color;
  padding: 16px 0;
  margin-bottom: 16px;

  .header_wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .header_container {
    display: flex;
    gap: 25px;
    align-items: center;

    .header_logo-img {
      width: 55px;
      height: 41px;
    }
  }

  .header_search-wrapper {
    position: relative;
    display: inline-block;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;

    .header_search-input-icon {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
    }

    .header_search-input {
      width: 100%;
      padding: 10px 10px 10px 36px;
    }
  }

  .header_books {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .header_books-counter {
      display: flex;
      align-items: center;
      gap: 8px;

      .header_books-counter-text {
        font-size: 20px;
        color: $dark-color;
        font-weight: 600;
      }

      .header_books-counter-number {
        font-size: 20px;
        color: $dark-gray-color;
        font-weight: 600;
      }
    }

    .header_books-add-book {
      display: flex;
      gap: 4px;
      align-items: center;
      background-color: $green-color;
      border: none;
      border-radius: 8px;
      padding: 10px 12px;
      color: $white-color;
      font-size: 14px;

      .header_books-img {
        width: 20px;
        height: 20px;
        background-image: url("../../assets/img/add-button-default.svg");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }

      &:hover,
      &:focus {
        .header_books-img {
          background-image: url("../../assets/img/add-button-active.svg");
        }
      }
    }
  }
}
</style>
