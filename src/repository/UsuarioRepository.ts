import { Evento } from "../model/Evento";
import { Usuario } from "../model/Usuario";

export interface IUsuarioRepository {
  listar(): void;
  cadastrar(usuario: Usuario): void;
  atualizar(usuario: Usuario): void;
  deletar(id: number): void;
  buscarPorId(id: number): void;

  participarEvento(idUsuario: number, evento: Evento): void;
  consultarParticipacao(idUsuario: number): void;
  cancelarParticipacao(idUsuario: number, evento: Evento): void;
}
