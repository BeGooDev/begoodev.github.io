# Logo BeGooDev

Fichiers à transmettre aux partenaires. Ils ne sont pas publiés sur le site.

| Fichier | Usage |
|---|---|
| `logo-begoodev.svg` / `.png` | Logo sur fond clair |
| `logo-begoodev-dark.svg` / `.png` | Logo sur fond sombre |
| `favicon-mark.svg` / `.png` | Monogramme « b_ » (avatar, icône, favicon) |

Le SVG est à privilégier (vectoriel, net à toutes les tailles). Le texte y est vectorisé :
le logo s'affiche à l'identique sans avoir la police installée. Les PNG font 2000 px de large
(1024 × 1024 pour le monogramme), sur fond transparent.

## Couleurs

| Couleur | Hex | Usage |
|---|---|---|
| Vert | `#22C55E` | « good » et « _ » |
| Encre | `#101418` | « be » et « ev » sur fond clair |
| Blanc cassé | `#F2F5F7` | « be » et « ev » sur fond sombre |
| Noir | `#0B0E11` | Fond du monogramme |

## Typographie

Space Grotesk Bold (700) — police libre (SIL Open Font License).

## Régénérer les SVG

Les tracés sont générés depuis `@fontsource/space-grotesk` (latin, 700) avec fontTools et
HarfBuzz : mise en forme identique au composant `Logo` du site (taille 88, interlettrage −1).
