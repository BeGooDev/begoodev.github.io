---
title: Une courte vidéo pour faire valider chaque évolution
metaTitle: Faire valider chaque évolution en vidéo – BeGooDev
description: Avant de livrer une évolution, j'enregistre une vidéo de quelques minutes qui la montre en action. Le client valide quand il veut, sans réunion ni installation.
category: Validation
date: 2026-10-07
---

Entre deux démos, le travail continue d'avancer : un nouvel écran, une correction, un formulaire qui change. Comment faire valider ces évolutions sans multiplier les réunions ni demander au client d'installer quoi que ce soit ?

Ma réponse : une courte vidéo. Pour chaque évolution, j'enregistre mon écran pendant que je l'utilise, en commentant à voix haute. La vidéo est jointe à la demande de validation de l'évolution (la « pull request », pour les initiés), là où le client peut la regarder, réagir et donner son accord avant que la modification soit mise en ligne.

## Pourquoi une vidéo plutôt qu'une capture ou un texte

Une capture d'écran montre un état, pas un comportement. Elle ne dit pas ce qui se passe quand on clique, quand on se trompe dans un champ ou quand la liste est vide.

Un texte demande un effort d'imagination et laisse place à l'interprétation : « le bouton enregistre et renvoie vers la liste » peut se comprendre de plusieurs façons.

Une vidéo de deux minutes montre exactement ce qui a été fait, dans l'ordre où l'utilisateur le vivra. Il n'y a rien à deviner.

## Ce que contient une bonne vidéo

- Une durée courte : une à trois minutes, une seule évolution par vidéo.
- Le contexte en une phrase : quel besoin on traite, et pour qui.
- Le parcours complet, comme un utilisateur le ferait, avec des données réalistes.
- Les cas particuliers : message d'erreur, liste vide, droits insuffisants.
- Ce qui n'est pas encore fait, dit clairement, pour éviter les malentendus.

## Ce que ça change pour le client

Il valide quand il veut. Pas besoin de trouver un créneau commun : la vidéo se regarde entre deux rendez-vous, sur un ordinateur comme sur un téléphone.

Il peut la faire circuler. La personne à l'origine du besoin, souvent un utilisateur de terrain, peut donner son avis directement, sans réunion à plusieurs.

Les retours sont précis. « À 1 min 20, je m'attendais à revenir sur la fiche plutôt que sur la liste » est bien plus utile qu'un « ce n'est pas tout à fait ça ».

Il garde une trace. Six mois plus tard, quand on se demande pourquoi un écran fonctionne de telle manière, la vidéo et la validation qui l'accompagne sont toujours là.

## Ce que ça change pour le prestataire

S'enregistrer en train d'utiliser son propre travail est un excellent contrôle qualité. En préparant la vidéo, on repère souvent un libellé ambigu ou un cas oublié, corrigé avant même l'envoi.

Et les allers-retours diminuent : une évolution validée en vidéo arrive en production sans surprise.

## Avec la démo hebdomadaire, pas à sa place

La vidéo ne remplace pas la démo hebdomadaire. La démo sert à échanger, prendre du recul et arbitrer les priorités ; la vidéo sert à valider rapidement une évolution précise. Ensemble, elles gardent le client au plus près du projet sans lui prendre beaucoup de temps.

## À retenir

> Deux minutes de vidéo valent mieux qu'une page de description. Le client voit exactement ce qui sera livré, valide à son rythme, et personne ne découvre de surprise en production.
