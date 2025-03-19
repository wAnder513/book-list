<template>
  <div class="input_wrapper">
    <label v-if="label" class="input_label">{{ label }}</label>
    <textarea
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="input_field"
      :placeholder="placeholder"
      :rows="rows"
      :cols="cols"
    ></textarea>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
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
});

defineEmits(["update:modelValue"]);
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
