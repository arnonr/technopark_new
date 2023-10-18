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
              <span> {{ $t("Administrator") }} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--  -->
  <section class="postbox__area pt-40 pb-120">
    <div class="container">
      <div class="row">
        <div class="col-xxl-12">
          <div class="postbox__wrapper" v-if="departments">
            <!-- Content -->
            <div class="postbox__main">
              <div class="row mb-40">
                <div
                  class="col-sm-12 col-md-12 col-12"
                  style="border-left: 0.7em solid rgb(255, 203, 5)"
                >
                  <h2>{{ $t("Administrator") }}</h2>
                  <h2 style="color: rgb(255, 203, 5)">
                    {{ $t("Scientific Instrument") }} <br />
                    {{ $t("and High Performance Computing Center") }}
                  </h2>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-12">
                  <div class="postbox__main-wrapper">
                    <div class="postbox__details-content-wrapper">
                      <!--  -->
                      <div v-for="(dp, index) in departments" :key="index">
                        <div class="div-department">
                          <h4 class="font-weight-bold" style="color: #000">
                            {{ dp.name }}
                          </h4>
                        </div>
                        <div
                          class="pa-3 row"
                          v-for="(ad, idx) in dp.administrators"
                          :key="idx"
                        >
                          <div
                            class="col-12 col-lg-3 d-flex justify-content-center"
                          >
                            <img
                              :src="ad.team_file"
                              height="320"
                              width="250"
                              style="border: solid 0.5em #ffcb05"
                              class="text-center mb-20"
                            />
                          </div>

                          <div
                            class="col-12 col-lg-9 mb-20 d-flex align-items-center"
                          >
                            <div>
                              <div
                                v-if="ad.position_type"
                                class="font-weight-bold align-middle"
                              >
                                {{ ad.position_type }}
                              </div>
                              <div v-if="ad.position" class="font-weight-bold">
                                {{ ad.position }}
                              </div>
                              <div v-if="ad.position_type || ad.position">
                                <hr class="mt-2 mb-2" />
                              </div>
                              <div
                                class="font-weight-bold"
                                style="margin-block-end: 0rem"
                              >
                                <h4 class="text-color-grey">
                                  {{
                                    ad.prefix + ad.firstname + " " + ad.surname
                                  }}
                                </h4>
                              </div>
                              <div
                                class="font-weight-bold"
                                style="margin-block-end: 0rem"
                              >
                                <h4 class="text-color-grey">
                                  {{
                                    ad.prefix_en +
                                    ad.firstname_en +
                                    " " +
                                    ad.surname_en
                                  }}
                                </h4>
                              </div>
                              <div style="margin-block-end: 0rem">
                                <h5 class="text-color-grey">
                                  Email : {{ ad.email }}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!--  -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Variable
const route = useRoute();
const items = ref([]);
const departments = ref([]);
const currentPage = ref(1);
const totalPage = ref(1);
const totalItems = ref(0);
const router = useRouter();
const runtimeConfig = useRuntimeConfig();

// Function Fetch
const { data: resDepartment } = await useAsyncData("department", async () => {
  let data = await $fetch(`${runtimeConfig.public.apiBase}/department`, {
    params: {
      is_publish: 1,
      lang: useCookie("lang").value,
    },
  });

  return data;
});

departments.value = resDepartment.value.data;

if (route.query.page) {
  currentPage.value = route.query.page;
}

const { data: res } = await useAsyncData("administrator", async () => {
  let data = await $fetch(`${runtimeConfig.public.apiBase}/team`, {
    params: {
      lang: useCookie("lang").value,
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
  [currentPage],
  () => {
    refreshNuxtData("administrator");
  },
  { deep: true }
);

onMounted(() => {
  if (departments.value.length != 0) {
    departments.value = departments.value.map((it) => {
      it.administrators = items.value.filter((x) => {
        return x.department_id == it.id;
      });
      return it;
    });
  }
});

watchEffect(() => {
  if (currentPage.value > totalPage.value) currentPage.value = totalPage.value;
});

useHead({
  title:
    "บุคลากร ศูนย์เครื่องมือวิทยาศาสตร์และคอมพิวเตอร์สมรรถนะสูง คณะวิทยาศาสตร์ประยุกต์",
});
</script>

<style scoped>
.breadcrumb__title {
  font-size: 50px;
}

.div-department {
  background-color: #ccc;
  padding: 10px;
  margin-bottom: 15px;
}
</style>
