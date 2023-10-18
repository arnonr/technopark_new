<template>
  <header>
    <div class="header__area">
      <div class="header__top-4 header__padding-4">
        <div class="container">
          <div class="row align-items-center">
            <!-- Logo SICC -->
            <div class="col-xxl-8 col-xl-8 col-lg-6 col-md-6 col-6">
              <div class="logo text-start">
                <NuxtLink to="/">
                  <img
                    src="~/assets/img/iconwebtechnopark/logo-sicc.png"
                    class="img-header-logo"
                    alt=""
                  />
                </NuxtLink>

                <h5 class="d-none d-xl-block d-lg-block text-color-secondary">
                  ศูนย์เครื่องมือวิทยาศาสตร์และคอมพิวเตอร์สมรรถนะสูง
                  คณะวิทยาศาสตร์ประยุกต์
                </h5>
                <h6 class="d-none d-xl-block d-lg-block text-color-secondary">
                  Scientific Instrument and High Performance Computing Center :
                  SICC, Faculty of Applied Science
                </h6>
              </div>
            </div>

            <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-6">
              <!-- Logo Sci -->
              <div
                class="header__top-right-4 d-none d-lg-flex justify-content-center"
              >
                <img
                  src="~/assets/img/iconwebtechnopark/logo-sci.png"
                  class="img-header-logo-sci"
                  alt=""
                  style="margin-top: 0px"
                />
              </div>
              <!-- DARK MODE LOGIN LANGUAGE -->
              <div
                class="header__top-right-4 d-lg-flex justify-content-center"
                style="padding-top: 1em"
              >
                <div
                  class="header__info-wrapper-4 d-flex align-items-center justify-content-center"
                >
                  <span class="mr-0-5" @click="changeSkin()" style="cursor:pointer">
                    <svg
                      v-if="useSkin().value == 'skin-dark'"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      tag="i"
                      class="v-icon notranslate v-theme--light iconify iconify--tabler"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      style="font-size: 24px; height: 24px; width: 24px"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z"
                      ></path>
                    </svg>

                    <svg
                      width="1.2em"
                      height="1.2em"
                      v-if="useSkin().value == 'skin-light'"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        clip-path="url(#a)"
                        stroke="#000000"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                      >
                        <path
                          d="M5 12H1M23 12h-4M7.05 7.05 4.222 4.222M19.778 19.778 16.95 16.95M7.05 16.95l-2.828 2.828M19.778 4.222 16.95 7.05"
                          stroke-linecap="round"
                        />

                        <path
                          d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                          fill="#000000"
                          fill-opacity=".16"
                        />

                        <path d="M12 19v4M12 1v4" stroke-linecap="round" />
                      </g>

                      <defs>
                        <clipPath id="a">
                          <path fill="#ffffff" d="M0 0h24v24H0z" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  <span class="mr-0-5 fw-bold"> | </span>
                  <span class="mr-0-5 fw-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      tag="i"
                      class="v-icon notranslate v-theme--light iconify iconify--tabler"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      style="font-size: 24px; height: 24px; width: 24px"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      >
                        <circle cx="12" cy="7" r="4"></circle>
                        <path
                          d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"
                        ></path>
                      </g>
                    </svg>
                    <span class="d-none d-lg-inline">{{ $t('Sign In') }}</span>
                  </span>
                  <span class="mr-0-5 fw-bold"> | </span>
                  <span class="mr-0-5"><language /></span>

                  <!-- memu mobile -->
                  <div class="header__hamburger d-lg-none float-end">
                    <button
                      @click="handleOpenSidebar"
                      type="button"
                      class="hamburger-btn hamburger-btn-brown offcanvas-open-btn"
                    >
                      <span></span>
                      <span></span>
                      <span></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        :class="`header__style-4 header__sticky ${
          isSticky ? 'header-sticky' : ''
        }`"
        id="header-sticky"
      >
        <div class="container">
          <div class="mega-menu-wrapper p-relative">
            <div class="row align-items-center">
              <div class="col-xxl-2 col-xl-2 col-lg-2 col-6">
                <div class="logo">
                  <NuxtLink to="/">
                    <img
                      src="~/assets/img/iconwebtechnopark/logo-sicc.png"
                      style="width: 70%"
                      alt=""
                    />
                  </NuxtLink>
                </div>
              </div>
              <div class="col-xxl-8 col-xl-7 col-lg-7 d-none d-lg-block">
                <div class="main-menu main-menu-4 main-menu-ff-space">
                  <nav id="mobile-menu">
                    <!-- menus start -->
                    <menus />
                    <!-- menus end -->
                  </nav>
                </div>
              </div>
              <div class="col-xxl-2 col-xl-3 col-lg-3 col-6">
                <div
                  class="header__style-4-right d-flex align-items-center justify-content-end"
                >
                  <!--   <div class="header__btn-4 text-end d-none d-lg-block">
                    <nuxt-link href="/contact" class="tp-btn-brown">Free Consultation</nuxt-link>
                  </div>-->
                  <div class="header__hamburger ml-50 d-lg-none">
                    <button
                      @click="handleOpenSidebar"
                      type="button"
                      class="hamburger-btn hamburger-btn-brown offcanvas-open-btn"
                    >
                      <span></span>
                      <span></span>
                      <span></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="header__bottom-4 d-none d-lg-block">
        <div class="container">
          <div class="mega-menu-wrapper p-relative">
            <div class="row align-items-center">
              <div class="col-xxl-12 col-xl-12 col-lg-12 text-center">
                <div class="main-menu main-menu-4 main-menu-ff-space">
                  <nav>
                    <!-- menus start -->
                    <menus />
                    <!-- menus end -->
                  </nav>
                </div>
              </div>
              <!-- <div class="col-xxl-4 col-xl-3 col-lg-3">
                <div class="header__btn-4 text-end">
                  <nuxt-link href="/contact" class="tp-btn-brown">Free Consultation</nuxt-link>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- off canvas full start -->
  <off-canvas-two ref="off_canvas" />
  <!-- off canvas full end -->
</template>

<script>
import menus from "./menus.vue";
import OffCanvasTwo from "~~/components/common/off-canvas/OffCanvasTwo.vue";
import Language from "./component/Language.vue";

export default {
  components: { menus, OffCanvasTwo, Language },
  data() {
    return {
      isSticky: false,
    };
  },
  methods: {
    handleSticky() {
      if (window.scrollY > 80) {
        this.isSticky = true;
      } else {
        this.isSticky = false;
      }
    },
    handleOpenSidebar() {
      this.$refs.off_canvas.openOffcanvas();
    },
    changeSkin() {
      if (useSkin().value == "skin-dark") {
        useSkin().value = "skin-light";
      } else {
        useSkin().value = "skin-dark";
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleSticky);
  },
};
</script>
<style scoped>
.header__bottom-4 {
  background-color: #ffcb05;
  line-height: 2.5em;
  border-top: 4px solid #000;
}

.header__padding-4 {
  padding-top: 0px;
  padding-bottom: 0px;
}

.header__info-item {
  margin-right: 10px;
}

.img-header-logo {
  width: 25%;
  margin-top: 20px;
  margin-bottom: 20px;
}

.header__lang-sicc .header__lang-selected-lang {
  /* .header__lang-10 .header__lang-selected-lang { */
  padding-top: 5px;
  padding-bottom: 5px;
  /* color: var(--tp-common-black); */
  color: #000;
}

.img-header-logo-sci {
  margin-top: 0px;
  margin-bottom: 10px;
  width: 23%;
}

.mr-0-5 {
  margin-right: 0.5em;
}

.header__padding-4[data-v-caa3a86f] {
  padding-bottom: 10px;
}

@media (max-width: 900px) {
  .img-header-logo {
    width: 80%;
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
</style>
