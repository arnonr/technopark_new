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
              >
                ข่าว{{ item.news_type.name }}
              </NuxtLink>
            </div>
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
                  หน้าหลัก
                </NuxtLink>
              </span>
              <span class="dvdr"><i class="fa-solid fa-circle-small"></i></span>
              <span>
                <NuxtLink href="/news"> ข่าวทั้งหมด</NuxtLink>
              </span>
              <span class="dvdr"><i class="fa-solid fa-circle-small"></i></span>
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
            <div class="postbox__top">
              <div class="postbox__thumb m-img mb-55">
                <img :src="item.news_file" alt="" />
              </div>
            </div>
            <!-- Content -->
            <div class="postbox__main">
              <div class="row">
                <div class="col-lg-12">
                  <div class="postbox__main-wrapper">
                    <div
                      class="postbox__meta-wrapper d-flex align-items-center flex-wrap"
                    >
                      <div class="postbox__meta-item">
                        <div class="postbox__meta-content">
                          <span class="postbox__meta-type">
                            <i class="fa fa-tag"></i>
                            {{ item.news_type ? item.news_type.name : "" }}
                          </span>
                        </div>
                      </div>
                      <div class="postbox__meta-item">
                        <div class="postbox__meta-content">
                          <span class="postbox__meta-type">
                            <i class="fa fa-calendar"></i>
                            {{
                              dayjs(item.created_news)
                                .locale("th")
                                .format("DD MMM BB")
                            }}
                          </span>
                        </div>
                      </div>
                      <div class="postbox__meta-item">
                        <div class="postbox__meta-content">
                          <span class="postbox__meta-type">
                            <i class="fa fa-eye"></i>
                            {{ item.count_views }} views
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="postbox__details-content-wrapper">
                      <h3>{{ item.title }}</h3>
                      <hr />
                      <div v-html="item.detail"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="news_gallery mt-2" v-if="newsGallery.length != 0">
              <span class="fw-bold">แกลลอรี่ </span>
              <div class="container-fluid g-0">
                <div class="row gx-0">
                  <div class="col-xxl-12">
                    <div class="portfolio__slider-6">
                      <ClientOnly>
                        <Swiper
                          class="portfolio__slider-active-6 swiper-container"
                          :slidesPerView="5"
                          :spaceBetween="20"
                          :modules="modules"
                          :loop="true"
                          :speed="3000"
                          :autoplay="{
                            delay: 3000,
                          }"
                          :breakpoints="{
                            1600: {
                              slidesPerView: 5,
                            },
                            1200: {
                              slidesPerView: 4,
                            },
                            992: {
                              slidesPerView: 3,
                            },
                            768: {
                              slidesPerView: 3,
                            },
                            576: {
                              slidesPerView: 2,
                              spaceBetween: 20,
                            },
                            0: {
                              slidesPerView: 1,
                              spaceBetween: 0,
                            },
                          }"
                        >
                          <SwiperSlide
                            v-for="(item, i) in newsGallery"
                            :key="item.id"
                            :class="`portfolio__item-6 ${
                              isActive ? '' : 'active'
                            } transition-3`"
                          >
                            <div
                              class="portfolio__thumb-6 fix"
                              @mouseover="isActive = true"
                              @mouseleave="isActive = false"
                            >
                              <a
                                @click.prevent="handleImagePopup(i)"
                                class="popup-image"
                                href="#"
                              >
                                <img
                                  :src="item.news_gallery_file"
                                  alt="image"
                                  style="width: 100%"
                                />
                              </a>
                            </div>
                          </SwiperSlide>
                        </Swiper>
                      </ClientOnly>
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
import { Autoplay } from "swiper";
import ImagePopup from "~~/components/common/modals/ImagePopup.vue";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const modules = [Autoplay];
const image_popup = ref(null);

const newsGallery = ref([]);
const isActive = ref(false);

const item = ref(null);

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
    `${runtimeConfig.public.apiBase}/news/${route.params.id}`
  );
  return data;
});

item.value = res.value.data;

const handleImagePopup = (index) => {
  image_popup.value.showImg(index);
};

useHead({
  title: "ข่าวอุทยานเทคโนโลยี มจพ.",
});
</script>

<style scoped>
.breadcrumb__title {
  font-size: 50px;
}
</style>
