<template>
  <Layout>
    <LawyerBanner/>
    <LawyerAwards/>
    <LawyerCases/>
    <LawyerAbout/>
    <LawyerFunFact/>
    <LawyerHistory/>
    <lawyerVideo/>
    <LawyerServices/>
    <LawyerBlogs/>
    <LawyerTestimonial/>
    <LawyerTeams/>
    <LawyerCounter/>
    <LawyerContact/>
  </Layout>
</template>

<script setup>
import Layout from '~/layouts/LayoutTwo.vue';
import LawyerBanner from '~/components/hero-banner/LawyerBanner.vue';
import LawyerAwards from '~/components/awards/LawyerAwards.vue';
import LawyerCases from '~/components/portfolios/LawyerCases.vue';
import LawyerAbout from '~/components/abouts/LawyerAbout.vue';
import LawyerFunFact from '~/components/fun-facts/LawyerFunFact.vue';
import LawyerHistory from '~/components/history/LawyerHistory.vue';
import lawyerVideo from '~/components/video-area/LawyerVideo.vue';
import LawyerServices from '~/components/services/LawyerServices.vue';
import LawyerBlogs from '~/components/blogs/LawyerBlogs.vue';
import LawyerTestimonial from '~/components/testimonials/LawyerTestimonial.vue';
import LawyerTeams from '~/components/teams/LawyerTeams.vue';
import LawyerCounter from '~~/components/counters/LawyerCounter.vue';
import LawyerContact from '~~/components/contact/LawyerContact.vue';


useHead({
  title: "Home Lawyer - Creative Agency & Portfolio Vue Nuxt 3 Template",
}); 

</script>
