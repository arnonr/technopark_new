<template>
  <section class="login__area pt-110 pb-110">
    <div class="container">
      <div class="login__inner p-relative z-index-1">
        <login-shapes />
        <div class="row justify-content-center">
          <div class="col-xl-6 col-lg-8 col-md-10">
            <div class="login__wrapper">
              <div class="login__top mb-30 text-center">
                <h3 class="login__title">Hello Again</h3>
                <p>Enter your credentials to acces your account.</p>
              </div>
              <div class="login__form">
                <!-- form start -->
                <login-form />
                <!-- form end -->
                <div class="login__social text-center">
                  <h3 class="login__social-header">Or Sign in with</h3>
                  <!-- social media start -->
                  <login-with-social />
                  <!-- social media end -->
                </div>
                <div class="login__register-now">
                  <p>
                    Don’t have an account?
                    <nuxt-link href="/register">Register Now</nuxt-link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LoginForm from "../forms/LoginForm.vue";
import LoginShapes from "./LoginShapes.vue";
import LoginWithSocial from "./LoginWithSocial.vue";

export default {
  components: { LoginForm, LoginWithSocial, LoginShapes },
};
</script>
