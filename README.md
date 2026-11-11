# GermanLingua

Site-ul școlii de limba germană GermanLingua (Chișinău), în 4 limbi: germană, română, engleză și rusă.

Construit cu Next.js, TypeScript și Tailwind CSS, cu animații GSAP și derulare lină Lenis.

## Pornire pe calculator

```
npm install
npm run dev
```

Apoi deschide http://localhost:3000.

## Unde se schimbă lucrurile

| Ce vrei să schimbi | Fișier |
| --- | --- |
| Textele, pe limbi | `src/i18n/dictionaries/ro.ts`, `de.ts`, `en.ts`, `ru.ts` |
| Telefon, e-mail, rețele sociale, imagini | `src/data/site.ts` |
| Lista cursurilor și prețurile | `src/data/courses.ts` |
| Culorile și fonturile | `src/app/globals.css` (blocul `@theme`) |
| Paginile | `src/app/[lang]/` |

## Formulare

Formularele trimit cererile la `/api/lead`. Ca ele să ajungă într-un Google Sheet sau pe e-mail,
setează `LEAD_WEBHOOK_URL` (vezi `.env.example`).

## Imagini

Logo-ul și fotografiile se încarcă deocamdată de pe site-ul actual, germanlingua.md.
Înainte ca domeniul să fie mutat pe acest site, ele trebuie copiate în `public/images`
și adresele din `src/data/site.ts` schimbate.
