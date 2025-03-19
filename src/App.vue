<script setup>
import TheHeader from "./components/Ui/TheHeader.vue";
import BooksList from "./components/BooksList.vue";
import TheModal from "./components/Ui/TheModal.vue";
import AddBookForm from "./components/AddBookForm.vue";
import { ref } from "vue";

const isModalOpen = ref(false);

function openModal() {
  isModalOpen.value = true;
}
</script>

<template>
  <div>
    <TheHeader @openModal="openModal" />

    <main>
      <BooksList />
    </main>

    <TheModal v-model="isModalOpen">
      <template #title>
        <div class="modal_header-wrapper">
          <h3 class="modal_header-title">Добавить книгу</h3>
          <span class="modal_header-description">
            Заполните все поля и добавьте книгу в список
          </span>
        </div>
      </template>

      <template #body>
        <AddBookForm />
      </template>
    </TheModal>
  </div>
</template>

<style scoped lang="scss">
@use "./assets/scss/var.scss" as *;

.modal_header-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;

  .modal_header-title {
    margin: 0;
    font-size: 20px;
    color: $dark-color;
  }

  .modal_header-description {
    margin: 0;
    font-size: 14px;
    color: $dark-gray-color;
  }
}
</style>
