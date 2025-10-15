import { KitInput } from "../models/Kit";
import * as produtosRepo from "../produtos/repositories/produtosRepository";
import * as kitsRepo from "../repositories/kitsRepository";
import { BusinessError } from "../shared/errors/BusinessError";

export class KitsService {
  static async postKit(kit: KitInput) {
    for (const item of kit.itens) {
      const produtoExiste: boolean = await produtosRepo.produtoExiste(item.produtoId);
      if (!produtoExiste) {
        throw new BusinessError(`Produto com id ${item.produtoId} não existe.`);
      }
    }

    return await kitsRepo.insertKitComItens(kit);
  }
}
