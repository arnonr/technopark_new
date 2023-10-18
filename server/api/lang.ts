export default defineEventHandler((event) => {
  let lang = getCookie(event, "lang") || 'th';
  return {
    lang: lang,
  };
});
