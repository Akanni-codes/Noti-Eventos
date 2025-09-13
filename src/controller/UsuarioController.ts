import { Evento } from "../model/Evento";
import { Usuario } from "../model/Usuario";
import { IUsuarioRepository } from "../repository/UsuarioRepository";
import { colors } from "../util/Colors";
import { falha, sucesso } from "../util/Mensagens";

export class UsuarioController implements IUsuarioRepository {
  private participacoes: Array<Evento> = new Array<Evento>();
  private usuarios: Array<Usuario> = new Array<Usuario>();
  Id: number = 0;
  cadastrar(usuario: Usuario): void {
    this.usuarios.push(usuario);
    console.log(
      colors.fg.green,
      "Usuário cadastrado com sucesso!",
      colors.reset
    );
  }
  atualizar(usuario: Usuario): void {
    let buscaUser = this.buscarUsuarioNaLista(usuario.id);
    if (buscaUser != null) {
      this.usuarios[this.usuarios.indexOf(buscaUser)] = usuario;
      console.log(
        colors.fg.green,
        "Usuário atualizado com sucesso!",
        colors.reset
      );
    } else {
      console.log(colors.fg.red, "Usuário não encontrado!", colors.reset);
    }
  }
  deletar(id: number): void {
    let buscaUser = this.buscarUsuarioNaLista(id);
    if (buscaUser != null) {
      this.usuarios.splice(this.usuarios.indexOf(buscaUser), 1);
      console.log(
        colors.fg.green,
        "Usuário deletado com sucesso!",
        colors.reset
      );
    } else {
      console.log(colors.fg.red, "Usuário não encontrado!", colors.reset);
    }
  }
  buscarPorId(id: number): void {
    let buscaUser = this.buscarUsuarioNaLista(id);
    if (buscaUser != null) {
      buscaUser.visualizar();
    } else {
      console.log(colors.fg.red, "Usuário não encontrado!", colors.reset);
    }
  }
  participarEvento(idUsuario: number, evento: Evento): void {
    let buscaUser = this.buscarUsuarioNaLista(idUsuario);
    if (buscaUser != null && evento != null) {
      this.participacoes.push(evento);
      evento.listaPresnca.push(buscaUser); 
    } 
  }
  consultarParticipacao(idUsuario: number): void {
    let buscaUser = this.buscarUsuarioNaLista(idUsuario);
    if (buscaUser != null) { if (this.participacoes.length != 0) {
      console.log(
        colors.fg.blue,
        `Eventos que o usuário ${buscaUser.nome} está participando:`,
        colors.reset
      );
      this.participacoes.forEach((evento) => {
        evento.visualizar();
      });
    }else {
      falha("Nenhum evento encontrado para este usuário.");
    }
      
    }
  }
  cancelarParticipacao(idUsuario: number, evento: Evento): void {
    let buscaUser = this.buscarUsuarioNaLista(idUsuario);
    if (buscaUser != null) {
      this.participacoes.splice(this.participacoes.indexOf(evento), 1);
      evento.listaPresnca.splice(evento.listaPresnca.indexOf(buscaUser), 1);
      console.log(
        colors.fg.green,
        `Usuário ${buscaUser.nome} removido do evento ${evento.nome} com sucesso!`,
        colors.reset
      );
    } else {
      console.log(colors.fg.red, "Usuário não encontrado!", colors.reset);
    }
  }
  listar(): void {
    for (let usuario of this.usuarios) {
      usuario.visualizar();
    }
  }

  public gerarId(): number {
    return ++this.Id;
  }
  public buscarUsuarioNaLista(id: number): Usuario | null {
    let usuario = this.usuarios.find((usuario) => usuario.id === id);
    return usuario || null;
  }
}
