<template>
  <section class="award__area pb-10 p-relative z-index-1">
    <div class="award__shape">
      <img
        class="award__shape-1"
        src="~/assets/img/award/5/shape/award-shape-1.png"
        alt="shape"
      />
      <img
        class="award__shape-2"
        src="~/assets/img/award/5/shape/award-shape-2.png"
        alt="shape"
      />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xxl-12">
          <div class="award__stroke text-center">
            <img src="~/assets/img/award/5/award-title.png" alt="award title" />
          </div>
        </div>
      </div>
      <div class="row gx-1">

        <div v-for="(item,i) in award_data" :key="i" class="col-lg-4 col-md-6">
          <div
            :class="`award__item-5 ${item.bg} mb-30 wow fadeInUp`"
            data-sal="slide-up" :data-sal-delay="item.delay" data-sal-duration="1000"
          >
            <div class="award__icon-5">
              <img :src="item.icon" alt="" />
            </div>
            <div class="award__content-5">
              <h4 class="award__title-5">
                <a href="#">{{item.title}}</a>
              </h4>
              <p>{{item.subtitle}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import award_icon_1 from "~/assets/img/award/5/award-1.png";
import award_icon_2 from "~/assets/img/award/5/award-2.png";
import award_icon_3 from "~/assets/img/award/5/award-3.png";
import SalScrollAnimationMixin from "~/mixins/SalScrollAnimationMixin";

export default {
  mixins: [SalScrollAnimationMixin],
  data() {
    return {
      award_data: [
        {
          delay: "150",
          icon: award_icon_1,
          title: "2 x Pencils",
          subtitle: "Best Branded Editorial Experience",
          bg: "",
        },
        {
          delay: "170",
          icon: award_icon_2,
          title: "Creative Review Annual",
          subtitle: "Best Branded Editorial Experience",
          bg: "award__brown",
        },
        {
          delay: "190",
          icon: award_icon_3,
          title: "Webby Award",
          subtitle: "Best Branded Editorial Experience",
          bg: "award__purple",
        },
      ],
    };
  },
};
</script>
