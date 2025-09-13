import { Evento } from "./Evento";
import { Usuario } from "./Usuario";

export class EventoVirtual extends Evento {
  private _link: string;
  constructor(
    id: number,
    nome: string,
    horario: Date,
    categoria: number,
    descricao: string,
    listaPresenca: Array<Usuario>,
    link: string
  ) {
    super(id, nome, "", horario, categoria, descricao, listaPresenca);
    this._link = link;
  }
  public get link() {
    return this._link;
  }
  public set link(link: string) {
    this._link = link;
  }
  public visualizar(): void {
    console.log("Link: " + this._link);
    super.visualizar();
  }
}
