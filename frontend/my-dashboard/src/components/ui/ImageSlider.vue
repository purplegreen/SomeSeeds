<template>
  <div class="slider" ref="sliderRef">
    <div class="slider__track" ref="trackRef">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="slider__slide"
        @click="goTo(index)"
      >
        <img :src="image.url" :alt="image.alt ?? ''" />
      </div>
    </div>

    <button
      class="slider__arrow slider__arrow--prev"
      @click="prev"
      aria-label="Previous image"
    >
      <img src="/icons/arrow-left.svg" alt="Previous" />
    </button>
    <button
      class="slider__arrow slider__arrow--next"
      @click="next"
      aria-label="Next image"
    >
      <img src="/icons/arrow-right.svg" alt="Next" />
    </button>

    <div class="slider__dots">
      <button
        v-for="(_, index) in images"
        :key="index"
        class="slider__dot"
        :class="{ active: activeIndex === index }"
        @click="goTo(index)"
        :aria-label="`Go to image ${index + 1}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(Draggable, InertiaPlugin);

defineOptions({ name: "ImageSlider" });

interface SliderImage {
  url: string;
  alt?: string;
}

interface LoopConfig {
  paused?: boolean;
  draggable?: boolean;
  center?: boolean;
  speed?: number;
  snap?: false | number;
  repeat?: number;
  reversed?: boolean;
  paddingRight?: number;
  onChange?: (element: HTMLElement, index: number) => void;
}

interface LoopTimeline extends gsap.core.Timeline {
  toIndex: (index: number, vars?: gsap.TweenVars) => gsap.core.Tween;
  closestIndex: (setCurrent?: boolean) => number;
  current: () => number;
  next: (vars?: gsap.TweenVars) => gsap.core.Tween;
  previous: (vars?: gsap.TweenVars) => gsap.core.Tween;
  times: number[];
  draggable?: Draggable;
}

const props = defineProps<{ images?: SliderImage[] }>();
const images = computed(() => props.images ?? []);

const sliderRef = ref<HTMLDivElement | null>(null);
const trackRef = ref<HTMLDivElement | null>(null);
const activeIndex = ref(0);
let loop: LoopTimeline | null = null;

