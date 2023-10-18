<template>
  <section class="breadcrumb__area include-bg pb-40 pt-30 grey-bg-4">
    <div class="container">
      <div class="row">
        <div class="col-xxl-12" v-if="item != null">
          <div class="breadcrumb__content p-relative z-index-1">
            <div class="postbox__category">
              <NuxtLink
                :to="{
                  path: '/news',
                  query: { news_type_id: item.news_type_id },
                }"
                style="padding: 10px"
              >
                {{ item.news_type.name }}
              </NuxtLink>
            </div>
            <!-- <h4 class="breadcrumb__title">
                {{ item.title }}
              </h4> -->

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
                <NuxtLink href="/news"> {{ $t("All News") }}</NuxtLink>
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
                      <h3>{{ item.title }}</h3>
                      <hr />
                    </div>

                    <div
                      class="postbox__meta-wrapper d-flex align-items-center flex-wrap"
                    >
                      <div class="postbox__meta-item">
                        <div class="postbox__meta-content">
                          <span class="postbox__meta-type">
                            <i class="fa-regular fa-calendar"></i>
                            {{
                              useCookie("lang").value == "th"
                                ? dayjs(item.created_news)
                                    .locale("th")
                                    .format("DD MMM BB")
                                : dayjs(item.created_news).format("DD/MM/YYYY")
                            }}
                          </span>
                        </div>
                      </div>

                      <div class="postbox__meta-item">
                        <div class="postbox__meta-content">
                          <span class="postbox__meta-type">
                            <i class="fa-regular fa-tag"></i>
                            {{ item.news_type ? item.news_type.name : "" }}
                          </span>
                        </div>
                      </div>

                      <!-- <div class="postbox__meta-item">
                        <div class="postbox__meta-content">
                          <span class="postbox__meta-type">
                            <i class="fa fa-eye"></i>
                            {{ item.count_views }} views
                          </span>
                        </div>
                      </div> -->
                    </div>

                    <div class="postbox__thumb m-img mt-20">
                      <!-- <img :src="item.news_file" alt="" /> -->

                      <div
                        class="news_gallery mt-2"
                        v-if="newsGallery.length != 0"
                      >
                        <!-- <span class="fw-bold">{{ $t("Gallery") }}</span> -->
                        <div class="container-fluid g-0">
                          <div class="row gx-0">
                            <div class="col-xxl-12">
                              <div class="portfolio__slider-6">
                                <ClientOnly>
                                  <!--  -->

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
                                      v-for="(ng) in newsGallery"
                                      :key="ng.id"
                                    >
                                      <img
                                        :src="ng.news_gallery_file"
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
                                      v-for="(ng) in newsGallery"
                                      :key="ng.id"
                                    >
                                      <img
                                        :src="ng.news_gallery_file"
                                        style="width: 100%;cursor: pointer;"
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

                    <div class="postbox__details-content-wrapper mt-60">
                      <div v-html="item.detail == null ? '' : item.detail"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <image-popup
      ref="image_popup"
      :images="newsGallery.map((item) => item.news_gallery_file)"
    />
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

const newsGallery = ref([]);
const isActive = ref(false);
const thumbsSwiper = ref(null);

const item = ref(null);

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

// Fetch
const { data: res1 } = await useAsyncData("news-gallery", async () => {
  let data = await $fetch(`${runtimeConfig.public.apiBase}/news-gallery`, {
    params: {
      is_publish: 1,
      news_id: route.params.id,
    },
  });
  return data;
});

newsGallery.value = [...res1.value.data];

const { data: res } = await useAsyncData("news", async () => {
  let data = await $fetch(
    `${runtimeConfig.public.apiBase}/news/${route.params.id}`,
    {
      params: {
        lang: useCookie("lang").value,
      },
    }
  );
  return data;
});

item.value = res.value.data;

const handleImagePopup = (index) => {
  image_popup.value.showImg(index);
};

useHead({
  title: item.value.title,
});
</script>

<style scoped>
.breadcrumb__title {
  font-size: 50px;
}


</style>
