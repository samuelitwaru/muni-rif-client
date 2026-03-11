<template>
  <div>
    <!-- Floating Button -->
    <button class="support-fab" @click="toggle">💬</button>
    <!-- Support Panel -->
    <transition name="slide-up">
      <div v-if="open" class="support-panel">
        <div class="support-header">
          <span>Support</span>
          <button class="close-btn" @click="open = false">✕</button>
        </div>

        <div class="support-body">
          <p>
            Send an email to
            <a href="gms@muni.ac.ug" mailto="gms@muni.ac.ug">gms@muni.ac.ug</a>
            for any kind of assistance
          </p>

          <q-input v-model="text" outlined type="textarea" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

const open = ref(false);

const emit = defineEmits(["action"]);

const toggle = () => {
  open.value = !open.value;
};

const handleAction = (type) => {
  emit("action", type);
  open.value = false;
};
</script>

<style scoped>
/* Floating Button */
.support-fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  font-size: 24px;
  background-color: #4f46e5;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  z-index: 9999;
  transition: transform 0.2s ease;
}

.support-fab:hover {
  transform: scale(1.1);
}

/* Support Panel */
.support-panel {
  position: fixed;
  bottom: 100px;
  right: 24px;
  min-width: 300px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  z-index: 9999;
}

.support-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #4f46e5;
  color: white;
  padding: 12px;
  font-weight: bold;
}

.close-btn {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

.support-body {
  padding: 16px;
}

.support-option {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: none;
  border-radius: 6px;
  background: #f3f4f6;
  cursor: pointer;
  transition: background 0.2s ease;
}

.support-option:hover {
  background: #e5e7eb;
}

/* Animation */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
