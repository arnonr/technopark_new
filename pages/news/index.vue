<template>
  <section class="portfolio__area pt-40 pb-40">
    <div class="container" v-if="items.length != 0">
      <div class="row">
        <div class="col-xxl-12">
          <div class="portfolio__masonary-btn-2 text-center mb-50">
            <div
              class="masonary-menu filter-button-group"
              v-if="newsType.length != 0"
            >
              <button
                v-for="(nt, i) in newsType"
                :key="i"
                @click="onChangeNewsType(nt.id, nt.category)"
                :class="`${nt.category === activeCategory ? 'active' : ''}`"
              >
                {{ nt.name }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="row">
            <div class="col-xl-12">
              <div class="blog__list-item-wrapper">
                <NewsListItem
                  v-for="(item, i) in items"
                  :key="i"
                  :item="item"
                />
              </div>
            </div>
            <div class="col-xxl-12">
              <div class="tp-pagination mt-30">
                <blog-pagination
                  :totalPage="totalPage"
                  :currentPage="currentPage"
                  @update:currentPage="currentPage = $event"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Import
import NewsListItem from "~/components/news/NewsListItem.vue";
import BlogPagination from "~/components/common/pagination/BlogPagination.vue";
// Variable
const route = useRoute();
const router = useRouter();
const runtimeConfig = useRuntimeConfig();
const items = ref([]);
const perPage = ref(12);
const currentPage = ref(1);
const totalPage = ref(1);
const totalItems = ref(0);
const newsType = ref([]);
const activeCategory = ref("news-all");
const search = ref({
  news_type_id: undefined,
  is_publish: 1,
});

// Function Fetch
const { data: resNewsType } = await useAsyncData("newsType", async () => {
  let data = await $fetch(`${runtimeConfig.public.apiBase}/news-type`, {
    params: {
      is_publish: 1,
    },
  });

  let d = data.data.map((e) => {
    e.category = "news-" + e.name;
    return e;
  });
  d.unshift({
    id: null,
    name: "ข่าวทั้งหมด",
    category: "news-all",
  });

  return { ...data, data: d };
});

newsType.value = resNewsType.value.data;
if (route.query.news_type_id) {
  let nt = newsType.value.find((x) => {
    return x.id == route.query.news_type_id;
  });
  onChangeNewsType(route.query.news_type_id, nt.category);
}

if (route.query.page) {
  currentPage.value = route.query.page;
}

const { data: res } = await useAsyncData("news", async () => {
  let data = await $fetch(`${runtimeConfig.public.apiBase}/news`, {
    params: {
      ...search.value,
      news_type_id:
        search.value.news_type_id == null
          ? undefined
          : search.value.news_type_id,
      perPage: perPage.value,
      currentPage: currentPage.value,
    },
  });
  items.value = data.data;
  totalPage.value = data.totalPage;
  totalItems.value = data.totalData;
  return data;
});

items.value = res.value.data;
totalPage.value = res.value.totalPage;
totalItems.value = res.value.totalData;

watch(
  [currentPage, search],
  () => {
    router.replace({
      name: "news",
      query: { page: currentPage.value },
    });
    refreshNuxtData("news");
  },
  { deep: true }
);

// Function Change
const onChangeNewsType = async (id, category) => {
  search.value.news_type_id = id;
  refreshNuxtData("news");
  //   await fetchItems();
  activeCategory.value = category;
  search.value.news_type_id = id;
  //
};

onMounted(() => {});

watchEffect(() => {
  if (currentPage.value > totalPage.value) currentPage.value = totalPage.value;
});

useHead({
  title: "ข่าวอุทยานเทคโนโลยี มจพ.",
});
</script>

<style scoped></style>
