<template>
  <div :class="'fix ' + useSkin().value" >
    <Header />

    <main>
      <slot></slot>
    </main>

    <footer-one />
    <BackToTop  />
  </div>
</template>

<script>
import Header from "./headers/Header.vue";
import FooterOne from "./footers/FooterOne.vue";
import BackToTop from "./footers/component/BackToTop.vue";

export default {
  components: {
    Header,
    FooterOne,
    BackToTop,
  },
};
</script>
