import { BusinessError } from "../errors/BusinessError";

export function validar(condicao: boolean, mensagem: string): void {
  if (condicao) throw new BusinessError(mensagem);
}