import { Evento } from "../model/Evento";

export interface IEventoRepository {
  listar(): void;
  cadastrar(evento: Evento): void;
  atualizar(evento: Evento): void;
  deletar(id: number): void;
  buscarPorId(id: number): void;
}
