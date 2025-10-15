import { Request, Response } from "express";
import { KitsService } from "../services/kitsService";
import { mapRequestToKitInput } from "../mappers/kitMapper";
import { BusinessError } from "../shared/errors/BusinessError";
import { KitInput } from "../models/Kit";

export async function postKitComItens(req: Request, res: Response): Promise<void> {
  try {
    const kitInput: KitInput = mapRequestToKitInput(req.body);

    const kitId: number = await KitsService.postKit(kitInput);

    res.status(201).json({
      message: `Kit criado com sucesso (id: ${kitId})`,
      kitId
    });
  } catch (err) {
    if (err instanceof BusinessError) {
      res.status(400).json({ error: err.message });
    } else {
      console.error("Erro ao criar kit:", err);
      res.status(500).json({ error: "Erro ao criar kit" });
    }
  }
}
