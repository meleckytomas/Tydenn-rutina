# Týdenní rutina

Statická HTML stránka pro páteční týdenní revizi.

## Jak to funguje

- Checklist a reflexní zápisy se ukládají do `localStorage` v prohlížeči.
- Klíč ukládání obsahuje aktuální ISO týden, takže každý další týden začne stránka s prázdnými checkboxy.
- Historie z minulých týdnů je dostupná přes výběr týdne.
- Po nastavení GitHub ukládání se historie synchronizuje do soukromého GitHub repozitáře.

## Trvalé GitHub ukládání

Doporučené nastavení:

1. Nech tento repozitář veřejný, pokud ho používáš pro GitHub Pages.
2. Vytvoř samostatný soukromý repozitář například `Tydenn-rutina-data`.
3. V GitHubu vytvoř fine-grained token pouze pro tento soukromý repozitář s oprávněním `Contents: Read and write`.
4. Ve stránce otevři `GitHub ukládání historie`, doplň owner, repo, větev, soubor a token.
5. Klikni na `Uložit nastavení` a potom `Uložit na GitHub`.

Token se neukládá do kódu ani do repozitáře, jen lokálně v daném prohlížeči.

## GitHub Pages

1. Vytvoř nový repozitář `Týdenní rutina`.
2. Nahraj do něj soubory `index.html`, `styles.css`, `app.js` a `README.md`.
3. V GitHubu otevři `Settings` -> `Pages`.
4. Nastav `Deploy from a branch`, větev `main`, složku `/root`.
5. Po nasazení bude stránka dostupná přes GitHub Pages URL.
