import { createI18n } from "vue-i18n";
import th from "../locales/th-TH";
import en from "../locales/en-US";

export default defineNuxtPlugin(({ vueApp }) => {
  const lang = useCookie("lang");

  if (lang.value == null) {
    lang.value = "th";
  }

  //   if (process.client) {
  //     const { data: res } = useAsyncData("contactUs", async () => {
  //       let data = await $fetch(`http://localhost:3000/api/lang`, {
  //         lang: lang.value,
  //       });
  //       return data;
  //     });
  //   }

  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    silentTranslationWarn: true,
    locale: lang.value,
    messages: {
      en,
      th,
    },
  });
  vueApp.use(i18n);
});
