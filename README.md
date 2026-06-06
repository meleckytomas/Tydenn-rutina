# Týdenní rutina

Statická HTML stránka pro páteční týdenní revizi.

## Jak to funguje

- Checklist a poznámky se ukládají do `localStorage` v prohlížeči.
- Klíč ukládání obsahuje aktuální ISO týden, takže každý další týden začne stránka s prázdnými checkboxy.
- Historie z minulých týdnů zůstává jen v daném prohlížeči. Není synchronizovaná mezi zařízeními.

## GitHub Pages

1. Vytvoř nový repozitář `Týdenní rutina`.
2. Nahraj do něj soubory `index.html`, `styles.css`, `app.js` a `README.md`.
3. V GitHubu otevři `Settings` -> `Pages`.
4. Nastav `Deploy from a branch`, větev `main`, složku `/root`.
5. Po nasazení bude stránka dostupná přes GitHub Pages URL.
