-- ========================================
-- Script de criação inicial do Banco de Dados
-- Projeto: Loja Sandryelle
-- Banco: PostgreSQL
-- ========================================

-- ===================================================
-- Tabela: categorias
-- Descrição: Armazena as categorias de produtos
-- ===================================================
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE
);

-- Inserts iniciais em categorias
INSERT INTO categorias (nome) VALUES 
('FITNESS'),
('SEX SHOP'),
('LINGERIE');

-- ===================================================
-- Tabela: produtos
-- Descrição: Armazena os produtos da loja
-- ===================================================
CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    categoria_id INT REFERENCES categorias(id) ON DELETE SET NULL
);

-- ===================================================
-- Tabela: produtos_variacoes
-- Descrição: Variações de um produto (ex: cor, tamanho, volume)
-- ===================================================
CREATE TABLE produtos_variacoes (
    id SERIAL PRIMARY KEY,
    produto_id INT NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
    descricao VARCHAR(150),                   -- ex: "Azul M", "320ml"
    preco_compra DECIMAL(10,2) NOT NULL,
    preco_venda DECIMAL(10,2) NOT NULL,
    estoque INT NOT NULL DEFAULT 0
);

-- ===================================================
-- Tabela: movimentacoes_estoque
-- Descrição: Registra entradas, saídas e ajustes no estoque
-- ===================================================
CREATE TABLE movimentacoes_estoque (
    id SERIAL PRIMARY KEY,
    produto_id INT NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
    tipo VARCHAR(20) NOT NULL,              -- ENTRADA | SAIDA | AJUSTE
    quantidade INT NOT NULL,
    origem VARCHAR(50),                     -- COMPRA, VENDA, AJUSTE_MANUAL
    referencia_id INT,                      -- id da compra/venda/ajuste
    observacao TEXT,
    data TIMESTAMP DEFAULT NOW()
);

-- ===================================================
-- Tabela: fornecedores
-- Descrição: Tabela de fornecedores
-- ===================================================
CREATE TABLE fornecedores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL
);

-- ===================================================
-- Tabela: compras
-- Descrição: Registra as compras feitas a fornecedores
-- ===================================================
CREATE TABLE compras (
    id SERIAL PRIMARY KEY,
    fornecedor_id INT NOT NULL,
    data_compra TIMESTAMP DEFAULT NOW(),
    frete DECIMAL(10,2) DEFAULT 0,
    outras_taxas DECIMAL(10,2) DEFAULT 0,
    status_pagamento VARCHAR(20) DEFAULT 'ABERTO',  -- ABERTO | PAGO_PARCIAL | PAGO_TOTAL
    CONSTRAINT compras_fornecedor_id_fkey FOREIGN KEY (fornecedor_id)
        REFERENCES fornecedores(id) ON DELETE RESTRICT
);

-- ===================================================
-- Tabela: compras_itens
-- Descrição: Registra os produtos (variações) de cada compra
-- ===================================================
CREATE TABLE compras_itens (
    id SERIAL PRIMARY KEY,
    compra_id INT NOT NULL,
    produto_variacao_id INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    CONSTRAINT compras_itens_compra_id_fkey FOREIGN KEY (compra_id)
        REFERENCES compras(id) ON DELETE CASCADE,
    CONSTRAINT compras_itens_produto_variacao_id_fkey FOREIGN KEY (produto_variacao_id)
        REFERENCES produtos_variacoes(id) ON DELETE RESTRICT
);

-- ===================================================
-- Tabela: compras_pagamentos
-- Descrição: Registra pagamentos de compras (parcelas ou à vista)
-- ===================================================
CREATE TABLE compras_pagamentos (
    id SERIAL PRIMARY KEY,
    compra_id INT NOT NULL,
    data_pagamento DATE NOT NULL,
    valor_pago DECIMAL(10,2) NOT NULL,
    forma_pagamento VARCHAR(50) NOT NULL,           -- Ex.: PIX | CREDITO | DEBITO | DINHEIRO
    status_parcela VARCHAR(20) DEFAULT 'NAO_PAGO',  -- NAO_PAGO | PAGO
    observacao TEXT,
    CONSTRAINT compras_pagamentos_compra_id_fkey FOREIGN KEY (compra_id)
        REFERENCES compras(id) ON DELETE CASCADE
);

-- ===================================================
-- Tabela: clientes
-- Descrição: Tabela de clientes
-- ===================================================
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,       -- Nome obrigatório
    observacao TEXT                   -- Diferencia nomes iguais (opcional)
);

