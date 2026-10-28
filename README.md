# Truma v češtině

Česká statická verze hlavní části webu [truma.com](https://www.truma.com/), stav zdroje z 28. 10. 2026. Vychází z původních HTML struktur, stylů a médií Truma.

## Spuštění

Vyžaduje Node.js 22 nebo novější, bez externích npm závislostí.

```sh
npm test
npm run build
npm run dev
```

Výstup je v `dist/`. Lokální server: `http://127.0.0.1:4173`.

## Obsah

- 89 místních stránek: úvod, 25 kategorií a podkategorií, 5 stránek katalogu, 56 produktových detailů, společnost a prodejci.
- Česká navigace, popisy kategorií, hlavní produktové popisy a technické údaje.
- Původní rozložení, fotografie, písma a barevnost. Vlastní přístupné menu, vyhledávání, galerie a rozbalování parametrů bez WordPressu.
- Styly, SVG ikony a písma jsou součástí repozitáře. Fotografie a úvodní video se načítají z původních adres truma.com. Web proto není plně offline.

Nejde o kompletní kopii celého globálního webu. Rozsáhlé produktové FAQ a navazující technické výklady jsou nahrazené odkazem na původní dokumentaci. Historie, udržitelnost, tiskové zprávy, právní stránky a servisní služby odkazují na originál. Živá mapa prodejců, newsletter a partnerský portál zůstávají službami Truma. Část českých popisů je zkrácena; obrázky s vloženým anglickým textem zůstávají původní. Několik nedostupných ilustračních obrázků je nahrazeno jinými obrázky Truma. Proto není tato verze totožná 1:1 ve všech detailech ani funkcích.

## Úpravy

| Soubor | Účel |
| --- | --- |
| `src/truma/pages/**/index.html` | České stránky s původní strukturou |
| `src/truma/manifest.json` | Přehled místních stránek |
| `src/truma/translations.json` | Použitý anglicko-český slovník |
| `public/assets/truma/` | Místní styly, SVG ikony a písma |
| `public/assets/truma-cz.css` | Úpravy pro české texty a mobilní ovládání |
| `public/assets/truma-cz.js` | Menu, hledání, galerie a technické údaje |
| `public/assets/truma-search.json` | Vyhledávací index |
| `scripts/build-truma.mjs` | Sestavení a kontrola českého webu |
| `project.json`, `sites/truma.json` | Aktivní projekt a indexace |

Tato kopie obsahuje samostatný český web. Aktivní projekt `truma` používá statické sestavení; není nutné přidávat argument ani `SITE`. Původní obecná šablona a její formulářový server zůstávají pouze v původním repozitáři CCNplus/truma_cz.

## Nasazení

Připravená konfigurace Cloudflare: build `npm test && npm run build`, deploy `npx wrangler deploy`, Worker `truma`, statické soubory `dist/`. Touto změnou se ručně nemění nastavení hostingu ani DNS. Nahrání do `main` může spustit již existující automatizaci hostingu.

Pracovní URL v konfiguraci zůstává `https://truma.ccn-dev.cz`; dostupnost na této doméně nebyla ověřena. Indexace je vypnutá (`noindex,nofollow`, robots.txt a X-Robots-Tag). Ostré spuštění ani zapnutí indexace není součástí nahrání zdrojů do GitHubu.

Další stav a omezení: [docs/PROJECT.md](docs/PROJECT.md).
