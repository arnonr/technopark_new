<template>
  <div>
    <header-one :top_bar="false" :header_solid="true" :commonOffcanvas="true" />
    <section-title title="Privacy Policy" subtitle="Your privacy is important to us. It is Harry’s policy to respect your privacy regarding <br> any  information we may collect from you across our website, https:// Harry.com, <br> and other sites we own and operate."/>
      <policy-area/>
    <footer-six :style_2="true"/>
    <back-to-top/>
  </div>
</template>

<script>
import HeaderOne from "~~/layouts/headers/HeaderOne.vue";
import SectionTitle from '~~/components/policy-terms/SectionTitle.vue';
import PolicyArea from '~~/components/policy-terms/PolicyArea.vue';
import FooterSix from '~~/layouts/footers/FooterSix.vue';
import BackToTop from '~~/layouts/footers/component/BackToTop.vue';

export default {
  components: {
    HeaderOne,
    SectionTitle,
    PolicyArea,
    FooterSix,
    BackToTop,
  },
  setup() {
    useHead({
      title: "Policy - Creative Agency & Portfolio Vue Nuxt 3 Template",
    });
  },
};
</script>
