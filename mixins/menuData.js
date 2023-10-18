export default {
  data() {
    return {
      menuData: [
        {
          id: 1,
          hasDropdown: false,
          title: 'Home',
          link: "/",
        },
        {
          id: 2,
          title: "Service",
          hasDropdown: false,
          link: "/news",
        },
        {
          id: 3,
          title: "News & Annoucements",
          hasDropdown: false,
          link: "/news",
        },
        {
          id: 4,
          title: "About Us",
          hasDropdown: true,
          link: "#",
          submenus: [
            { title: "History", link: "/about-us/1" },
            { title: "Organization", link: "/about-us/2" },
            { title: "Administrator", link: "/administrator" },
          ],
        },
        {
          id: 5,
          hasDropdown: false,
          title: "Contact Us",
          link: "/contact-us",
        },
      ],
    };
  },
};
