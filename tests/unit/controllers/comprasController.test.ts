import * as controller from "../../../src/controllers/comprasController";
import { BusinessError } from "../../../src/shared/errors/BusinessError";
import { ComprasService } from "../../../src/services/comprasService";
import * as compraMapper from "../../../src/mappers/compraMapper";

jest.mock("../../../src/mappers/compraMapper");
jest.mock("../../../src/services/comprasService");

describe("comprasController", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = {
      body: {
        fornecedorId: 1,
        data: '2025-02-18',
        frete: 0,
        outrasTaxas: 0,
        itens: [
          {
            produtoVariacaoId: 18,
            quantidade: 2,
            precoUnitario: 10
          }
        ],
        formaPagamento: 'PIX',
        valorPago: 0,
        quantidadeParcelas: 1
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    (compraMapper.mapRequestToCompraInput as jest.Mock).mockReturnValue({
      fornecedorId: req.body.fornecedorId,
      dataCompra: req.body.data,
      frete: req.body.frete,
      outrasTaxas: req.body.outrasTaxas,
      pagamentos: [],
      itens: [
        {
          produtoVariacaoId: req.body.itens[0].produtoVariacaoId,
          quantidade: req.body.itens[0].quantidade,
          precoUnitario: req.body.itens[0].precoUnitario
        }
      ]
    });
  });

  describe("postCompraComItensEPagamentos", () => {
    it("deve retornar 201 ao criar compra", async () => {
      (ComprasService.postCompra as jest.Mock).mockResolvedValue(18);

      await controller.postCompraComItensEPagamentos(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Compra criada com sucesso (id: 18)",
        compraId: 18
      });
    });

    it("deve retornar 400 em caso de BusinessError", async () => {
      (ComprasService.postCompra as jest.Mock).mockRejectedValue(new BusinessError("Compra inválida"));

      await controller.postCompraComItensEPagamentos(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Compra inválida" });
    });

    it("deve retornar 500 em caso de erro", async () => {
      (ComprasService.postCompra as jest.Mock).mockRejectedValue(new Error("Erro genérico"));

      await controller.postCompraComItensEPagamentos(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro ao criar compra" });
    });
  });
});
