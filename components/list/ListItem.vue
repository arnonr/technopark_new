<template>
  <div class="blog__list-item">
    <div class="blog__item-10 white-bg transition-3 fix">
      <div class="row">
        <div class="col-xl-2 col-lg-2 col-md-3">
          <nuxt-link :href="item.link + item.id">
            <div class="blog__thumb-10 w-img fix">
              <img :src="item.file" alt="" /></div
          ></nuxt-link>
        </div>
        <div class="col-xl-10 col-lg-10 col-md-9">
          <nuxt-link :href="item.link + item.id">
            <div class="blog__content-10">
              <div class="blog__content-10-top">
                <h3 class="blog__title-10 mt-20" style="min-height: 60px">
                  {{ item.title }}
                </h3>

                <!-- <p style="text-align: justify; text-indent: 2em" v-html="item.detail.replace(/(<([^>]+)>)/gi, '').slice(0, 400)+'...'">
                  </p> -->
              </div>

              <div
                class="blog__content-10-bottom d-flex align-items-center flex-wrap"
              >
                <div class="blog__meta-author-10 d-flex align-items-center">
                  <div class="blog__meta-author-content-10">
                    <span>
                      <i class="fa-regular fa-calendar"></i>
                      {{
                        useCookie("lang").value == "th"
                          ? dayjs(item.created).format("DD/MM/BB")
                          : dayjs(item.created).format("DD/MM/YY")
                      }}
                    </span>
                  </div>

                  <div class="blog__meta-author-content-10 pl-20">
                    <span>
                      <i class="fa-regular fa-tag"></i>
                      {{ item.type_name }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";

export default {
  props: {
    item: {},
  },
  setup() {
    dayjs.extend(buddhistEra);
  },
  data() {
    return {
      dayjs,
    };
  },
};
</script>

<style scoped>
.blog__list-item .blog__thumb-10 {
  width: 100%;
  height: 100%;
}

.blog__list-item {
  padding-right: 25px;
}

.blog__title-10 {
  color: #74737a;
}

.blog__content-10 {
  min-height: 100px;
}

@media only screen and (max-width: 600px) {
  .blog__content-10 {
    margin-top: 20px;
  }
}

.blog__list-item .blog__content-10 {
  padding-top: 0px;
}

.blog__list-item .blog__title-10 {
  font-size: 18px;
  letter-spacing: 0.3px;
}

.blog__list-item .blog__meta-author-content-10 span {
  color: var(--tp-text-2);
}
</style>
