import { BusinessError } from "../../../../src/shared/errors/BusinessError";
import { Aleatorios } from "../../../../src/shared/utils/aleatorio";
import { validar } from "../../../../src/shared/utils/validar";

describe("validar", () => {
  it("deve lançar BusinessError com a mensagem correta quando condição for true", () => {
    const mensagem = Aleatorios.getString();

    expect(() => {
      validar(true, mensagem);
    }).toThrow(new BusinessError(mensagem));
  });

  it("não deve lançar erro quando condição for false", () => {
    expect(() => {
      validar(false, "Não deve lançar erro");
    }).not.toThrow();
  });
});
