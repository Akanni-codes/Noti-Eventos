import { EventoVirtual } from "./../model/EventoVirtual";
import { error } from "console";
import { Evento } from "../model/Evento";
import { Usuario } from "../model/Usuario";
import { IEventoRepository } from "../repository/EventoRepository";
import { colors, falha, sucesso } from "../util/Colors";

import { EventoPresencial } from "../model/EventoPresencial";
const fs = require("fs");
export class EventoController implements IEventoRepository {
  private eventos: Array<Evento> = new Array<Evento>();
  Id: number = 0;

  constructor() {
    this.updateEventos();
  }
  listar(): void {
    for (let evento of this.eventos) {
      evento.visualizar();
    }
  }
  cadastrar(evento: Evento): void {
    this.eventos.push(evento);
    fs.writeFileSync("./database/eventos.json", JSON.stringify(this.eventos));
  }
  atualizar(evento: Evento): void {
    let buscaEvento = this.buscarEventoNaLista(evento.id);
    if (buscaEvento != null) {
      this.eventos[this.eventos.indexOf(buscaEvento)] = evento;
      console.log(
        colors.fg.green,
        "Evento atualizado com sucesso!",
        colors.reset
      );
    } else {
      console.log(colors.fg.red, "Evento não encontrado!", colors.reset);
    }
  }
  deletar(id: number): void {
    let buscaEvento = this.buscarEventoNaLista(id);
    if (buscaEvento != null) {
      this.eventos.splice(this.eventos.indexOf(buscaEvento), 1);
      console.log(
        colors.fg.green,
        "Evento deletado com sucesso!",
        colors.reset
      );
    } else {
      console.log(colors.fg.red, "Evento não encontrado!", colors.reset);
    }
  }
  buscarPorId(id: number): void {
    let buscaEvento = this.buscarEventoNaLista(id);
    if (buscaEvento != null) {
      buscaEvento.visualizar();
    } else {
      console.log(colors.fg.red, "Evento não encontrado!", colors.reset);
    }
  }
  buscarEventoNaLista(id: number): Evento | null {
    for (let evento of this.eventos) {
      if (evento.id == id) {
        return evento;
      }
    }
    return null;
  }

  retirarPresenca(evento: Evento, usuario: Usuario): void {
    evento.listaPresnca.splice(evento.listaPresnca.indexOf(usuario), 1);
  }
  gerarId(): number {
    return ++this.Id;
  }
  updateEventos(): void {
    const data = fs.readFileSync("./database/eventos.json", "utf-8");
    let tabela = data ? JSON.parse(data) : Evento;
    try {
      for (let i = 0; i < tabela.length; i++) {
        if (tabela[i].hasOwnProperty("_link")) {
          this.eventos.push(
            new EventoVirtual(
              tabela[i]._id,
              tabela[i]._nome,
              tabela[i]._horario,
              tabela[i]._categotia,
              tabela[i]._descricao,
              tabela[i]._listaPresnca,
              tabela[i]._link
            )
          );
        } else if (tabela[i].hasOwnProperty("_capacidade")) {
          this.eventos.push(
            new EventoPresencial(
              tabela[i]._id,
              tabela[i]._nome,
              tabela[i]._endereco,
              tabela[i]._horario,
              tabela[i]._categotia,
              tabela[i]._descricao,
              tabela[i]._listaPresnca,
              tabela[i]._capacidade
            )
          );
        }
        this.Id = this.eventos.length;
        sucesso("Eventos carregados com sucesso!");
      }
    } catch (err) {
      falha("Erro ao carregar eventos: " + error(err));
    }
  }
}
