<script setup>
import { ref, watch } from "vue";

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

const textareaRef = ref(null);

function handleInput(event) {
  let value = event.target.value;

  if (props.type === "number") {
    if (!/^\d*$/.test(value)) {
      return;
    }
  }

  emit("update:modelValue", value);
  autoResizeTextarea();
}

function autoResizeTextarea() {
  if (textareaRef.value) {
    textareaRef.value.style.height = "auto";
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
  }
}

watch(
  () => props.modelValue,
  () => {
    autoResizeTextarea();
  },
  { immediate: true }
);
</script>

<template>
  <div class="input_wrapper">
    <label v-if="label" class="input_label">{{ label }}</label>
    <textarea
      v-if="type !== 'number'"
      ref="textareaRef"
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
  font-family: inherit;
  transition: border-color 0.2s;
  background-color: $light-color;
  line-height: 1;
  resize: none;
  overflow: hidden;
}

.error_message {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}
</style>
