# Icone e Immagini Necessarie

Questa cartella deve contenere le seguenti icone per completare l'ottimizzazione SEO.

## 📋 Lista File Richiesti

### Favicon
- **favicon.ico** - 32x32px
- **favicon-16x16.png** - 16x16px
- **favicon-32x32.png** - 32x32px

### Apple Touch Icons
- **apple-touch-icon.png** - 180x180px

### Android Chrome (PWA)
- **android-chrome-192x192.png** - 192x192px
- **android-chrome-512x512.png** - 512x512px

### Open Graph
- **og-image.jpg** - 1200x630px
  - Immagine di default per social sharing
  - Testo: "Cristian's Pastry - Dolci Artigianali"
  - Immagine accattivante con dolci

### Logo
- **logo.png** - 512x512px (trasparente)
- **logo.svg** - Vettoriale

## 🎨 Come Crearli

### Opzione 1: Favicon.io (Gratuito)
1. Vai su https://favicon.io/favicon-generator/
2. Genera con il tuo logo/testo
3. Scarica il pacchetto
4. Estrai i file in questa cartella

### Opzione 2: Real Favicon Generator (Consigliato)
1. Vai su https://realfavicongenerator.net/
2. Carica il tuo logo (minimo 260x260px)
3. Personalizza per ogni piattaforma
4. Genera e scarica
5. Estrai tutto in questa cartella

### Opzione 3: Design Personalizzato
Usa Figma, Photoshop, o Canva:

**Favicon (32x32px):**
- Sfondo: Verde pasticceria (#16a34a)
- Icona: Simbolo dolce/chef hat
- Stile: Minimale e riconoscibile

**Apple Touch Icon (180x180px):**
- Come favicon ma più dettagliato
- Angoli arrotondati opzionali (iOS lo fa automaticamente)

**Android Chrome 192x192px:**
- Logo completo con testo
- Sfondo: Bianco o trasparente
- Padding: 10-15%

**Android Chrome 512x512px:**
- Stessa grafica del 192x192
- Alta qualità per Google Play

**OG Image (1200x630px):**
```
Layout suggerito:
+----------------------------------+
|  Immagine Dolce Background       |
|                                  |
|  Cristian's Pastry               | (Grande, Bold)
|  Dolci Artigianali               | (Sottotitolo)
|                                  |
|  [Logo]                          |
+----------------------------------+
```

## 🚀 Quick Start

Se non hai ancora icone, usa temporaneamente questi placeholder:

### 1. Crea Favicon Semplice
```bash
# Con ImageMagick (se installato)
convert -size 32x32 xc:#16a34a \
  -font Arial -pointsize 24 -fill white \
  -gravity center -annotate +0+0 'C' \
  favicon.ico
```

### 2. Usa Placeholder Online
Temporaneamente, usa:
- https://via.placeholder.com/192x192/16a34a/ffffff?text=CP per testing

## ✅ Checklist

Dopo aver creato i file, verifica:

- [ ] favicon.ico esiste e funziona
- [ ] favicon-16x16.png creato
- [ ] apple-touch-icon.png creato
- [ ] android-chrome-192x192.png creato
- [ ] android-chrome-512x512.png creato
- [ ] og-image.jpg creato (per social sharing)
- [ ] logo.png esiste
- [ ] Testa su https://realfavicongenerator.net/favicon_checker

## 🎯 Design Guidelines

### Colori Brand
- **Primary Green:** #16a34a
- **Secondary:** #86efac
- **Accent:** #fbbf24 (gold/pastry color)
- **Text:** #1f2937

### Stile
- Minimale e pulito
- Riconoscibile anche piccolo
- Professionale ma accogliente
- Tema: Pasticceria italiana

### Font Suggeriti
- **Titoli:** Playfair Display, Merriweather
- **Body:** Inter, Open Sans

## 📱 Testing

Dopo aver caricato le icone:

1. **Browser Tab**
   - Apri il sito
   - Verifica favicon nel tab

2. **Apple (iOS)**
   - Safari > Condividi > Aggiungi a Home
   - Verifica icona su schermata home

3. **Android**
   - Chrome > Menu > Aggiungi a schermata Home
   - Verifica icona

4. **Social Sharing**
   - Usa https://metatags.io/
   - Verifica og-image visualizzato

## 🆘 Supporto

Se hai problemi:
- [Real Favicon Generator](https://realfavicongenerator.net/)
- [Favicon.io](https://favicon.io/)
- [Figma](https://www.figma.com/) per design personalizzato
- [Canva](https://www.canva.com/) per template pronti

---

**Note:** I file in questa cartella sono serviti staticamente da Next.js.
Assicurati che i nomi dei file corrispondano esattamente a quelli in `layout.tsx`.
