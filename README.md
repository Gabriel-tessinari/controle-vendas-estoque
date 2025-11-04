# Loja

Projeto Node.js + Express + TypeScript para gestão de caixa e estoque.

## Requisitos

- Node.js 18+
- PostgreSQL

## Instalação

```bash
npm install
```

## Rodando em desenvolvimento

```bash
npm run dev
```

## Compilando para produção

```bash
npm run build
```

## Rodando em produção

```bash
npm start
```

## Endpoints disponíveis

- `GET /catalogo` → Retorna o catálogo de produtos e conjuntos
- `GET /categorias` → Retorna lista de categorias
- `POST /compras` → Salva uma compra com seus itens
- `POST /conjuntos` → Salva um conjunto com seus itens
- `POST /produtos/lote` → Salva lista de produtos com suas variações
