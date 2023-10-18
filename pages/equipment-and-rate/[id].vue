<template>
  <section class="breadcrumb__area include-bg pb-40 pt-30 grey-bg-4">
    <div class="container">
      <div class="row">
        <div class="col-xxl-12" v-if="item != null">
          <div class="breadcrumb__content p-relative z-index-1">
            <div class="postbox__category">
              <NuxtLink
                :to="{
                  path: '/equipment-and-rate',
                }"
                style="padding: 10px"
              >
                {{ $t("Equipment & Rate") }}
              </NuxtLink>
            </div>

            <div class="breadcrumb__list">
              <span class="breadcrumb-item-1">
                <NuxtLink
                  :to="{
                    path: '/',
                  }"
                >
                  {{ $t("Home") }}
                </NuxtLink>
              </span>
              <span class="dvdr breadcrumb-item-1"
                ><i class="fa-solid fa-circle-small"></i
              ></span>
              <span class="breadcrumb-item-1">
                <NuxtLink href="/equipment">
                  {{ $t("Equipment & Rate") }}</NuxtLink
                >
              </span>
              <span class="dvdr breadcrumb-item-1"
                ><i class="fa-solid fa-circle-small"></i
              ></span>
              <span> {{ item.title }} </span>
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
          <div class="postbox__wrapper" v-if="item">
            <!-- Image -->
            <!-- <div class="postbox__top">
              
            </div> -->
            <!-- Content -->
            <div class="postbox__main">
              <div class="row">
                <div class="col-lg-12">
                  <div class="postbox__main-wrapper">
                    <div class="postbox__details-content-wrapper">
                      <!-- <h3>{{ item.equipment_department.name }}</h3> -->
                      <h3>{{ item.title_en }}</h3>
                      <h3>{{ item.title_th }}</h3>
                    </div>

                    <div class="mt-30 pl-10 pt-15 pb-10 bg-grey">
                      <h4>
                        <i class="fa-solid fa-microscope"></i>
                        <span class="ml-10">{{ $t("Equipment Detail") }}</span>
                      </h4>
                    </div>

                    <div class="postbox__details-content-wrapper mt-20">
                      <div
                        v-html="item.detail == null ? '' : item.detail"
                      ></div>
                    </div>

                    <div class="postbox__thumb m-img mt-20">
                      <div
                        class="news_gallery mt-2"
                        v-if="equipmentGallery.length != 0"
                      >
                        <div class="container-fluid g-0">
                          <div class="row gx-0">
                            <div class="col-xxl-12">
                              <div class="portfolio__slider-6">
                                <ClientOnly>
                                  <Swiper
                                    :slidesPerView="1"
                                    :spaceBetween="10"
                                    :loop="true"
                                    :thumbs="{ swiper: thumbsSwiper }"
                                    :navigation="true"
                                    :modules="modules"
                                    :speed="5000"
                                    :autoplay="{
                                      delay: 5000,
                                      disableOnInteraction: true,
                                    }"
                                    class="mySwiper2 mb-10"
                                  >
                                    <SwiperSlide
                                      v-for="ng in equipmentGallery"
                                      :key="ng.id"
                                    >
                                      <img
                                        :src="ng.equipment_gallery_file"
                                        style="width: 100%"
                                      />
                                    </SwiperSlide>
                                  </Swiper>

                                  <Swiper
                                    @swiper="setThumbsSwiper"
                                    :spaceBetween="10"
                                    :slidesPerView="4"
                                    :freeMode="true"
                                    :watchSlidesProgress="true"
                                    :modules="modules"
                                    class="mySwiper"
                                  >
                                    <SwiperSlide
                                      v-for="ng in equipmentGallery"
                                      :key="ng.id"
                                    >
                                      <img
                                        :src="ng.equipment_gallery_file"
                                        style="width: 100%; cursor: pointer"
                                      />
                                    </SwiperSlide>
                                  </Swiper>
                                </ClientOnly>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="mt-30 pl-10 pt-15 pb-10 bg-grey">
                      <h4>
                        <i class="fa-solid fa-coins"></i>
                        <span class="ml-10">{{ $t("Rate") }}</span>
                      </h4>
                    </div>

                    <div v-if="item.rate_file != null" class="w-img mt-30">
                      <img :src="item.rate_file" alt="" />
                    </div>

                    <div class="mt-30 text-center">
                      <div class="div-btn-sample-submission">
                        <div class="col">
                          <div class="tp-button-demo text-center">
                            <NuxtLink
                              :to="'/sample-submission/' + item.id"
                              class="tp-btn-border-yellow text-uppercase"
                              >{{ $t("Sample Submission") }}</NuxtLink
                            >
                          </div>
                        </div>
                      </div>
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
import { Swiper, SwiperSlide } from "swiper/vue";
import {
  Autoplay,
  FreeMode,
  Navigation,
  Pagination,
  Scrollbar,
  Thumbs,
} from "swiper";
import ImagePopup from "~~/components/common/modals/ImagePopup.vue";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const modules = [Autoplay, FreeMode, Navigation, Pagination, Scrollbar, Thumbs];
const image_popup = ref(null);

const equipmentGallery = ref([]);
const isActive = ref(false);
const thumbsSwiper = ref(null);

const item = ref(null);

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

// Fetch
const { data: res1 } = await useAsyncData("equipment-gallery", async () => {
  let data = await $fetch(`${runtimeConfig.public.apiBase}/equipment-gallery`, {
    params: {
      is_publish: 1,
      equipment_id: route.params.id,
    },
  });
  return data;
});

equipmentGallery.value = [...res1.value.data];

const { data: res } = await useAsyncData("equipment", async () => {
  let data = await $fetch(
    `${runtimeConfig.public.apiBase}/equipment/${route.params.id}`,
    {
      params: {
        lang: useCookie("lang").value,
      },
    }
  );
  console.log(data);
  return data;
});

item.value = res.value.data;

useHead({
  title: item.value.title,
});
</script>

<style scoped>
.breadcrumb__title {
  font-size: 50px;
}
</style>
