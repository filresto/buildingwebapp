# Guida Setup Supabase - Admin Dashboard

## Passo 1: Creare il Progetto

1. Vai su https://supabase.com e fai login (o crea un account gratuito)
2. Clicca "New Project"
3. Compila i campi:
   - Nome progetto: `bianca-webapp` (o quello che preferisci)
   - Database Password: scegli una password sicura (salvala!)
   - Region: scegli Europe (Frankfurt o London per l'Italia)
4. Clicca "Create new project" e aspetta ~2 minuti

## Passo 2: Salvare le Credenziali

1. Una volta creato il progetto, vai su **Settings** → **API**
2. Troverai:
   - **Project URL**: inizia con `https://xxxxx.supabase.co`
   - **anon/public key**: una lunga stringa che inizia con `eyJ...`
3. **IMPORTANTE**: Copia questi valori e salvali temporaneamente in un file `.env.local` nella root del progetto:

```env
VITE_SUPABASE_URL=https://tuo-progetto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Passo 3: Creare le Tabelle

1. Nel pannello Supabase, vai su **SQL Editor** nel menu laterale
2. Clicca "New query"
3. Copia e incolla questo script SQL completo:

```sql
-- Tabella progetti
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  specs JSONB DEFAULT '[]'::jsonb,
  main_image TEXT,
  gallery_images JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabella admin
CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Abilita Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Policy per projects: lettura pubblica
CREATE POLICY "Projects sono visibili a tutti"
  ON projects
  FOR SELECT
  USING (true);

-- Policy per projects: solo admin possono inserire
CREATE POLICY "Solo admin possono inserire progetti"
  ON projects
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admins 
      WHERE admins.email = auth.jwt()->>'email'
    )
  );

-- Policy per projects: solo admin possono aggiornare
CREATE POLICY "Solo admin possono aggiornare progetti"
  ON projects
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admins 
      WHERE admins.email = auth.jwt()->>'email'
    )
  );

-- Policy per projects: solo admin possono eliminare
CREATE POLICY "Solo admin possono eliminare progetti"
  ON projects
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM admins 
      WHERE admins.email = auth.jwt()->>'email'
    )
  );

-- Policy per admins: solo utenti autenticati possono leggere
CREATE POLICY "Utenti autenticati possono vedere admins"
  ON admins
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Inserisci la tua email admin (MODIFICA CON LA TUA EMAIL!)
INSERT INTO admins (email) VALUES ('tua-email@example.com');

