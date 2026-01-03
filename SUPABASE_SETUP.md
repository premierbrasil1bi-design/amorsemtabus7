# Configuração do Supabase

Siga estes passos no painel do Supabase (https://supabase.com/dashboard) para preparar seu projeto.

## 1. SQL Editor (Criação da Tabela)

Vá até a aba **SQL Editor**, cole o código abaixo e clique em **RUN**. Isso criará a tabela de eBooks com a estrutura correta para o aplicativo.

```sql
-- Cria a tabela de eBooks
CREATE TABLE ebooks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  price TEXT NOT NULL,
  description TEXT,
  excerpt TEXT,
  cover TEXT,
  slug TEXT UNIQUE NOT NULL,
  buy_link TEXT,
  target_audience TEXT,
  editorial_review JSONB DEFAULT '{"stars": 5, "text": ""}',
  testimonials JSONB DEFAULT '[]'
);

-- Habilita Row Level Security (Segurança)
ALTER TABLE ebooks ENABLE ROW LEVEL SECURITY;

-- Política 1: Todos podem LER (Público)
CREATE POLICY "Leitura pública" 
ON ebooks FOR SELECT 
TO anon, authenticated 
USING (true);

-- Política 2: Apenas Admin logado pode INSERIR, EDITAR e DELETAR
CREATE POLICY "Admin total" 
ON ebooks FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);
```

## 2. Storage (Imagens de Capa)

Para permitir o upload de imagens:

1. Vá até a aba **Storage**.
2. Clique em **New Bucket**.
3. Nomeie o bucket como: `covers`.
4. Deixe a opção **Public bucket** ATIVADA.
5. Salve.
6. Vá na aba **Policies** do Storage e adicione uma política para o bucket `covers`:
   - Permita SELECT para todos (anon e authenticated).
   - Permita INSERT/UPDATE/DELETE apenas para `authenticated`.

## 3. Variáveis de Ambiente

No seu projeto local, abra o arquivo `.env` e preencha com as chaves que estão em **Project Settings > API**:

```env
VITE_SUPABASE_URL=sua_url_do_projeto
VITE_SUPABASE_ANON_KEY=sua_chave_anon_public
```
