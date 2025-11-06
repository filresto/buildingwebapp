# 🚀 Admin Dashboard - Guida Rapida

## ✅ Implementazione Completata!

L'admin dashboard è stato implementato con successo. Ecco cosa è stato fatto:

### 📦 Componenti Creati

- **Login Admin** (`/admin/login`) - Autenticazione con Supabase
- **Dashboard** (`/admin/dashboard`) - Lista progetti con azioni CRUD
- **Form Progetti** (`/admin/projects/new` e `/admin/projects/:id/edit`) - Crea e modifica progetti
- **Upload Immagini** - Upload diretto su Supabase Storage
- **Gallery Dinamica** - Aggiungi/rimuovi immagini multiple
- **Specs Dinamiche** - Aggiungi/rimuovi specifiche tecniche

### 🔐 Sistema di Autenticazione

- Row Level Security (RLS) configurato
- Verifica automatica dei permessi admin
- Protezione delle route admin
- Sessioni persistenti

## 📋 Prossimi Passi

### 1. Setup Supabase

Segui la guida completa nel file `SUPABASE_SETUP_GUIDE.md` che include:

- Creazione progetto Supabase
- Creazione tabelle (`projects`, `admins`)
- Configurazione Storage bucket
- Policy di sicurezza (RLS)
- Creazione utente admin

### 2. Configurare le Variabili d'Ambiente

Crea un file `.env.local` nella root del progetto:

```env
VITE_SUPABASE_URL=https://tuo-progetto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**IMPORTANTE**: Sostituisci i valori con quelli reali del tuo progetto Supabase.
Trovi questi valori in: **Supabase Dashboard → Settings → API**

### 3. Avviare l'Applicazione

```bash
npm install  # Le dipendenze sono già installate
npm run dev
```

### 4. Accedere al Pannello Admin

1. Vai su `http://localhost:5173/admin/login`
2. Inserisci le credenziali dell'utente admin creato su Supabase
3. Avrai accesso al pannello di amministrazione

## 🎯 Funzionalità Admin

### Dashboard (`/admin/dashboard`)

- Visualizza tutti i progetti
- Crea nuovo progetto
- Modifica progetto esistente
- Elimina progetto (con conferma)
- Logout

### Crea/Modifica Progetto

**Campi disponibili:**
- Titolo (obbligatorio)
- Sottotitolo (obbligatorio)
- Descrizione (obbligatoria)
- Immagine principale (upload su Supabase Storage)
- Gallery immagini (upload multiplo)
- Specifiche tecniche (lista dinamica)

**Features:**
- Preview immagini in tempo reale
- Rimuovi immagini con un click
- Aggiungi/rimuovi specs dinamicamente
- Validazione form lato client
- Gestione errori upload
- Salvataggio su database Supabase

## 🔒 Sicurezza

### Row Level Security (RLS)

Le tabelle sono protette con RLS:

- **projects**: 
  - SELECT: pubblico (tutti possono vedere)
  - INSERT/UPDATE/DELETE: solo admin autenticati
  
- **admins**: 
  - SELECT: solo utenti autenticati

### Storage

Il bucket `project-images` è configurato con:

- Lettura pubblica (per visualizzare le immagini sul sito)
- Upload/Delete: solo admin autenticati

### Protezione Route

Tutte le route admin sono protette da `AdminRoute`:
- Verifica autenticazione
- Verifica permessi admin (email in tabella `admins`)
- Redirect automatico a login se non autorizzato

## 📁 Struttura File

```
src/
├── lib/
│   └── supabase.js              # Client Supabase + helper functions
├── utils/
│   └── adminGuard.js            # Hook e componente per protezione route
├── components/
│   └── admin/
│       ├── ImageUpload.jsx      # Upload singola immagine
│       ├── GalleryUpload.jsx    # Upload multiplo immagini
│       └── DynamicList.jsx      # Liste dinamiche (specs)
├── pages/
│   ├── admin/
│   │   ├── Login.jsx            # Pagina login
│   │   ├── Dashboard.jsx        # Dashboard admin
│   │   └── ProjectForm.jsx      # Form crea/modifica
│   ├── Projects.jsx             # ✅ Aggiornato per usare Supabase
│   └── ProjectDetail.jsx        # ✅ Aggiornato per usare Supabase
├── styles/
│   └── admin.css                # Stili per area admin
└── App.jsx                      # ✅ Route admin aggiunte
```

## 🎨 Pagine Pubbliche

Le pagine pubbliche (`Projects.jsx`, `ProjectDetail.jsx`) sono state aggiornate per:
- Fetchare dati da Supabase invece di array hardcoded
- Gestire stati di loading
- Gestire errori
- Supportare il nuovo schema dati

## 🐛 Troubleshooting

### "Mancano le variabili d'ambiente Supabase"
→ Crea il file `.env.local` con le credenziali corrette

### "Credenziali non valide o permessi insufficienti"
→ Verifica che:
1. L'utente esista in Supabase Auth
2. La sua email sia presente nella tabella `admins`

### "Errore upload immagine"
→ Verifica che:
1. Il bucket `project-images` esista
2. Le policy di storage siano configurate correttamente
3. Il file sia un'immagine valida (< 5MB)

### I progetti non si caricano
→ Verifica che:
1. Le tabelle siano create correttamente
2. Le policy RLS permettano SELECT pubblico
3. Le variabili d'ambiente siano corrette

## 📝 Note Tecniche

- **Database**: PostgreSQL (tramite Supabase)
- **Storage**: Supabase Storage
- **Auth**: Supabase Auth (Email/Password)
- **Sicurezza**: Row Level Security (RLS)
- **Frontend**: React + Vite
- **Routing**: React Router v6
- **Animazioni**: Framer Motion (solo pagine pubbliche)

## 🔄 Migrazione Dati

Lo script SQL in `SUPABASE_SETUP_GUIDE.md` include già l'inserimento dei 3 progetti esistenti.
Dopo aver eseguito lo script, i progetti saranno disponibili sia nel sito pubblico che nel pannello admin.

## 🎉 Fatto!

Il sistema è completo e pronto all'uso. Una volta configurato Supabase e create le variabili d'ambiente, potrai:

1. ✅ Gestire progetti dal pannello admin
2. ✅ Caricare immagini su Supabase Storage
3. ✅ Aggiungere/modificare/eliminare progetti
4. ✅ Gestire dinamicamente specs e gallery
5. ✅ Visualizzare automaticamente le modifiche sul sito

## 📞 Supporto

Se hai domande o problemi:
1. Controlla `SUPABASE_SETUP_GUIDE.md` per il setup Supabase
2. Verifica la console browser per errori JavaScript
3. Controlla i log Supabase per errori di database/storage

Buon lavoro! 🚀

