import { calcularVencimento } from "../../../../src/shared/utils/data";

describe("calcularVencimento", () => {
  it("deve calcular parcela para o próximo mês", () => {
    const dataCompra = "2025-01-15";
    const numeroParcela = 1;

    const resultado = calcularVencimento(dataCompra, numeroParcela);

    expect(resultado).toBe("2025-02-15");
  });

  it("deve calcular parcela no próximo ano", () => {
    const dataCompra = "2025-01-15";
    const numeroParcela = 12;

    const resultado = calcularVencimento(dataCompra, numeroParcela);

    expect(resultado).toBe("2026-01-15");
  });

  it("deve ajustar 31 de janeiro para 29 de fevereiro em ano bissexto", () => {
    const dataCompra = "2024-01-31";
    const numeroParcela = 1;

    const resultado = calcularVencimento(dataCompra, numeroParcela);

    expect(resultado).toBe("2024-02-29");
  });

  it("deve ajustar 31 de janeiro para 28 de fevereiro em ano não bissexto", () => {
    const dataCompra = "2025-01-31";
    const numeroParcela = 1;

    const resultado = calcularVencimento(dataCompra, numeroParcela);

    expect(resultado).toBe("2025-02-28");
  });
});
