<template>
  <span id="span-lang">
    <span
      @click="handleToggle"
      class="header__lang-selected-lang tp-lang-toggle"
      id="tp-header-lang-toggle"
    >
      <svg
        v-if="lang == 'en'"
        xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
        xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:cc="http://creativecommons.org/ns#"
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
        xmlns:svg="http://www.w3.org/2000/svg"
        xmlns:ns1="http://sozi.baierouge.fr"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        id="svg1"
        inkscape:version="0.46"
        viewBox="0 0 1000 500"
        sodipodi:version="0.32"
        inkscape:output_extension="org.inkscape.output.svg.inkscape"
        sodipodi:docname="united_kingdom.svg"
        style="width: 30px; height: 30px"
        class="d-none d-lg-inline"
      >
        <g id="g578" transform="scale(16.667)">
          <rect
            id="rect124"
            style="stroke-width: 1pt; fill: #000066"
            height="30"
            width="60"
            y="0"
            x="0"
          />
          <g id="g584">
            <path
              id="path146"
              style="stroke-width: 1pt; fill: #ffffff"
              d="m0 0v3.3541l53.292 26.646h6.708v-3.354l-53.292-26.646h-6.708zm60 0v3.354l-53.292 26.646h-6.708v-3.354l53.292-26.646h6.708z"
            />
            <path
              id="path136"
              style="stroke-width: 1pt; fill: #ffffff"
              d="m25 0v30h10v-30h-10zm-25 10v10h60v-10h-60z"
            />
            <path
              id="path141"
              style="stroke-width: 1pt; fill: #cc0000"
              d="m0 12v6h60v-6h-60zm27-12v30h6v-30h-6z"
            />
            <path
              id="path150"
              style="stroke-width: 1pt; fill: #cc0000"
              d="m0 30l20-10h4.472l-20 10h-4.472zm0-30l20 10h-4.472l-15.528-7.7639v-2.2361zm35.528 10l20-10h4.472l-20 10h-4.472zm24.472 20l-20-10h4.472l15.528 7.764v2.236z"
            />
          </g>
        </g>
      </svg>

      <span v-if="lang == 'en'"> English</span>

      <svg
        v-if="lang == 'th'"
        xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:cc="http://web.resource.org/cc/"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns:svg="http://www.w3.org/2000/svg"
        xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
        xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
        xmlns:ns1="http://sozi.baierouge.fr"
        id="svg378"
        viewBox="0 0 1063 708.66"
        version="1"
        y="0"
        x="0"
        style="width: 30px; height: 30px"
        class="d-none d-lg-inline"
      >
        <rect
          id="rect171"
          style="fill-rule: evenodd; stroke-width: 1pt; fill: #ffffff"
          height="708.66"
          width="1063"
          y="0"
          x="0"
        />
        <rect
          id="rect403"
          style="fill-rule: evenodd; stroke-width: 1pt; fill: #001b9a"
          height="236.22"
          width="1063"
          y="236.22"
          x="0"
        />
        <rect
          id="rect135"
          style="fill-rule: evenodd; stroke-width: 1pt; fill: #e70000"
          height="118.11"
          width="1063"
          y="0"
          x="0"
        />
        <rect
          id="rect136"
          style="fill-rule: evenodd; stroke-width: 1pt; fill: #e70000"
          height="118.11"
          width="1063"
          y="590.55"
          x="0"
        />
      </svg>

      <span v-if="lang == 'th'"> ไทย</span>
    </span>
    <ul
      :class="`header__lang-list tp-lang-list ${
        open ? 'tp-lang-list-open' : ''
      }`"
    >
      <li @click="changeLanguage('th')">ไทย</li>
      <li @click="changeLanguage('en')">English</li>
    </ul>
  </span>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      lang: useCookie("lang").value,
    };
  },
  methods: {
    handleToggle() {
      this.open = !this.open;
    },
    changeLanguage(value) {
      this.$i18n.locale = value;
      //   useLang().value = this.$i18n.locale;
      //   this.lang = useLang().value;
    //   localStorage.setItem("lang", this.$i18n.locale);

      const lang = useCookie("lang");
      lang.value = this.$i18n.locale;

      window.location.reload(true);
    },
  },
};
</script>

<style scoped>
.header__lang-selected-lang {
  color: var(--tp-common-body-op-7);
  font-weight: bold;
}

/* .header__lang-selected-lang::after {
  color: var(--tp-text-body);
} */
.header__lang-selected-lang:hover {
  color: #ffcb05;
}

.header__lang-list {
  position: absolute;
  top: 30px;
  padding-top: 0px;
  /* position: relative; */
}

#span-lang {
  position: relative;
}
</style>
