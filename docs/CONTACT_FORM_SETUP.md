# 📧 Setup Form Contatti

Guida completa per configurare il form contatti con invio email tramite Resend.

## 📋 Prerequisiti

- ✅ Account Resend (https://resend.com)
- ✅ Dominio verificato su Resend (opzionale ma consigliato)
- ✅ Email dove ricevere i messaggi

## 🚀 Step 1: Crea Account Resend

1. Vai su **https://resend.com**
2. Clicca su "Sign Up" e registrati
3. Verifica la tua email

## 🔑 Step 2: Ottieni API Key

1. Vai alla dashboard Resend
2. Clicca su **"API Keys"** nel menu laterale
3. Clicca su **"Create API Key"**
4. Dai un nome (es. "Cristian's Pastry Contact Form")
5. Seleziona i permessi: **"Sending access"**
6. Copia l'API key (inizia con `re_...`)

**⚠️ IMPORTANTE**: Salva subito l'API key, non potrai vederla di nuovo!

## 📧 Step 3: Verifica Dominio (Opzionale ma Consigliato)

### Perché verificare il dominio?

- ✅ Email non finiscono in spam
- ✅ Maggiore deliverability
- ✅ Personalizzazione completa del mittente

### Come verificare:

1. Nella dashboard Resend, vai su **"Domains"**
2. Clicca **"Add Domain"**
3. Inserisci il tuo dominio (es. `cristianspastry.com`)
4. Aggiungi i record DNS forniti:
   - **SPF record** (TXT)
   - **DKIM record** (TXT)
   - **DMARC record** (TXT)
5. Attendi la verifica (può richiedere fino a 48h)

### Se NON verifichi il dominio:

Puoi comunque testare usando:
```typescript
from: 'onboarding@resend.dev'
```

Ma per produzione **devi** usare un dominio verificato.

## ⚙️ Step 4: Configura Variabili d'Ambiente

### File `.env`

Apri il file `.env` e aggiorna le variabili:

```bash
# Resend (Email Service)
RESEND_API_KEY="re_TuaAPIKeyQui"
CONTACT_EMAIL="tua@email.com"
```

### Valori da modificare:

1. **RESEND_API_KEY**: Incolla la chiave API copiata prima
2. **CONTACT_EMAIL**: La TUA email dove ricevere i messaggi

**Esempio:**
```bash
RESEND_API_KEY="re_abc123xyz789..."
CONTACT_EMAIL="cristian@cristianspastry.com"
```

## 🛠️ Step 5: Aggiorna Server Action (SE hai dominio verificato)

Se hai verificato il dominio, apri:

**`src/lib/actions/contact.ts`**

Trova questa riga (circa linea 105):

```typescript
from: 'Cristian\'s Pastry <onboarding@resend.dev>',
```

Sostituisci con:

```typescript
from: 'Cristian\'s Pastry <noreply@tuodominio.com>',
```

**Esempio:**
```typescript
from: 'Cristian\'s Pastry <noreply@cristianspastry.com>',
```

⚠️ **Se NON hai dominio verificato**, lascia `onboarding@resend.dev`.

## 🧪 Step 6: Testa il Form

### In locale:

```bash
npm run dev
```

Vai su: http://localhost:3000/chi-sono

1. Compila il form con dati di test
2. Clicca "Invia Messaggio"
3. Controlla la tua email (CONTACT_EMAIL)

### Verifica log:

Nel terminale dovresti vedere:
```
Email inviata con successo: <email-id>
```

### Controlla Dashboard Resend:

1. Vai su **"Logs"** nella dashboard
2. Dovresti vedere l'email appena inviata
3. Stato: **"delivered"** ✅

## 🐛 Troubleshooting

### Errore: "RESEND_API_KEY non configurata"

**Causa**: La variabile d'ambiente non è stata caricata.

**Soluzione**:
1. Verifica che `.env` contenga `RESEND_API_KEY`
2. Riavvia il server: `npm run dev`
3. Verifica che non ci siano spazi prima/dopo il valore

### Errore: "Invalid API key"

**Causa**: API key sbagliata o scaduta.

**Soluzione**:
1. Genera una nuova API key su Resend
2. Aggiorna `.env`
3. Riavvia il server

### Errore: "Email not sent - Domain not verified"

**Causa**: Stai usando un dominio non verificato in produzione.

**Soluzione opzione 1** (temporanea):
```typescript
from: 'onboarding@resend.dev'
```

**Soluzione opzione 2** (definitiva):
Verifica il dominio su Resend (vedi Step 3)

### Email finiscono in spam

**Cause possibili**:
- ❌ Dominio non verificato
- ❌ Record SPF/DKIM mancanti
- ❌ Usando `onboarding@resend.dev` in produzione

**Soluzioni**:
1. Verifica il dominio su Resend
2. Aggiungi tutti i record DNS richiesti
3. Usa un mittente con il tuo dominio verificato

### Non ricevo l'email

**Checklist**:
1. ✅ Controlla che `CONTACT_EMAIL` sia corretto
2. ✅ Controlla la cartella spam
3. ✅ Verifica i log di Resend (Dashboard > Logs)
4. ✅ Controlla il terminale per errori
5. ✅ Verifica che l'API key sia valida

## 📊 Limiti Free Tier Resend

Il piano gratuito include:
- ✅ **100 email/giorno**
- ✅ **3,000 email/mese**
- ✅ 1 dominio verificato

Perfetto per un sito personale! Per volumi maggiori, considera un upgrade.

## 🔒 Sicurezza

### ⚠️ NON committare mai l'API key!

Il file `.env` è già in `.gitignore`, ma assicurati:

```bash
# .gitignore
.env
.env.local
.env.production
```

### Rate Limiting

La Server Action è protetta contro spam, ma considera di aggiungere:

**Opzione 1: Turnstile (Cloudflare)**
- Gratuito
- Invisibile agli utenti
- Blocca bot

**Opzione 2: reCAPTCHA**
- Google reCAPTCHA v3
- Invisibile

## 🎨 Personalizzazione Email

Puoi personalizzare il template HTML in:
**`src/lib/actions/contact.ts`** (linea ~110)

Modifica:
- Colori (attualmente viola: `#667eea`)
- Layout
- Logo (aggiungi tag `<img>`)
- Footer

## 🚀 Deploy su Vercel

### 1. Aggiungi variabili d'ambiente:

Dashboard Vercel → Settings → Environment Variables

Aggiungi:
```
RESEND_API_KEY = re_tuakey...
CONTACT_EMAIL = tua@email.com
```

### 2. Redeploy:

```bash
git add .
git commit -m "feat: aggiungi form contatti con Resend"
git push
```

Vercel farà automaticamente il redeploy!

## 📧 Email di Test

Per testare, usa questi dati:

```
Nome: Mario Rossi
Email: mario.rossi@example.com
Oggetto: Test form contatti
Messaggio: Questo è un messaggio di test per verificare che il form funzioni correttamente.
```

Dovresti ricevere un'email ben formattata con:
- ✅ Informazioni mittente
- ✅ Messaggio formattato
- ✅ Timestamp
- ✅ Reply-to funzionante

## 🎯 Checklist Finale

Prima di andare in produzione:

- [ ] API key Resend configurata
- [ ] Dominio verificato (consigliato)
- [ ] Email di test ricevuta correttamente
- [ ] Email NON in spam
- [ ] Form funziona in locale
- [ ] Variabili d'ambiente su Vercel
- [ ] Form funziona in produzione
- [ ] Reply-to funziona (prova a rispondere)

## 🆘 Support

Se hai problemi:

1. **Resend Docs**: https://resend.com/docs
2. **Dashboard Logs**: https://resend.com/logs
3. **Status Page**: https://resend.statuspage.io

## 📚 Link Utili

- [Resend Dashboard](https://resend.com/overview)
- [API Keys](https://resend.com/api-keys)
- [Domain Setup](https://resend.com/domains)
- [Email Logs](https://resend.com/logs)
- [Documentazione](https://resend.com/docs)

---

✅ **Setup completato!** Il form contatti è pronto per ricevere messaggi.
