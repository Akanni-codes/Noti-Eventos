import { Evento } from "../model/Evento";
import { Usuario } from "../model/Usuario";
import { IEventoRepository } from "../repository/EventoRepository";
import { colors } from "../util/Colors";

export class EventoController implements IEventoRepository {
  
  private eventos: Array<Evento> = new Array<Evento>();

  Id: number = 0;
  listar(): void {
    for (let evento of this.eventos) {
      evento.visualizar();
    }
  }
  cadastrar(evento: Evento): void {
    this.eventos.push(evento);
    console.log(
      colors.fg.green,
      "Evento cadastrado com sucesso!",
      colors.reset
    );
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
    evento.listaPresnca.splice(
      evento.listaPresnca.indexOf(usuario),
      1
    );
  }
  gerarId(): number {
    return ++this.Id;
  }
}