-- ===================================================
-- Tabela: vendas
-- Descrição: Registra cada venda realizada
-- ===================================================
CREATE TABLE vendas (
    id SERIAL PRIMARY KEY,
    cliente_id INT REFERENCES clientes(id) ON DELETE SET NULL,  -- venda sem cliente é permitida
    data_venda TIMESTAMP DEFAULT NOW(),
    frete DECIMAL(10,2) DEFAULT 0,
    outras_taxas DECIMAL(10,2) DEFAULT 0,
    status_pagamento VARCHAR(20) DEFAULT 'ABERTO'  -- ABERTO | PAGO_PARCIAL | PAGO_TOTAL
);

-- ===================================================
-- Tabela: vendas_itens
-- Descrição: Registra os produtos de cada venda
-- ===================================================
CREATE TABLE vendas_itens (
    id SERIAL PRIMARY KEY,
    venda_id INT NOT NULL REFERENCES vendas(id) ON DELETE CASCADE,
    produto_id INT NOT NULL REFERENCES produtos(id) ON DELETE RESTRICT,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL
);

-- ===================================================
-- Tabela: vendas_pagamentos
-- Descrição: Registra pagamentos de vendas (parcelas ou à vista)
-- ===================================================
CREATE TABLE vendas_pagamentos (
    id SERIAL PRIMARY KEY,
    venda_id INT NOT NULL REFERENCES vendas(id) ON DELETE CASCADE,
    data_pagamento DATE NOT NULL,
    valor_pago DECIMAL(10,2) NOT NULL,
    forma_pagamento VARCHAR(50) NOT NULL,           -- Ex.: Pix, Cartão Crédito, Dinheiro
    status_parcela VARCHAR(20) DEFAULT 'NAO_PAGO',  -- NAO_PAGO | PAGO
    observacao TEXT
);

-- ===================================================
-- Tabela: kits
-- Descrição: Representa um conjunto de produtos
-- ===================================================
CREATE TABLE kits (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  preco_compra NUMERIC(10,2) NOT NULL DEFAULT 0,
  preco_venda NUMERIC(10,2) NOT NULL,
  ativo BOOLEAN DEFAULT true
);

-- ===================================================
-- Tabela: kits_itens
-- Descrição: Produtos (com variação) que compõem um kit
-- ===================================================
CREATE TABLE kits_itens (
  id SERIAL PRIMARY KEY,
  kit_id INT NOT NULL REFERENCES kits(id) ON DELETE CASCADE,
  produto_id INT NOT NULL REFERENCES produtos(id),
  quantidade INT NOT NULL
);

-- ===================================================
-- Ajuste FK: produtos.categoria_id
-- ===================================================
ALTER TABLE produtos
DROP CONSTRAINT IF EXISTS produtos_categoria_id_fkey,
ADD CONSTRAINT produtos_categoria_id_fkey
FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE RESTRICT;

-- ===================================================
-- Ajuste FK: movimentacoes_estoque.produto_id
-- ===================================================
ALTER TABLE movimentacoes_estoque
DROP CONSTRAINT IF EXISTS movimentacoes_estoque_produto_id_fkey,
ADD CONSTRAINT movimentacoes_estoque_produto_id_fkey
FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE;

-- ========================================
-- Ajuste FK: movimentacoes_estoque.produto_id
-- Agora referencia produtos_variacoes
-- ========================================
ALTER TABLE movimentacoes_estoque
DROP CONSTRAINT IF EXISTS movimentacoes_estoque_produto_id_fkey,
ADD CONSTRAINT movimentacoes_estoque_produto_variacao_id_fkey
FOREIGN KEY (produto_id) REFERENCES produtos_variacoes(id) ON DELETE CASCADE;

-- Renomeia coluna para refletir a nova relação
ALTER TABLE movimentacoes_estoque
RENAME COLUMN produto_id TO produto_variacao_id;

-- ========================================
-- Ajuste FK: vendas_itens.produto_id
-- Agora referencia produtos_variacoes
-- ========================================
ALTER TABLE vendas_itens
DROP CONSTRAINT IF EXISTS vendas_itens_produto_id_fkey,
ADD CONSTRAINT vendas_itens_produto_variacao_id_fkey
FOREIGN KEY (produto_id) REFERENCES produtos_variacoes(id) ON DELETE RESTRICT;

-- Renomeia coluna para refletir a nova relação
ALTER TABLE vendas_itens
RENAME COLUMN produto_id TO produto_variacao_id;

-- ===================================================
-- Ajuste tabela produtos para suportar produtos “partidos”
-- Cria relação de produto pai ↔ produto filho
-- ===================================================
ALTER TABLE produtos
ADD COLUMN produto_pai_id INT NULL,
ADD CONSTRAINT produtos_produto_pai_id_fkey
FOREIGN KEY (produto_pai_id) REFERENCES produtos(id) ON DELETE SET NULL;

-- ===================================================
-- Limpeza: remover coluna produto_pai_id se existir
-- ===================================================
ALTER TABLE produtos
DROP COLUMN IF EXISTS produto_pai_id;