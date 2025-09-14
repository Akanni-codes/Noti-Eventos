import { error } from "console";
import { Evento } from "../model/Evento";
import { Usuario } from "../model/Usuario";
import { IUsuarioRepository } from "../repository/UsuarioRepository";
import { colors } from "../util/Colors";
import { falha, sucesso } from "../util/Mensagens";
const fs = require("fs");

export class UsuarioController implements IUsuarioRepository {
  private participacoes: Array<Evento> = new Array<Evento>();
  private usuarios: Array<Usuario> = new Array<Usuario>();
  Id: number = 0;
  constructor() {
    this.updateUsuarios();
  }

  cadastrar(usuario: Usuario): void {
    this.usuarios.push(usuario);
    fs.writeFileSync(
      "./database/usuarios.json",
      JSON.stringify(this.usuarios)
    );
    this.baixarUsuarios();
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
    if (buscaUser != null) {
      if (this.participacoes.length != 0) {
        console.log(
          colors.fg.blue,
          `Eventos que o usuário ${buscaUser.nome} está participando:`,
          colors.reset
        );
        this.participacoes.forEach((evento) => {
          evento.visualizar();
        });
      } else {
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
  updateUsuarios(): void {
    try {
      const data = fs.readFileSync("./database/usuarios.json", "utf-8");
    let tabela = data ? JSON.parse(data) : Evento;
    for (let i = 0; i < tabela.length; i++) {
      this.usuarios.push(
        new Usuario(
          tabela[i]._id,
          tabela[i]._nome,
          tabela[i]._senha,
          new Date(tabela[i]._dataNasc)
        )
      );
      this.Id = tabela.length;
    }
    sucesso("Usuários carregados com sucesso!");
    } catch (err) {
      falha("Erro ao carregar usuários: " + error(err) );
    }
    
  }
}
