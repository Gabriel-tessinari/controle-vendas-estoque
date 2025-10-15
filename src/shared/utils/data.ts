export function calcularVencimento(dataCompra: string, numeroParcela: number): string {
  const [ano, mes, dia] = dataCompra.split('-').map(Number);
  const vencimento = new Date(ano, mes - 1 + numeroParcela, dia);

  if (vencimento.getDate() < dia) {
    vencimento.setDate(0);
  }

  return `${vencimento.getFullYear()}-${String(vencimento.getMonth() + 1).padStart(2, '0')}-${String(vencimento.getDate()).padStart(2, '0')}`;
}