-- Inserisci i progetti esistenti
INSERT INTO projects (title, subtitle, description, specs, gallery_images) VALUES
(
  'Progetto Residenziale',
  'Complesso residenziale moderno',
  'Un complesso residenziale all''avanguardia che combina design contemporaneo e sostenibilità ambientale.

Il progetto si sviluppa su 5 piani fuori terra, con particolare attenzione all''efficienza energetica e al comfort abitativo. Ogni unità è stata progettata per massimizzare l''illuminazione naturale e garantire la privacy dei residenti.

Le strutture sono state realizzate con materiali di alta qualità, rispettando le più moderne normative antisismiche. Gli spazi comuni includono aree verdi, parcheggi sotterranei e zone dedicate al fitness e al relax.',
  '["Superficie: 3.500 mq", "Anno: 2023", "Ubicazione: Milano", "Classe energetica: A+"]'::jsonb,
  '["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000"]'::jsonb
),
(
  'Edificio Commerciale',
  'Centro commerciale e uffici',
  'Edificio polifunzionale che ospita spazi commerciali al piano terra e uffici ai piani superiori.

La struttura è stata progettata per offrire massima flessibilità d''uso, con ampie vetrate che garantiscono luminosità e visibilità. Il sistema di climatizzazione è stato ottimizzato per ridurre i consumi energetici.

Gli spazi commerciali sono dotati di tutti i comfort moderni, mentre le aree uffici offrono ambienti di lavoro innovativi e funzionali. Il parcheggio multipiano può ospitare oltre 200 veicoli.',
  '["Superficie: 8.000 mq", "Anno: 2022", "Ubicazione: Roma", "Piani: 7"]'::jsonb,
  '["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000", "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000", "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1000", "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000"]'::jsonb
),
(
  'Ristrutturazione Edificio Storico',
  'Restauro conservativo',
  'Intervento di restauro conservativo su edificio storico del centro città, con particolare attenzione alla preservazione degli elementi architettonici originali.

Il progetto ha richiesto un''attenta analisi strutturale per garantire la sicurezza statica dell''edificio, mantenendo inalterato il suo valore storico e artistico. Sono state utilizzate tecniche innovative di consolidamento.

Gli interni sono stati completamente rinnovati con impianti moderni, rispettando le linee guida della Soprintendenza. Il risultato è un perfetto equilibrio tra antico e moderno, funzionalità e bellezza architettonica.',
  '["Superficie: 1.200 mq", "Anno: 2024", "Ubicazione: Firenze", "Epoca: XIX secolo"]'::jsonb,
  '["https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=1000", "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1000", "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1000", "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1000"]'::jsonb
);
```

4. **IMPORTANTE**: Prima di eseguire, sostituisci `'tua-email@example.com'` con la tua email vera!
5. Clicca "Run" per eseguire lo script
6. Dovresti vedere "Success. No rows returned" - è normale!

## Passo 4: Configurare Storage

1. Nel pannello Supabase, vai su **Storage** nel menu laterale
2. Clicca "Create a new bucket"
3. Compila:
   - Name: `project-images`
   - Public bucket: **✓ ATTIVA** (importante!)
4. Clicca "Create bucket"

### Configurare le Policy di Storage

1. Clicca sul bucket `project-images` appena creato
2. Vai su "Policies" (in alto)
3. Clicca "New Policy" sotto "Other policies"
4. Scegli "For full customization"

**Policy 1: Lettura pubblica**
```sql
CREATE POLICY "Tutti possono vedere le immagini"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'project-images');
```

5. Clicca "New Policy" di nuovo per la seconda policy

**Policy 2: Upload per admin**
```sql
CREATE POLICY "Solo admin possono caricare immagini"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'project-images' 
  AND EXISTS (
    SELECT 1 FROM admins 
    WHERE admins.email = auth.jwt()->>'email'
  )
);
```

6. Clicca "New Policy" di nuovo per la terza policy

**Policy 3: Delete per admin**
```sql
CREATE POLICY "Solo admin possono eliminare immagini"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'project-images' 
  AND EXISTS (
    SELECT 1 FROM admins 
    WHERE admins.email = auth.jwt()->>'email'
  )
);
```

## Passo 5: Configurare Authentication

1. Nel pannello Supabase, vai su **Authentication** → **Providers**
2. Assicurati che "Email" sia abilitato (dovrebbe esserlo di default)
3. Vai su **Authentication** → **Users**
4. Clicca "Add user" → "Create new user"
5. Inserisci:
   - Email: **LA STESSA EMAIL** che hai inserito nella tabella `admins`
   - Password: una password sicura (salvala!)
   - Auto Confirm User: **✓ ATTIVA**
6. Clicca "Create user"

## Passo 6: Verificare il Setup

1. Vai su **Table Editor** nel menu laterale
2. Verifica che esistano le tabelle:
   - `projects` con 3 progetti
   - `admins` con la tua email
3. Vai su **Storage** e verifica il bucket `project-images`
4. Vai su **Authentication** → **Users** e verifica l'utente creato

## Passo 7: Aggiungere il file .env.local

Nel progetto, crea (se non esiste già) il file `.env.local` nella root:

```env
VITE_SUPABASE_URL=https://tuo-progetto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**IMPORTANTE**: 
- Sostituisci con i tuoi valori reali da Settings → API
- NON committare questo file su git (è già nel .gitignore)

## Completato! ✓

Ora puoi procedere con l'implementazione del codice. Il backend Supabase è pronto!

## Troubleshooting

### Se le policy non funzionano:
- Verifica che RLS sia abilitato per entrambe le tabelle
- Controlla che l'email dell'utente autenticato corrisponda a quella in `admins`
- Vai su SQL Editor ed esegui: `SELECT * FROM admins;` per vedere le email

### Se l'upload non funziona:
- Verifica che il bucket sia pubblico
- Controlla che le policy di storage siano state create correttamente
- Verifica di essere autenticato come admin

### Per testare le policy manualmente:
```sql
-- Verifica che l'utente sia admin
SELECT EXISTS (
  SELECT 1 FROM admins 
  WHERE email = 'tua-email@example.com'
);
-- Dovrebbe restituire: true
```

