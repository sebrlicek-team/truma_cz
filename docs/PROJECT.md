# Projekt: Truma.cz

## Zadání a zdroje
- 28. 10. 2026: uživatel požádal o přesnou českou kopii truma.com a nahrání do CCNplus/truma_cz a sebrlicek-team/truma_cz.
- Existující základ CCNplus/truma_cz: commit 19160a8f6cda2c1925d12cdcfc86a75bc8076241. Původní framework a jeho historie jsou zachované.
- Zdroj vzhledu a produktových údajů: veřejné stránky https://www.truma.com/ načtené 28. 10. 2026.
- Aktivní konfigurace: sites/truma.json a project.json. Worker truma. Sestavení: scripts/build-truma.mjs.
- Pracovní URL https://truma.ccn-dev.cz nebyla touto prací nasazena ani ověřena. Finální doména zůstává nezměněná.

## Struktura a vzhled
- 89 místních stránek: úvod, 25 kategorií, 5 stránek katalogu, 56 produktových detailů, společnost, prodejci.
- Původní HTML, CSS, písma, média a barevnost Truma. Překlad 1 083 textových položek a další úpravy názvů.
- Česká obsluha menu, mobilní navigace, vyhledávání podle názvu produktu, rozbalování technických parametrů a galerie bez původních skriptů WordPressu.

## Rozhodnutí a rozsah
- Uživatel autorizoval realizaci a přímé nahrání do obou uvedených repozitářů, bez požadavku na další schvalovací iterace.
- Existující konfigurace Workeru, pracovní doména a vypnutá indexace zůstaly zachované.
- Neproběhlo samostatné ostré spuštění, změna DNS ani konfigurace Cloudflare.

## Odchylky od zadání přesné kopie
- Rozsáhlé FAQ a delší technické texty na produktových detailech jsou nahrazené odkazem na originál. Místně zůstávají hlavní popisy, technické parametry a související produkty.
- Historie, udržitelnost, tiskové zprávy, právní a další servisní stránky vedou na originál; nejsou přeložené místně.
- Mapa prodejců je odkaz na oficiální živou službu. Newsletter a partnerský portál jsou externí služby Truma.
- Fotografie a úvodní video se načítají z původních adres truma.com; obrázky s anglickými nápisy nejsou graficky přeloženy. Některé české texty jsou zkrácené.
- Šest nedostupných původních mediálních odkazů bylo nahrazeno odpovídajícími ilustracemi Truma nebo místní ikonou. Nejde tedy o úplnou kopii 1:1.

## Ověření
- Sestavení všech místních stránek, interních souborů, kotev a SEO v režimu náhledu.
- Všech 29 automatických testů prošlo; sestavení všech 89 stránek prošlo.
- Prohlížeč: úvodní stránka, rozbalovací menu, vyhledávání a produktový detail Combi 6. Mobilní úvod a ovládání menu ověřeny v náhledu šířky 390 px. Technické údaje Combi 6 se správně rozbalují.
- Formuláře: žádné nové odesílání; odběr novinek vede na původní stránku výrobce. Testovací ani ostré příjemce tato změna nepotřebuje.
- Indexace: vypnutá v konfiguraci, HTML, robots.txt i _headers. Živá doména nebyla ověřena.
- Cloudflare: Builds for Preview branches a automatické nasazování main nebyly měněny ani ověřeny.

## Další krok
- Pro úplnou kopii doplnit zbývající redakční, právní a servisní stránky a dlouhé produktové FAQ v češtině, přeložit grafiku a napojit dynamické služby.
- Nasazení na doménu a zapnutí indexace až na příslušné zadání.
