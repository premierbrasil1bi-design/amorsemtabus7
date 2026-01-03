-- 1. Resetar políticas para garantir limpeza (Opcional, mas recomendado)
DROP POLICY IF EXISTS "Leitura pública" ON ebooks;
DROP POLICY IF EXISTS "Admin total" ON ebooks;
ALTER TABLE ebooks ENABLE ROW LEVEL SECURITY;

-- 2. Política de Leitura: TODO MUNDO (anônimo ou logado) pode ver os livros
CREATE POLICY "Public Read Access" 
ON ebooks FOR SELECT 
TO anon, authenticated 
USING (true);

-- 3. Política de Escrita: APENAS USUÁRIOS AUTENTICADOS (Admin) podem Criar/Editar/Deletar
CREATE POLICY "Admin Write Access" 
ON ebooks FOR INSERT 
TO authenticated 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin Update Access" 
ON ebooks FOR UPDATE 
TO authenticated 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin Delete Access" 
ON ebooks FOR DELETE 
TO authenticated 
USING (auth.role() = 'authenticated');

-- 4. Segurança do Storage (Capas)
-- (Certifique-se que o bucket 'covers' existe e é Público)
-- Se não conseguir rodar isso via SQL, configure na UI do Storage:
-- "SELECT" para Public
-- "INSERT/UPDATE/DELETE" para Authenticated
