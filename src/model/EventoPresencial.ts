import { Evento } from "./Evento";
import { Usuario } from "./Usuario";

export class EventoPresencial extends Evento {
  private _capacidade: number;

  constructor(
    id: number,
    nome: string,
    endereco: string,
    horario: Date,
    categoria: number,
    descricao: string,
    listaPresenca: Array<Usuario>,
    capacidade: number
  ) {
    super(id, nome, endereco, horario, categoria, descricao, listaPresenca);
    this._capacidade = capacidade;
  }
  public get capacidade() {
    return this._capacidade;
  }
  public set capacidade(capacidade: number) {
    this._capacidade = capacidade;
  }
  public visualizar(): void {
    console.log("Capacidade: " + this._capacidade);
    super.visualizar();
  }
}
