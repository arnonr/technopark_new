<template>
  <section class="breadcrumb__area include-bg pb-40 pt-30 grey-bg-4">
    <div class="container">
      <div class="row">
        <div class="col-xxl-12">
          <div class="breadcrumb__content p-relative z-index-1">
            <!-- <h4 class="breadcrumb__title">
                  {{ item.title }}
                </h4> -->

            <div class="breadcrumb__list">
              <span>
                <NuxtLink
                  :to="{
                    path: '/',
                  }"
                >
                  {{ $t("Home") }}
                </NuxtLink>
              </span>
              <span class="dvdr"><i class="fa-solid fa-circle-small"></i></span>
              <span> {{ $t("Sample Submission") }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="portfolio__area pt-40 pb-40">
    <div class="container">
      <div class="row">
        <div class="col-xxl-12 mb-20">
          <h3>{{ $t("Sample Submission") }}</h3>
        </div>
        <div
          class="col-xxl-12"
          v-if="selectOptions.equipment_departments.length != 0"
        >
          <div class="portfolio__masonary-btn-2 text-start mb-50">
            <div
              class="masonary-menu filter-button-group"
              v-if="selectOptions.equipment_departments.length != 0"
            >
              <button
                v-for="(it, i) in selectOptions.equipment_departments"
                :key="i"
                @click="onChangeEquipmentDepartment(it.id, it.category)"
                :class="`${
                  it.category === activeCategory ? 'active' : ''
                } text-uppercase`"
              >
                {{ it.name }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row gx-2 grid">
        <div
          v-for="(it, i) in items"
          :key="i"
          class="col-xxl-3 col-xl-3 col-lg-6 col-md-6"
        >
          <grid-item
            :item="{
              link: 'sample-submission/',
              id: it.id,
              title_en: it.title_en,
              title_th: it.title_th,
              title: it.title,
              file: it.equipment_file,
              type_name: it.equipment_department.name_short,
            }"
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
  </section>
</template>

<script setup>
import dayjs from "dayjs";
import "dayjs/locale/th";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
// Import
import GridItem from "~/components/list/EquipmentGridItem.vue";
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
const search = ref({
  equipment_department: null,
  created_year: null,
  created_month: null,
  is_publish: 1,
});

const selectOptions = ref({
  equipment_departments: [],
  perPage: [
    { title: "20", value: 20 },
    { title: "40", value: 40 },
    { title: "60", value: 60 },
  ],
  years: [],
  months: [
    { title: "มกราคม", title_en: "January", value: "01" },
    { title: "กุมภาพันธ์", title_en: "February", value: "02" },
    { title: "มีนาคม", title_en: "March", value: "03" },
    { title: "เมษายน", title_en: "April", value: "04" },
    { title: "พฤษภาคม", title_en: "May", value: "05" },
    { title: "มิถุนายน", title_en: "June", value: "06" },
    { title: "กรกฎาคม", title_en: "July", value: "07" },
    { title: "สิงหาคม", title_en: "August", value: "08" },
    { title: "กันยายน", title_en: "September", value: "09" },
    { title: "ตุลาคม", title_en: "October", value: "10" },
    { title: "ฑฤศจิกายน", title_en: "November", value: "11" },
    { title: "ธันวาคม", title_en: "December", value: "12" },
  ],
});

let year = dayjs().year();

for (let i = 0; i <= 9; i++) {
  selectOptions.value.years.push({
    title: year - i + 543,
    title_en: year - i,
    value: year - i,
  });
}

// Function Fetch
const { data: resEquipmentDepartment } = await useAsyncData(
  "equipmentDepartment",
  async () => {
    let data = await $fetch(
      `${runtimeConfig.public.apiBase}/equipment-department`,
      {
        params: {
          is_publish: 1,
          lang: useCookie("lang").value,
        },
      }
    );

    let d = data.data.map((e) => {
      return { title: e.name, value: e.id };
    });

    return d;
  }
);

selectOptions.value.equipment_departments = resEquipmentDepartment.value;

if (route.query.page) {
  currentPage.value = route.query.page;
}

const { data: res } = await useAsyncData("equipment", async () => {
  let params = {
    ...search.value,
    equipment_department_id:
      search.value.equipment_department == null
        ? undefined
        : search.value.equipment_department.value,
    created_year:
      search.value.created_year == null
        ? undefined
        : search.value.created_year.value,
    created_month:
      search.value.created_month == null
        ? undefined
        : search.value.created_month.value,
    perPage: perPage.value,
    currentPage: currentPage.value,
    lang: useCookie("lang").value,
  };

  let data = await $fetch(`${runtimeConfig.public.apiBase}/equipment`, {
    params: params,
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
      name: "equipment-and-rate",
      query: { page: currentPage.value },
    });
    refreshNuxtData("equipment");
  },
  { deep: true }
);

onMounted(() => {});

watchEffect(() => {
  if (currentPage.value > totalPage.value) currentPage.value = totalPage.value;
});

watch([res], () => {
  items.value = res.value.data;
});

watch([resEquipmentDepartment], () => {
  selectOptions.value.equipment_departments = resEquipmentDepartment.value.data;
});

useHead({
  title:
    "Equipment & Rate ศูนย์เครื่องมือวิทยาศาสตร์และคอมพิวเตอร์สมรรถนะสูง คณะวิทยาศาสตร์ประยุกต์",
});
</script>

<style scoped></style>
