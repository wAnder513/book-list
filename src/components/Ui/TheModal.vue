<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="modal_overlay" @click="closeModal">
        <div class="modal_content" @click.stop>
          <div class="modal_header">
            <div v-if="title">
              <h3 class="modal_title">{{ title }}</h3>
            </div>

            <slot v-else name="title"></slot>
          </div>

          <button class="modal_close" @click="closeModal">&times;</button>

          <div class="modal_body">
            <slot name="body"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const closeModal = () => {
  emit("update:modelValue", false);
};
</script>

<style scoped lang="scss">
@use "../../assets/scss/var.scss" as *;
.modal_overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal_content {
  position: relative;
  background: white;
  padding: 32px;
  border-radius: 8px;
  min-width: 300px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 32px 16px 0;
}

.modal_title {
  margin: 0;
  font-size: 20px;
  color: $dark-color;
}

.modal_close {
  position: absolute;
  top: 32px;
  right: 32px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: $dark-gray-color;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.modal_close:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.modal_body {
  margin-bottom: 20px;
}

/* Анимации */
.modal_enter-active,
.modal_leave-active {
  transition: opacity 0.3s ease;
}

.modal_enter-from,
.modal_leave-to {
  opacity: 0;
}

@media (max-width: 480px) {
  .modal_content {
    width: 100%;
    height: 100%;
    max-height: none;
    max-width: none;
    padding: 28px;
  }
}
</style>