// The horizontalLoop helper by GSAP
function horizontalLoop(
  items: HTMLElement[] | NodeList,
  config: LoopConfig,
): LoopTimeline {
  let timeline: LoopTimeline;
  const itemsArray = gsap.utils.toArray<HTMLElement>(items);
  config = config || {};
  gsap.context(() => {
    const items = itemsArray;
    let onChange = config.onChange,
      lastIndex = 0,
      tl = gsap.timeline({
        repeat: config.repeat,
        onUpdate:
          onChange &&
          function () {
            let i = tl.closestIndex();
            if (lastIndex !== i) {
              lastIndex = i;
              onChange(items[i], i);
            }
          },
        paused: config.paused,
        defaults: { ease: "none" },
        onReverseComplete: () =>
          tl.totalTime(tl.rawTime() + tl.duration() * 100),
      }),
      length = items.length,
      startX = items[0].offsetLeft,
      times: number[] = [],
      widths: number[] = [],
      spaceBefore: number[] = [],
      xPercents: number[] = [],
      curIndex = 0,
      indexIsDirty = false,
      center = config.center,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap =
        config.snap === false
          ? (v: number) => v
          : gsap.utils.snap(config.snap || 1),
      timeOffset = 0,
      container =
        center === true
          ? items[0].parentNode
          : gsap.utils.toArray(center as unknown as string)[0] ||
            items[0].parentNode,
      totalWidth: number,
      getTotalWidth = () =>
        items[length - 1].offsetLeft +
        (xPercents[length - 1] / 100) * widths[length - 1] -
        startX +
        spaceBefore[0] +
        items[length - 1].offsetWidth *
          (gsap.getProperty(items[length - 1], "scaleX") as number) +
        (config.paddingRight || 0),
      populateWidths = () => {
        let b1 = (container as HTMLElement).getBoundingClientRect(),
          b2: DOMRect;
        items.forEach((el, i) => {
          widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string);
          xPercents[i] = snap(
            (parseFloat(gsap.getProperty(el, "x", "px") as string) /
              widths[i]) *
              100 +
              (gsap.getProperty(el, "xPercent") as number),
          );
          b2 = el.getBoundingClientRect();
          spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
          b1 = b2;
        });
        gsap.set(items, { xPercent: (i) => xPercents[i] });
        totalWidth = getTotalWidth();
      },
      timeWrap: (value: number) => number,
      populateOffsets = () => {
        timeOffset = center
          ? (tl.duration() * ((container as HTMLElement).offsetWidth / 2)) /
            totalWidth
          : 0;
        center &&
          times.forEach((_t, i) => {
            times[i] = timeWrap(
              tl.labels["label" + i] +
                (tl.duration() * widths[i]) / 2 / totalWidth -
                timeOffset,
            );
          });
      },
      getClosest = (values: number[], value: number, wrap: number) => {
        let i = values.length,
          closest = 1e10,
          index = 0,
          d;
        while (i--) {
          d = Math.abs(values[i] - value);
          if (d > wrap / 2) d = wrap - d;
          if (d < closest) {
            closest = d;
            index = i;
          }
        }
        return index;
      },
      populateTimeline = () => {
        let i, item, curX, distanceToStart, distanceToLoop;
        tl.clear();
        for (i = 0; i < length; i++) {
          item = items[i];
          curX = (xPercents[i] / 100) * widths[i];
          distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
          distanceToLoop =
            distanceToStart +
            widths[i] * (gsap.getProperty(item, "scaleX") as number);
          tl.to(
            item,
            {
              xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
              duration: distanceToLoop / pixelsPerSecond,
            },
            0,
          )
            .fromTo(
              item,
              {
                xPercent: snap(
                  ((curX - distanceToLoop + totalWidth) / widths[i]) * 100,
                ),
              },
              {
                xPercent: xPercents[i],
                duration:
                  (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
                immediateRender: false,
              },
              distanceToLoop / pixelsPerSecond,
            )
            .add("label" + i, distanceToStart / pixelsPerSecond);
          times[i] = distanceToStart / pixelsPerSecond;
        }
        timeWrap = gsap.utils.wrap(0, tl.duration());
      },
      refresh = (deep?: boolean) => {
        let progress = tl.progress();
        tl.progress(0, true);
        populateWidths();
        deep && populateTimeline();
        populateOffsets();
        deep && tl.draggable && tl.paused()
          ? tl.time(times[curIndex], true)
          : tl.progress(progress, true);
      },
      onResize = () => refresh(!tl.draggable?.isDragging),
      proxy: HTMLElement;

    gsap.set(items, { x: 0 });
    populateWidths();
    populateTimeline();
    populateOffsets();
    window.addEventListener("resize", onResize);

    function toIndex(index: number, vars?: gsap.TweenVars) {
      vars = vars || {};
      Math.abs(index - curIndex) > length / 2 &&
        (index += index > curIndex ? -length : length);
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex && index !== curIndex) {
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      if (time < 0 || time > tl.duration()) {
        vars.modifiers = { time: timeWrap };
      }
      curIndex = newIndex;
      vars.overwrite = true;
      gsap.killTweensOf(proxy);
      return vars.duration === 0
        ? tl.time(timeWrap(time))
        : tl.tweenTo(time, vars);
    }

    tl.toIndex = (index: number, vars?: gsap.TweenVars) => toIndex(index, vars);
    tl.closestIndex = (setCurrent?: boolean) => {
      let index = getClosest(times, tl.time(), tl.duration());
      if (setCurrent) {
        curIndex = index;
        indexIsDirty = false;
      }
      return index;
    };
    tl.current = () => (indexIsDirty ? tl.closestIndex(true) : curIndex);
    tl.next = (vars?: gsap.TweenVars) => toIndex(tl.current() + 1, vars);
    tl.previous = (vars?: gsap.TweenVars) => toIndex(tl.current() - 1, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true);

    if (config.reversed) {
      (tl.vars.onReverseComplete as () => void)?.();
      tl.reverse();
    }

    if (config.draggable && typeof Draggable === "function") {
      proxy = document.createElement("div");
      let wrap = gsap.utils.wrap(0, 1),
        ratio: number,
        startProgress: number,
        draggable: Draggable,
        wasPlaying: boolean,
        align = () =>
          tl.progress(
            wrap(startProgress + (draggable.startX - draggable.x) * ratio),
          ),
        syncIndex = () => tl.closestIndex(true);

      draggable = Draggable.create(proxy, {
        trigger: items[0].parentNode as HTMLElement,
        type: "x",
        onPressInit() {
          gsap.killTweensOf(tl);
          wasPlaying = !tl.paused();
          tl.pause();
          startProgress = tl.progress();
          refresh(false);
          ratio = 1 / totalWidth;
          gsap.set(proxy, { x: startProgress / -ratio });
        },
        onDrag: align,
        onThrowUpdate: align,
        overshootTolerance: 0,
        inertia: true,
        snap(value: number) {
          let time = -(value * ratio) * tl.duration(),
            wrappedTime = timeWrap(time),
            snapTime = times[getClosest(times, wrappedTime, tl.duration())],
            dif = snapTime - wrappedTime;
          Math.abs(dif) > tl.duration() / 2 &&
            (dif += dif < 0 ? tl.duration() : -tl.duration());
          return (time + dif) / tl.duration() / -ratio;
        },
        onRelease() {
          syncIndex();
          draggable.isThrowing && (indexIsDirty = true);
        },
        onThrowComplete: () => {
          syncIndex();
          wasPlaying && tl.play();
        },
      })[0];
      tl.draggable = draggable;
    }

    tl.closestIndex(true);
    lastIndex = curIndex;
    onChange && onChange(items[curIndex], curIndex);
    timeline = tl as LoopTimeline;
    return () => window.removeEventListener("resize", onResize);
  });
  return timeline!;
}

const prev = () => loop?.previous({ duration: 0.4, ease: "power1.inOut" });

const next = () => loop?.next({ duration: 0.4, ease: "power1.inOut" });

const goTo = (index: number) => {
  if (loop?.current() === index) return;
  loop?.toIndex(index, { duration: 0.4, ease: "power1.inOut" });
};

onMounted(async () => {
  await nextTick();
  const slides = trackRef.value?.querySelectorAll(".slider__slide");
  if (!slides?.length) return;

  loop = horizontalLoop(slides, {
    paused: true,
    draggable: true,
    center: true,
    onChange: (_, index) => {
      activeIndex.value = index;
    },
  });
});

onBeforeUnmount(() => {
  loop?.kill();
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
  cursor: grab;
}

.slider__slide:active {
  cursor: grabbing;
}

.slider__slide img {
  max-height: 90vh;
  width: auto;
  height: auto;
  display: block;
  pointer-events: none;
  user-select: none;
}

.slider__arrow {
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
