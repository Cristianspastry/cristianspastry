# Project Changes Log

Data: 2026-03-13

Questo file riassume tutte le modifiche e implementazioni effettuate nel progetto.

## Autenticazione e ruoli
- NextAuth configurato con sessione JWT e ruolo in token/session.
- Ruoli utente: ADMIN, EDITOR, USER.
- Callback JWT aggiorna il ruolo dal DB quando necessario.
- Flusso "collega account" sicuro: accesso con metodo originale, poi link da profilo.
- Messaggi di errore auth migliorati per provider.
- Pagine auth dedicate: sign-in, sign-out, register, forgot password, reset password, error.
- Provider abilitati (quando presenti env):
  - Discord
  - Google
  - Facebook
  - TikTok
  - Resend (magic link)
  - Credentials (email/password)
- Rimosso supporto auth Instagram (richiesta utente).

## Database / Prisma
- Schema Prisma esteso:
  - UserRole, role su User.
  - passwordHash su User.
  - PasswordResetToken.
  - FavoriteRecipe, FavoriteTechnique, FavoriteScience.
- API register/reset usa passwordHash.
- Dev check per Prisma Client per evitare errori schema mismatch.

## API e sicurezza
- /api/auth/register per registrazione.
- /api/auth/reset/request e /api/auth/reset/confirm per reset password.
- /api/favorites supporta recipe/technique/science (GET/POST/DELETE).
- /api/admin/ping protetto da ruolo admin.

## Profilo e UI utente
- Pagina profilo con:
  - dettagli account
  - ruolo (solo admin/editor)
  - provider collegati
  - azioni rapide (studio/admin/signout)
  - preferiti per ricette, tecniche, scienza
- Pulsante "Collega Google/Facebook/TikTok" nel profilo.
- Toast di conferma per link provider (google/facebook/tiktok).

## Preferiti
- Heart button con stato attivo/inattivo.
- Toast su aggiunta/rimozione preferiti.
- Preferiti in:
  - card ricette, tecniche, scienza
  - pagine dettaglio ricetta/tecnica/scienza
- Query Sanity per preferiti (ricette/tecniche/scienza).

## UI/UX e layout
- Header aggiornata per mostrare profilo e ruolo.
- Layout include Facebook SDK asincrono + getLoginStatus.
- Pulsante Facebook SDK (XFBML) nel login.
- Toast provider globale (Sonner).

## Provider e integrazioni esterne
- Facebook SDK caricato in layout (opzionale via env).
- Facebook statusChangeCallback emette evento "fb-login-status".
- TikTok provider configurato con note su verifica dominio.
- Aggiunto file di verifica TikTok in public:
  - public/tiktokn30wuON1FEvonPwZonr0JvKMc6nI9zkq.txt

## Immagini remote
- next.config.js aggiornato per:
  - platform-lookaside.fbsbx.com
  - *.tiktokcdn.com
  - *.tiktokcdn-us.com

## Privacy e termini
- Pagine /privacy e /terms create.
- Footer aggiornato con link privacy/terms.

## Documentazione
- README aggiornato con:
  - env vars per auth/providers
  - Prisma setup per auth
  - note su magic link
  - nuove feature (auth, preferiti, profilo, privacy/terms)
- Aggiunto .env.example con tutte le variabili principali.

## Note operative
- Dopo modifiche Prisma: eseguire
  - npm run db:push
  - npm run db:generate
- Riavviare dev server dopo aggiornamenti env.

