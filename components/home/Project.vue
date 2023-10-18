<template>
  <section :class="`brand__area ${el_style ? 'pt-30' : ''} bg-grey`">
    <div class="container">
      <div
        class="brand__item-wrapper-6 d-flex flex-wrap justify-content-center mx-auto"
      >
        <!--  -->
        <div
          class="card project-card"
          style="width: 15rem; margin-bottom: 30px;"
          v-for="(it, index) in project"
          :key="index"
        >
          <NuxtLink class="project-link-img" :to="it.url">
            <!-- <img src="..." class="card-img-top" alt="..." /> -->
            <img :src="it.project_file" :alt="it.name" class="card-img-top" />
            <div class="card-body text-center">
              <span class="fw-bold project-name">{{ it.name }}</span>
            </div>
          </NuxtLink>
        </div>
        <!--  -->
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

const project = ref([
  {
    name: "Sample Submission",
    project_file: "/images/iconwebtechnopark/icon_home1.png",
    url: "/sample-submission",
  },
  {
    name: "Equipment & Rate",
    project_file: "/images/iconwebtechnopark/icon_home2.png",
    url: "/equipment-and-rate",
  },
  {
    name: "Direction",
    project_file: "/images/iconwebtechnopark/icon_home3.png",
    url: "/about/8",
  },
  {
    name: "Department Facility",
    project_file: "/images/iconwebtechnopark/icon_home4.png",
    url: "/about/9",
  },
]);
</script>

<style scoped>
.brand__item-6 img {
  opacity: 1;
}

.brand__item-6 > .project-link-img:hover {
  /* https://angel-rs.github.io/css-color-filter-generator/ */
  filter: brightness(0) saturate(100%) invert(55%) sepia(77%) saturate(4539%)
    hue-rotate(0deg) brightness(101%) contrast(106%);
}

.bg-grey {
  background-color: var(--tp-common-footer-bg-grey-4);
}

.project-card {
  background-color: #ccc;
  border-color: var(--tp-common-footer-bg-grey-4);
  padding: 10px;
  padding-top: 50px;
  padding-bottom: 20px;
  margin-right: 10px;
  margin-left: 10px;
  text-align: center;
}

.card-img-top {
  width: 70%;
  margin-bottom: 10px;
  filter: invert(5%) sepia(40%) saturate(8%) hue-rotate(48deg) brightness(90%)
    contrast(99%);
}

.project-card:hover {
  background-color: var(--tp-theme-1);
}

.project-card:hover .card-img-top {
  filter: none;
}

.project-name {
  font-size: 1.2em;
}
</style>
