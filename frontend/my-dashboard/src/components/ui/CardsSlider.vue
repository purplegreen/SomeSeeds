<template>
  <div
    class="cards-slider"
    ref="sliderRef"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <div class="cards-slider__track" :style="trackStyle">
      <div
        v-for="(item, index) in displayItems"
        :key="index"
        class="cards-slider__slide"
        ref="slideRefs"
      >
        <ActivationCard v-bind="item" />
      </div>
    </div>

    <button
      class="cards-slider__arrow cards-slider__arrow--prev"
      @click="prev"
      :disabled="current === 0"
      aria-label="Previous"
    >
      <img src="/icons/arrow_left.svg" alt="Previous" />
    </button>
    <button
      class="cards-slider__arrow cards-slider__arrow--next"
      @click="next"
      :disabled="current === displayItems.length - 1"
      aria-label="Next"
    >
      <img src="/icons/arrow_right.svg" alt="Next" />
    </button>

    <div class="cards-slider__dots">
      <button
        v-for="(_, index) in props.items.length"
        :key="index"
        class="cards-slider__dot"
        :class="{ active: current === index }"
        @click="goTo(index)"
        :aria-label="`Go to card ${index + 1}`"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from "vue";
import ActivationCard from "./ActivationCard.vue";

const props = defineProps({
  items: { type: Array, required: true },
  gap: { type: Number, default: 12 },
});

const sliderRef = ref(null);
const slideRefs = ref([]);
const slideWidths = ref([]);
const sliderWidth = ref(0);
const current = ref(0);

const displayItems = computed(() => [...props.items, ...props.items]);

const currentOffset = computed(() => {
  if (!slideWidths.value.length) return 0;
  let offset = 0;
  for (let i = 0; i < current.value; i++) {
    offset += (slideWidths.value[i] ?? 0) + props.gap;
  }
  // no centering — align left with a small padding
  return offset - 24; // 24px left padding so first card doesn't hug the edge
});

const trackStyle = computed(() => ({
  transform: `translateX(${-currentOffset.value}px)`,
  transition: "transform 0.3s ease",
}));

const measureSlides = async () => {
  await nextTick();
  if (!slideRefs.value.length) return;
  const images = sliderRef.value?.querySelectorAll("img") ?? [];
  await Promise.all(
    [...images].map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.addEventListener("load", resolve);
        img.addEventListener("error", resolve);
      });
    }),
  );
  slideWidths.value = slideRefs.value.map((slide) => slide.offsetWidth);
  sliderWidth.value = sliderRef.value?.offsetWidth ?? 0;
};

onMounted(() => {
  measureSlides();
  window.addEventListener("resize", measureSlides);
});

watch(current, (val) => {
  if (val >= props.items.length) {
    const track = sliderRef.value?.querySelector(".cards-slider__track");
    track?.addEventListener(
      "transitionend",
      () => {
        track.style.transition = "none";
        current.value = val - props.items.length;
        nextTick(() => {
          requestAnimationFrame(() => {
            track.style.transition = "";
          });
        });
      },
      { once: true },
    );
  }
});

const prev = () => {
  if (current.value > 0) current.value--;
};
const next = () => {
  if (current.value < displayItems.value.length - 1) current.value++;
};
const goTo = (index) => {
  current.value = index;
};

let touchStartX = 0;
const onTouchStart = (e) => {
  touchStartX = e.touches[0].clientX;
};
const onTouchEnd = (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    diff > 0 ? next() : prev();
  }
};
</script>

<style scoped>
.cards-slider {
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 80vh;
}

.cards-slider__track {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  height: 100%;
  will-change: transform;
  gap: 2rem;
}

.cards-slider__slide {
  flex-shrink: 0;
  height: 100%;
  width: calc(48vw - 1rem); /* leaves ~ visible for next card */
}

.cards-slider__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  width: 5rem;
  height: auto;
  padding: var(--space-4, 1rem);
  z-index: 10;
  opacity: 0.7;
  transition: opacity 0.15s ease;
}

.cards-slider__arrow:hover {
  opacity: 1;
}
.cards-slider__arrow:disabled {
  opacity: 0.2;
  cursor: default;
}
.cards-slider__arrow--prev {
  left: 0;
}
.cards-slider__arrow--next {
  right: 0;
}

.cards-slider__dots {
  position: absolute;
  bottom: var(--space-4, 1rem);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: var(--space-2, 0.5rem);
}

.cards-slider__dot {
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

.cards-slider__dot.active {
  opacity: 1;
}

@media (max-width: 768px) {
  .cards-slider__slide {
    width: 85vw;
  }
}
</style>
