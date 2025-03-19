<template>
  <label class="checkbox-wrapper">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      class="checkbox-input"
    />
    <span class="checkbox-custom"></span>
    <span class="checkbox-label">
      <slot></slot>
    </span>
  </label>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:modelValue"]);
</script>

<style scoped lang="scss">
@use "../../assets/scss/var.scss" as *;

.checkbox-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  position: relative;
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkbox-custom {
  position: relative;
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid #e0e0e0;
  border-radius: 3px;
  margin-right: 8px;
  transition: all 0.2s ease;
}

.checkbox-input:checked + .checkbox-custom {
  background-color: $green-color;
  border-color: $green-color;
}

.checkbox-input:checked + .checkbox-custom::after {
  content: "";
  position: absolute;
  left: 5px;
  top: 2px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-label {
  font-size: 14px;
  color: $dark-color;
}
</style>
