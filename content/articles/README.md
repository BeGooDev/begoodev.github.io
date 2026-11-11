# Articles du blog

Un fichier Markdown par article : `content/articles/<slug>.md`. Le nom du fichier donne l'URL
(`/articles/<slug>`) : minuscules, chiffres et tirets uniquement.

```markdown
---
title: Titre affiché sur la page
metaTitle: Titre pour Google, de 20 à 65 caractères – BeGooDev
description: Résumé pour Google et la liste du blog, de 70 à 160 caractères.
category: Pilotage
date: 2026-10-07
draft: true
---

Premier paragraphe…

## Un intertitre

Du texte avec du **gras**, de l'*italique* et un [lien](/mon-cv).

- une liste
- à puces

> Une citation s'affiche comme un encadré « À retenir ».
```

- Pas de titre `#` dans le texte : le titre de la page vient de `title`.
- `draft: true` : l'article est consultable par son lien (pour le relire) mais n'est ni listé, ni
  référencé. Retirer la ligne pour le publier.
- Les espaces insécables avant `: ; ! ?` et dans les « guillemets » sont ajoutées automatiquement.

## Publier un article

1. Créer le fichier (en brouillon si besoin).
2. `pnpm images:articles` : génère ses images de partage dans `public/img/articles/`
   (`--force` pour les régénérer après un changement de titre).
3. `pnpm dev` pour le relire : la liste du blog affiche aussi les brouillons, et les
   modifications du Markdown sont prises en compte à l'enregistrement.

La liste du blog, le sitemap, `llms.txt` et les balises SEO suivent automatiquement. Les
champs sont vérifiés au build : un champ manquant ou trop long fait échouer `pnpm build` avec
le nom du fichier en cause.
