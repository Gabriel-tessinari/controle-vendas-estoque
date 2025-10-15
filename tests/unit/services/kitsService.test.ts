import { KitsService } from "../../../src/services/kitsService";
import * as produtosRepo from "../../../src/produtos/repositories/produtosRepository";
import * as kitsRepo from "../../../src/repositories/kitsRepository";
import { BusinessError } from "../../../src/shared/errors/BusinessError";
import { KitInput } from "../../../src/models/Kit";

jest.mock("../../../src/produtos/repositories/produtosRepository");
jest.mock("../../../src/repositories/kitsRepository");

describe("KitsService", () => {
  const kitInput: KitInput = {
    nome: "Kit Teste",
    descricao: "Um kit válido",
    precoVenda: 200,
    itens: [
      { produtoId: 1, quantidade: 2 },
      { produtoId: 2, quantidade: 1 }
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("postKit", () => {
    it("deve lançar BusinessError se algum produto não existir", async () => {
      (produtosRepo.produtoExiste as jest.Mock)
        .mockResolvedValueOnce(true)
        .mockResolvedValueOnce(false);

      await expect(KitsService.postKit(kitInput))
        .rejects
        .toThrow(new BusinessError("Produto com id 2 não existe."));

      expect(produtosRepo.produtoExiste).toHaveBeenCalledTimes(2);
      expect(kitsRepo.insertKitComItens).not.toHaveBeenCalled();
    });

    it("deve chamar insertKitComItens se todos os produtos existirem", async () => {
      (produtosRepo.produtoExiste as jest.Mock).mockResolvedValue(true);
      (kitsRepo.insertKitComItens as jest.Mock).mockResolvedValue(18);

      const result = await KitsService.postKit(kitInput);

      expect(produtosRepo.produtoExiste).toHaveBeenCalledTimes(2);
      expect(kitsRepo.insertKitComItens).toHaveBeenCalledWith(kitInput);
      expect(result).toBe(18);
    });
  });
});
