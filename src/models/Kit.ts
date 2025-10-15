export interface Kit {
  id: number;
  nome: string;
  descricao?: string;
  precoCompra: number;
  precoVenda: number;
  ativo: boolean;
  itens: KitItem[];
}

export interface KitItem {
  id: number;
  produtoId: number;
  produtoNome: string;
  quantidade: number;
}

export interface KitInput {
  nome: string;
  descricao?: string;
  precoVenda: number;
  itens: KitItemInput[];
}

export interface KitItemInput {
  produtoId: number;
  quantidade: number;
}