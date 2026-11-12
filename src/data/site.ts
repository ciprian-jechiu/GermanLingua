/**
 * Date fixe despre școală. Imaginile vin deocamdată de pe site-ul actual
 * (germanlingua.md). Înainte de mutarea domeniului pe site-ul nou, ele trebuie
 * copiate în /public/images și adresele de mai jos schimbate în căi locale.
 */
const WP = "https://germanlingua.md/wp-content/uploads";

export const site = {
  name: "GermanLingua",
  phone: "+373 683 90 114",
  phoneHref: "tel:+37368390114",
  email: "hallo@germanlingua.md",
  facebook: "https://www.facebook.com/germanlinguamd",
  instagram: "https://www.instagram.com/germanlingua_cursuri_germana/",
  mapEmbed:
    "https://www.google.com/maps?q=GermanLingua%2C%20str.%20Serghei%20Lazo%2040%2C%20Chi%C8%99in%C4%83u&z=15&output=embed",
  exams: ["DSD", "TestDaF", "Goethe-Zertifikat B2", "telc Deutsch B2", "telc Medizin"],
};

export const media = {
  heroHome: "/images/hero-home.jpg",
  heroCourses: "/images/hero-courses.jpg",
  heroAbout: "/images/hero-about.jpg",
  heroContact: "/images/hero-contact.jpg",
  logo: `${WP}/2022/07/GermanLingua_logo.png`,
  logoInverted: `${WP}/2022/08/GermanLingua_logo_inverted.png`,
  hero: `${WP}/2022/07/curs-germana-chisinau-GermanLingua.jpg`,
  group: `${WP}/2022/07/curs-limba-germana-in-grup-prezenta-fizica-GermanLingua.jpg`,
  online: `${WP}/2022/07/germana-in-chisinau-si-online-GermanLingua.jpg`,
  a2: `${WP}/2022/07/curs-limba-germana-a2-GermanLingua.jpg`,
  founder: "/images/founder.jpg",
  stories: [
    `${WP}/2022/07/Marina-Bulat.png`,
    `${WP}/2022/07/Aliona-Cojocaru.png`,
    `${WP}/2022/07/Daniela-Simionel.png`,
    `${WP}/2022/07/Marina-Bogdan.png`,
    `${WP}/2022/07/Vlad-Vlad.png`,
  ],
};
