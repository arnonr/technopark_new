<template>
  <section :class="`brand__area ${el_style ? 'pt-30' : ''}`">
    <div class="container">
      <div
        class="brand__item-wrapper-6 d-flex flex-wrap justify-content-between"
        v-if="icons.length != 0"
      >
        <div
          class="brand__item-6"
          v-for="(it, index) in icons"
          :key="index"
          style="margin-bottom: 30px"
        >
          <NuxtLink class="project-link-img" :to="it.url">
            <img :src="it.icon_file" :alt="it.name" style="width: 80%;"/>
            <br /><br />    
            <span class="fw-bold">{{ it.name }}</span>
            </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  el_style: {
    type: Boolean,
    default: true,
  },
});

const icons = ref([
  {
    id: 1,
    name: "Sustainable",
    icon_file: "/images/iconwebtechnopark/icon_green.png",
    url: "/about/13",
  },
  {
    id: 2,
    name: "Knowledge Sharing",
    icon_file: "/images/iconwebtechnopark/icon_km.png",
    url: "/about/14",
  },
  {
    id: 3,
    name: "Co-operation",
    icon_file: "/images/iconwebtechnopark/icon_mou.png",
    url: "/about/15",
  },
  {
    id: 4,
    name: "Award & Standard Certificates",
    icon_file: "/images/iconwebtechnopark/icon_standard.png",
    url: "/about/16",
  },
]);
</script>

<style scoped>
.brand__item-6 img {
  opacity: 1;
}

.brand__item-6 img:hover {
  opacity: 0.6;
}
</style>
