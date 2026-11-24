MADA SOCIAL V4 — thème sombre inspiré de la maquette fournie

DÉPLOIEMENT
1. Décompressez le ZIP.
2. Envoyez TOUS les fichiers à la racine du dépôt GitHub.
3. GitHub > Settings > Pages > Deploy from a branch > main > /(root) > Save.
4. Attendez la publication puis ouvrez l'adresse GitHub Pages.

SUPABASE
Le projet utilise l'URL et la clé publishable déjà communiquées.
Le fil essaie de lire la table public.posts avec created_at.
La publication suppose les colonnes user_id, content et image_url.
Si les colonnes de votre table sont différentes, il faudra adapter app.js.

IMPORTANT
Cette version fournit surtout le nouvel habillage visuel et un début de connexion au fil Supabase.
Les boutons Amis, Messages, Vidéos, Groupes, Pages, réactions et commentaires affichent encore des messages de démonstration : ils ne sont pas tous connectés à la base.
L'authentification/inscription n'est pas incluse dans cette maquette. Ne présentez pas cette version comme un réseau social entièrement terminé.
Ne mettez jamais une clé service_role ou une clé secrète dans le navigateur. La clé publishable est prévue pour l'application publique, avec des politiques RLS correctes.
