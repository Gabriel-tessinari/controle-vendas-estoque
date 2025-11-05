import pool from "../../../../src/db";
import { Aleatorios } from "../../../../src/shared/utils/aleatorio";
import { executarTransacao } from "../../../../src/shared/utils/executarTransacao";

jest.mock("../../../../src/db");

describe("executarTransacao", () => {
  let client: any;

  beforeEach(() => {
    client = {
      query: jest.fn(),
      release: jest.fn(),
    };

    (pool.connect as jest.Mock).mockResolvedValue(client);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve executar transação com sucesso - BEGIN, callback e COMMIT", async () => {
    const mensagem = Aleatorios.getString();
    const callback = jest.fn().mockResolvedValue(mensagem);

    const resultado = await executarTransacao(callback);

    expect(pool.connect).toHaveBeenCalled();
    expect(client.query).toHaveBeenNthCalledWith(1, "BEGIN");
    expect(callback).toHaveBeenCalledWith(client);
    expect(client.query).toHaveBeenNthCalledWith(2, "COMMIT");
    expect(client.release).toHaveBeenCalled();
    expect(resultado).toBe(mensagem);
  });

  it("deve fazer ROLLBACK e lançar erro quando callback falhar", async () => {
    const mensagem = Aleatorios.getString();
    const callback = jest.fn().mockRejectedValue(new Error(mensagem));

    await expect(executarTransacao(callback)).rejects.toThrow(mensagem);

    expect(pool.connect).toHaveBeenCalled();
    expect(client.query).toHaveBeenNthCalledWith(1, "BEGIN");
    expect(callback).toHaveBeenCalledWith(client);
    expect(client.query).toHaveBeenNthCalledWith(2, "ROLLBACK");
    expect(client.release).toHaveBeenCalled();
  });
});
