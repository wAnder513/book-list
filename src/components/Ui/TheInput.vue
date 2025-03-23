<template>
  <div class="input_wrapper">
    <label v-if="label" class="input_label">{{ label }}</label>
    <textarea
      v-if="type !== 'number'"
      :value="modelValue"
      @input="handleInput"
      class="input_field"
      :placeholder="placeholder"
      :rows="rows"
      :cols="cols"
    ></textarea>
    <input
      v-else
      type="text"
      :value="modelValue"
      @input="handleInput"
      class="input_field"
      :placeholder="placeholder"
    />
    <span v-if="error" class="error_message">{{ error }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  rows: {
    type: Number,
    default: 1,
  },
  cols: {
    type: Number,
    default: 50,
  },
  error: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
});

const emit = defineEmits(["update:modelValue"]);

const handleInput = (event) => {
  let value = event.target.value;

  // Если тип поля — число, проверяем, что введено число
  if (props.type === "number") {
    if (!/^\d*$/.test(value)) {
      return; // Игнорируем ввод, если это не число
    }
  }

  emit("update:modelValue", value);
};
</script>

<style scoped lang="scss">
@use "../../assets/scss/var.scss" as *;

.input_wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}

.input_label {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  color: $dark-color;
}

.input_field {
  padding: 10px 12px;
  font-size: 14px;
  border-radius: 8px;
  border: none;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s;
  background-color: $light-color;
  line-height: 1;
  resize: none;
}
</style>
