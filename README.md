# Loja

Projeto Node.js + Express + TypeScript para gestão de categorias e outros recursos.

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

- `GET /categorias` → Retorna lista de categorias
- `POST /produtos` → Salva um produto com uma lista de variações
- `POST /kits` → Salva um kit com uma lista de itens
