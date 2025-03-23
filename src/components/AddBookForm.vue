<script setup>
import { ref } from "vue";
import TheInput from "./Ui/TheInput.vue";
import TheCheckbox from "./Ui/TheCheckbox.vue";
import { useBooksStore } from "@/store/books";

const store = useBooksStore();
const emit = defineEmits(["closeModal"]);

const form = ref({
  name: {
    label: "Название",
    placeholder: "Название произведения",
    modelValue: "",
    error: "",
  },
  author: {
    label: "Автор",
    placeholder: "Имя и фамилия автора",
    modelValue: "",
    error: "",
  },
  year: {
    label: "Год",
    placeholder: "Год выпуска",
    modelValue: "",
    error: "",
    type: "number",
  },
  genre: {
    label: "Жанр",
    placeholder: "Жанр произведения",
    modelValue: "",
    error: "",
  },
});

const readConditions = ref({
  isChecked: false,
  error: "",
});

function validateForm() {
  let isValid = true;

  for (const key in form.value) {
    const field = form.value[key];

    if (field.modelValue.trim() === "") {
      field.error = "Обязательное поле";
      isValid = false;
    } else if (
      field.type === "number" &&
      (isNaN(field.modelValue) || field.modelValue > new Date().getFullYear())
    ) {
      field.error = isNaN(field.modelValue)
        ? "Поле должно быть числом"
        : "Книга из будущего?:)";
      isValid = false;
    } else {
      field.error = "";
    }
  }

  if (!readConditions.value.isChecked) {
    readConditions.value.error = "Примите условия конфиденциальности";
  } else {
    readConditions.value.error = "";
  }

  return isValid;
}

function submitForm() {
  if (!validateForm()) {
    return;
  }

  store.addBook({
    id: Date.now(),
    name: form.value.name.modelValue,
    author: form.value.author.modelValue,
    year: form.value.year.modelValue,
    genre: form.value.genre.modelValue,
  });

  emit("closeModal");
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <TheInput
      class="form_input"
      v-for="(field, key) in form"
      :key="key"
      :label="field.label"
      :placeholder="field.placeholder"
      v-model="field.modelValue"
      :error="field.error"
    ></TheInput>

    <TheCheckbox v-model="readConditions.isChecked">
      <div>
        <div class="checkbox_wrapper">
          <span class="checkbox_text">Я согласен с условиями&nbsp;</span>
          <a href="#" class="checkbox_link">Политикой конфиденциальности</a>
        </div>

        <span v-if="readConditions.error" class="error_message">{{
          readConditions.error
        }}</span>
      </div>
    </TheCheckbox>

    <div class="form_submit">
      <button type="submit" class="form_submit-button button_add">
        <span class="button_add-img"></span>
        Добавить
      </button>
    </div>
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

.form_submit {
  display: flex;
  justify-content: flex-end;

  .form_submit-button {
    display: flex;
    gap: 4px;
    align-items: center;
    background-color: $green-color;
    border: none;
    border-radius: 8px;
    padding: 10px 12px;
    color: $white-color;
    font-size: 14px;
  }
}
</style>
