<template>
  <div
    class="slider"
    ref="sliderRef"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <div class="slider__track" :style="trackStyle">
      <div
        v-for="(image, index) in loopedImages"
        :key="index"
        class="slider__slide"
        ref="slideRefs"
      >
        <img :src="image.url" :alt="image.alt ?? ''" @load="measureSlides" />
      </div>
    </div>

    <button
      class="slider__arrow slider__arrow--prev"
      @click="prev"
      aria-label="Previous image"
    >
      ←
    </button>
    <button
      class="slider__arrow slider__arrow--next"
      @click="next"
      aria-label="Next image"
    >
      →
    </button>

    <div class="slider__dots">
      <button
        v-for="(image, index) in images"
        :key="index"
        class="slider__dot"
        :class="{ active: realIndex === index }"
        @click="goTo(index)"
        :aria-label="`Go to image ${index + 1}`"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from "vue";

const props = defineProps({
  images: { type: Array, default: () => [] },
});

const sliderRef = ref(null);
const slideRefs = ref([]);
const slideWidths = ref([]);

const loopedImages = computed(() => [
  props.images[props.images.length - 1],
  ...props.images,
  props.images[0],
]);

const current = ref(1);
const isTransitioning = ref(true);

const realIndex = computed(() => {
  if (current.value === 0) return props.images.length - 1;
  if (current.value === loopedImages.value.length - 1) return 0;
  return current.value - 1;
});

const GAP = 1; // px —

// Calculate offset by summing widths of slides before current
const currentOffset = computed(() => {
  if (!slideWidths.value.length) return 0;
  let offset = 0;
  for (let i = 0; i < current.value; i++) {
    offset += (slideWidths.value[i] ?? 0) + GAP;
  }
  // Center the current slide in the viewport
  const sliderWidth = sliderRef.value?.offsetWidth ?? 0;
  const currentSlideWidth = slideWidths.value[current.value] ?? 0;
  const centerOffset = (sliderWidth - currentSlideWidth) / 2;
  return offset - centerOffset;
});

const trackStyle = computed(() => ({
  transform: `translateX(${-currentOffset.value}px)`,
  transition: isTransitioning.value ? "transform 0.4s ease" : "none",
}));

const measureSlides = async () => {
  await nextTick();
  if (!slideRefs.value.length) return;
  slideWidths.value = slideRefs.value.map((slide) => slide.offsetWidth);
};

onMounted(() => {
  measureSlides();
});

let touchStartX = 0;

const prev = () => {
  isTransitioning.value = true;
  current.value--;
};
const next = () => {
  isTransitioning.value = true;
  current.value++;
};
const goTo = (index) => {
  isTransitioning.value = true;
  current.value = index + 1;
};

const onTouchStart = (e) => {
  touchStartX = e.touches[0].clientX;
};
const onTouchEnd = (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    diff > 0 ? next() : prev();
  }
};

watch(current, (val) => {
  if (val === 0) {
    setTimeout(() => {
      isTransitioning.value = false;
      current.value = props.images.length;
    }, 400);
  }
  if (val === loopedImages.value.length - 1) {
    setTimeout(() => {
      isTransitioning.value = false;
      current.value = 1;
    }, 400);
  }
});
</script>

<style scoped>
.slider {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.slider__track {
  display: flex;
  align-items: flex-start;
  gap: 1px;
  will-change: transform;
}

.slider__slide {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
}

.slider__slide img {
  max-height: 90vh;
  width: auto;
  height: auto;
  display: block;
}

.slider__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: var(--text-xl, 1.5rem);
  padding: var(--space-4, 1rem);
  z-index: 10;
  opacity: 0.7;
  transition: opacity 0.15s ease;
}

.slider__arrow:hover {
  opacity: 1;
}
.slider__arrow--prev {
  left: 0;
}
.slider__arrow--next {
  right: 0;
}

.slider__dots {
  position: absolute;
  bottom: var(--space-4, 1rem);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: var(--space-2, 0.5rem);
}

.slider__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: currentColor;
  opacity: 0.3;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.15s ease;
}

.slider__dot.active {
  opacity: 1;
}
</style>
