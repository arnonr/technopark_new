<template>
  <div
    v-if="item"
    :class="`blog__grid-item ${masonry ? 'blog__masonary' : ''} ${
      !item.file ? 'no-img' : ''
    }`"
  >
    <div class="blog__item-10 white-bg transition-3 mb-30 fix">
      <div class="blog__thumb-10 w-img fix w-img-news">
        <nuxt-link v-if="item.file" :to="item.link + item.id">
          <img :src="item.file" alt="blog img" class="img-news" />
        </nuxt-link>
      </div>
      <div class="blog__content-10">
        <div class="blog__content-10-top">
          <div v-if="!item.file" class="blog__tag-10">
            <a href="#">{{ item.type_name }}</a>
          </div>

          <h3 class="blog__title-10">
            <nuxt-link :to="item.link + item.id">{{ item.title }}</nuxt-link>
          </h3>
        </div>
        <div
          class="blog__content-10-bottom d-flex align-items-center justify-content-between"
        >
          <div class="blog__meta-author-10 d-flex align-items-center">
            <div class="blog__meta-author-content-10">
              <nuxt-link
                v-if="item.file"
                :to="item.link + item.id"
                class="text-color-primary text-uppercase"
              >
                {{
                  item.link == "equipment-and-rate/"
                    ? $t("Details")
                    : $t("Read More")
                }}
                <i class="fa fa-arrow-right news-link-view"></i>
              </nuxt-link>
            </div>
          </div>
          <div class="blog__meta-10 blog-meta-10-2">
            <span>
              <i
                class="fa-regular fa-tag"
                style="margin-right: 0px; color: #bdbdc6"
              ></i>
              {{ item.type_name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {},
    masonry: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.blog__item-10 {
  border-radius: 0.5em;
  border: solid 1px #eee;
}

.text-color-primary {
  color: var(--tp-theme-1);
}

.blog__grid-item .blog__content-10-top {
  padding: 1em;
  padding-top: 2em;
  min-height: 150px;
}

.blog__content-10-bottom {
  border-top: 0px;
  padding: 1em;
}

.blog__grid-item .blog__title-10 {
  font-size: 18px;
  font-weight: 500;
}

.blog__grid-item .blog__meta-10 span {
  color: var(--tp-text-4);
}

@media only screen and (min-width: 1025px) {
  .w-img-news {
    max-height: 190px;
    min-height: 190px;
  }
  .img-news {
    min-height: 190px !important;
  }
}
</style>
