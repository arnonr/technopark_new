<template>
  <section class="breadcrumb__area include-bg pb-40 pt-30 grey-bg-4">
    <div class="container">
      <div class="row">
        <div class="col-xxl-12">
          <div class="breadcrumb__content p-relative z-index-1">
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
              <span> {{ $t("Booking List") }}</span>
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
          <h3>{{ $t("Booking List") }}</h3>
        </div>
      </div>
      <div class="row gx-2 grid">
        <div class="col-12">
          <div class="table-responsive">
            <table class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th class="text-center">รายการ</th>
                  <th class="text-center">วันที่จอง</th>
                  <th class="text-center">ช่วงเวลา</th>
                  <th class="text-center">หน่วยงาน</th>
                  <th class="text-center">สถานะ</th>
                  <th class="text-center">จัดการ</th>
                </tr>
              </thead>
              <tbody v-if="items.length != 0">
                <tr v-for="(it, idx) in items" :key="idx">
                  <td>{{ it.equipment.title }}</td>
                  <td class="text-center">
                    {{ it.booking_date_show }}
                  </td>
                  <td class="text-center">{{ it.period_time_show }}</td>
                  <td class="text-center">{{ it.organization }}</td>
                  <th class="text-center">
                    <span
                      :class="
                        'badge rounded-pill bg-' + it.booking_status_show.color
                      "
                      data-v-eb4900e3=""
                      >{{ it.booking_status_show.name }}</span
                    >
                  </th>
                  <td class="text-center">
                    <button class="btn btn-warning" @click="onEdit()">
                      <i class="fa-regular fa-edit"></i>
                    </button>

                    <button
                      class="btn btn-danger ml-5"
                      @click="onDelete()"
                    >
                      ยกเลิก
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
import buddhistEra from "dayjs/plugin/buddhistEra";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
// Import
// import tableItem from "~/components/list/TableItem.vue";
import BlogPagination from "~/components/common/pagination/BlogPagination.vue";
import booking_data from "~~/mixins/bookingData";
// Variable

dayjs.extend(buddhistEra);
const route = useRoute();
const router = useRouter();
const runtimeConfig = useRuntimeConfig();
const items = ref([]);
const perPage = ref(12);
const currentPage = ref(1);
const totalPage = ref(1);
const totalItems = ref(0);
const search = ref({
  is_publish: 1,
  user_id: 1,
});

const selectOptions = ref({
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
  member_statuses: booking_data.data().member_statuses,
  period_times: booking_data.data().period_times,
  booking_statuses: booking_data.data().booking_statuses,
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
// const { data: resEquipmentDepartment } = await useAsyncData(
//   "equipmentDepartment",
//   async () => {
//     let data = await $fetch(
//       `${runtimeConfig.public.apiBase}/equipment-department`,
//       {
//         params: {
//           is_publish: 1,
//           lang: useCookie("lang").value,
//         },
//       }
//     );

//     let d = data.data.map((e) => {
//       return { title: e.name, value: e.id };
//     });

//     return d;
//   }
// );

// selectOptions.value.equipment_departments = resEquipmentDepartment.value;

// if (route.query.page) {
//   currentPage.value = route.query.page;
// }

const { data: res } = await useAsyncData("booking", async () => {
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

  let data = await $fetch(`${runtimeConfig.public.apiBase}/booking`, {
    params: params,
  });
  items.value = data.data;
  totalPage.value = data.totalPage;
  totalItems.value = data.totalData;
  return data;
});

items.value = res.value.data.map((x) => {
  x.booking_date_show =
    useCookie("lang").value == "en"
      ? dayjs(x.booking_date).format("DD/MM/YY")
      : dayjs(x.booking_date).locale("th").format("DD MMM BB");

  let period_time = selectOptions.value.period_times.find((p) => {
    console.log(x.period_time);
    return p.id == x.period_time;
  });

  x.period_time_show =
    useCookie("lang").value == "en" ? period_time.name_en : period_time.name_th;

  let booking_status = selectOptions.value.booking_statuses.find((p) => {
    return p.id == x.status_id;
  });

  x.booking_status_show = {
    name:
      useCookie("lang").value == "en"
        ? booking_status.name_en
        : booking_status.name_th,
    color: booking_status.color,
  };

  return x;
});

onMounted(() => {});

totalPage.value = res.value.totalPage;
totalItems.value = res.value.totalData;

watch(
  [currentPage, search],
  () => {
    // router.replace({
    //   name: "equipment-and-rate",
    //   query: { page: currentPage.value },
    // });
    refreshNuxtData("booking");
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

// watch([resEquipmentDepartment], () => {
//   selectOptions.value.equipment_departments = resEquipmentDepartment.value.data;
// });

useHead({
  title:
    "รายการจอง เครื่องมือวิทยาศาสตร์และคอมพิวเตอร์สมรรถนะสูง คณะวิทยาศาสตร์ประยุกต์",
});
</script>

<style scoped></style>
