<script setup>
import { ref } from "vue";

import TheInput from "./Ui/TheInput.vue";
import TheCheckbox from "./Ui/TheCheckbox.vue";

const form = ref({
  name: {
    label: "Название",
    placeholder: "Название произведения",
    modelValue: "",
  },
  author: {
    label: "Автор",
    placeholder: "Имя и фамилия автора",
    modelValue: "",
  },
  year: {
    label: "Год",
    placeholder: "Год выпуска",
    modelValue: "",
  },
  genre: {
    label: "Жанр",
    placeholder: "Жанр произведения",
    modelValue: "",
  },
});

const isRead = ref(false);
</script>

<template>
  <form>
    <TheInput
      v-for="field in form"
      :key="field.name"
      :label="field.label"
      :placeholder="field.placeholder"
      :modelValue="field.modelValue"
      class="form_input"
    ></TheInput>

    <TheCheckbox :modelValue="isRead">
      <div class="checkbox_wrapper">
        <span class="checkbox_text">Я согласен с условиями&nbsp;</span>
        <a href="#" class="checkbox_link">Политикой конфиденциальности</a>
      </div>
    </TheCheckbox>
  </form>
</template>

<style scoped lang="scss">
@use "../assets/scss/var.scss" as *;

.form_input {
  margin-bottom: 16px;
}

.checkbox_wrapper {
  display: flex;
  align-items: center;

  .checkbox_text {
    font-size: 14px;
    color: $dark-gray-color;
  }

  .checkbox_link {
    color: $dark-gray-color;

    &:hover {
      text-decoration: none;
    }
  }
}
</style>
