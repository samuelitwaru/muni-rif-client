<template>
  <div>
    <p align="center" class="text-h5">
      <span>{{ currentText }}</span>
      <span class="cursor" v-if="showCursor">|</span>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: ["Creating new ideas...", "Transforming Lives..."],
      currentMessageIndex: 0,
      currentText: "",
      currentIndex: 0,
      showCursor: true,
    };
  },
  mounted() {
    this.typeText();
  },
  methods: {
    typeText() {
      if (this.currentIndex < this.messages[this.currentMessageIndex].length) {
        this.currentText +=
          this.messages[this.currentMessageIndex][this.currentIndex];
        this.currentIndex++;
        setTimeout(this.typeText, 100); // Adjust typing speed here
      } else {
        // Finished typing, wait for a moment, then delete text
        setTimeout(this.deleteText, 1000); // Adjust the pause between typing and deleting here
      }
    },
    deleteText() {
      if (this.currentIndex > 0) {
        this.currentText = this.currentText.slice(0, -1);
        this.currentIndex--;
        setTimeout(this.deleteText, 50); // Adjust deletion speed here
      } else {
        // Finished deleting, move to the next message
        this.currentMessageIndex =
          (this.currentMessageIndex + 1) % this.messages.length;
        setTimeout(this.typeText, 1000); // Adjust the pause before typing the next message
      }
    },
  },
};
</script>

<style>
.cursor {
  animation: blink 0.7s infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
