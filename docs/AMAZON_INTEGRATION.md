# Integrazione Amazon Affiliazione

Questo documento spiega come funziona l'integrazione con Amazon Associates e come configurare l'auto-fetch dei prodotti.

## 📋 Indice

- [Come Funziona Ora](#come-funziona-ora)
- [Aggiungere un Prodotto](#aggiungere-un-prodotto)
- [Configurare l'Auto-Fetch (Opzionale)](#configurare-lauto-fetch-opzionale)
- [Amazon PA-API Setup](#amazon-pa-api-setup)
- [FAQ](#faq)

---

## Come Funziona Ora

### ✅ Funzionalità Attive

1. **Estrazione Automatica ASIN**: Quando inserisci un link Amazon, il sistema estrae automaticamente l'ASIN (codice prodotto).
2. **Gestione Prodotti CMS**: Gestisci tutti i prodotti affiliati da Sanity Studio.
3. **Pagina /strumenti**: Pagina dedicata con categorie e filtri.
4. **Link Affiliazione**: Tutti i link includono il tuo tag Amazon Associates.
5. **SEO Ottimizzato**: Attributo `rel="sponsored"` e disclaimer trasparente.

### ⏳ In Attesa di API

- **Auto-fetch titolo**: Inserimento manuale richiesto
- **Auto-fetch immagine**: Upload manuale richiesto
- **Auto-fetch prezzo**: Inserimento manuale (opzionale)
- **Aggiornamento automatico**: Non disponibile

---

## Aggiungere un Prodotto

### Passo 1: Vai su Sanity Studio

Accedi a `/studio` e vai su **⚙️ Gestione → 📦 Prodotti Affiliati**.

### Passo 2: Crea Nuovo Prodotto

Clicca su **"Create"** → **"Product"**.

### Passo 3: Incolla Link Amazon

1. **Trova il prodotto su Amazon**
2. **Copia il link** (es: `https://www.amazon.it/dp/B07VGRJDFY`)
3. **Incollalo nel campo "Link Amazon"**
4. ✅ L'ASIN verrà estratto automaticamente

### Passo 4: Compila Dettagli Manualmente

Finché non configuriamo l'API Amazon, devi inserire:

- **Nome Prodotto**: Copia da Amazon
- **Categoria**: Scegli tra le 6 disponibili
- **Immagine**: Scarica da Amazon e carica
- **Descrizione**: Max 200 caratteri
- **Prezzo** (opzionale): Es. "29,99€"

### Passo 5: Opzioni Extra

- **Featured**: Spunta per mostrare in homepage (futuro)
- **Ordine**: Numero per ordinamento (0 = primo)
- **Testo CTA**: Personalizza il bottone (default: "Scopri la selezione")

### Passo 6: Pubblica

Salva il documento e il prodotto apparirà su `/strumenti`.

---

## Configurare l'Auto-Fetch (Opzionale)

### Perché Configurare l'API?

**Vantaggi:**
- ⚡ **Velocità**: Recupero automatico titolo, immagine, prezzo
- 🔄 **Aggiornamenti**: Prezzi sempre aggiornati
- 📊 **Dati Extra**: Rating, recensioni, disponibilità
- 🖼️ **Qualità**: Immagini alta risoluzione

**Svantaggi:**
- 🔐 Richiede approvazione Amazon
- 📈 Serve almeno 3 vendite qualificate
- 💻 Setup tecnico richiesto

---

## Amazon PA-API Setup

### Prerequisiti

1. ✅ Account **Amazon Associates** attivo
2. ✅ Almeno **3 vendite qualificate** negli ultimi 180 giorni
3. ✅ Link prodotti del tuo sito già attivo

### Step 1: Registrati per PA-API

1. Vai su: https://webservices.amazon.com/paapi5/documentation/register-for-pa-api.html
2. Accedi con il tuo account Amazon Associates
3. Completa la registrazione

### Step 2: Ottieni Credenziali

1. Vai su: https://webservices.amazon.com/paapi5/scratchpad/index.html
2. Troverai:
   - **Access Key**: `AKIAIOSFODNN7EXAMPLE`
   - **Secret Key**: `wJalrXUtnFEMI/K7MDENG/...`
3. **IMPORTANTE**: Non condividere mai queste chiavi!

### Step 3: Trova Partner Tag

1. Vai su: https://programma-affiliazione.amazon.it/home/account/tag/manage
2. Copia il tuo **Tracking ID** (es: `cristianspastry-21`)

### Step 4: Installa Pacchetto NPM

```bash
npm install amazon-paapi
```

### Step 5: Configura Variabili d'Ambiente

Crea `.env.local` (o aggiungi a quello esistente):

```bash
# Amazon PA-API Credentials
AMAZON_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE
AMAZON_SECRET_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AMAZON_PARTNER_TAG=cristianspastry-21
AMAZON_MARKETPLACE=it
```

### Step 6: Implementa API Call

Il codice è già preparato in `/src/lib/amazon/api.ts`.

Quando avrai le credenziali:

1. Decomenta il codice nell'API
2. Aggiungi logica auto-fetch in Sanity Studio
3. Test e deploy

---

## FAQ

### ❓ Posso usare il sito senza PA-API?

**Sì!** Il sito funziona perfettamente anche senza l'API. Devi solo inserire manualmente titolo, immagine e prezzo.

### ❓ Come faccio le 3 vendite qualificate?

Devi generare almeno 3 ordini qualificati tramite i tuoi link affiliazione entro 180 giorni. Amazon conta solo ordini conclusi e non rimborsati.

### ❓ Quanto costa l'API?

L'API è **gratuita** per membri Amazon Associates, ma devi rispettare i requisiti di vendita.

### ❓ Posso usare link di altri marketplace?

Sì! Il sistema supporta Amazon.it, Amazon.com, Amazon.co.uk, ecc. Specifica il marketplace nelle env variables.

### ❓ Come aggiorno il prezzo di un prodotto?

**Senza API**: Modifica manualmente in Sanity Studio.
**Con API**: Implementa cron job che aggiorna i prezzi automaticamente.

### ❓ Posso nascondere il prezzo?

Sì, lascia vuoto il campo "Prezzo" e non verrà mostrato.

### ❓ I link affiliazione sono tracciati?

Sì, tutti i link includono il tuo Partner Tag. Puoi anche attivare il tracking Google Analytics nel componente ProductCard.

### ❓ È conforme alle policy Amazon?

Sì, il sistema include:
- Attributo `rel="sponsored"` sui link
- Disclaimer affiliazione ben visibile
- Rispetto delle policy di presentazione prodotti

---

## Supporto

Per problemi o domande:
- 📖 Leggi la [Documentazione PA-API](https://webservices.amazon.com/paapi5/documentation/)
- 💬 Contatta il supporto Amazon Associates
- 🐛 Apri un issue su GitHub

---

**Ultimo aggiornamento**: Gennaio 2025
