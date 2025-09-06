import { Usuario } from "./Usuario";

export abstract class Evento {
  private _id: number;
  private _nome: string;
  private _endereco: string;
  private _horario: Date;
  private _categoria: number;
  private _descricao: string;
  private _listaPresnca: Array<Usuario>;

  constructor(
    id: number,
    nome: string,
    endereco: string,
    horario: Date,
    categoria: number,
    descricao: string,
    listaPresenca: Array<Usuario>
  ) {
    (this._id = id),
      (this._nome = nome),
      (this._endereco = endereco),
      (this._horario = horario),
      (this._categoria = categoria),
      (this._descricao = descricao),
      (this._listaPresnca = listaPresenca);
  }
  
 public get id() {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get nome() {
    return this._nome;
  }

  public set nome(nome: string) {
    this._nome = nome;
  }
 

  public get endereco() {
    return this._endereco;
  }

  public set endereco(endereco: string) {
    this._endereco = endereco;
  }

  public get horario() {
    return this._horario;
  }

  public set horario(horario: Date) {
    this._horario = horario;
  }

  public get categoria() {
    return this._categoria;
  }

  public set categoria(categoria: number) {
    this._categoria = categoria;
  }

  public get descricao() {
    return this._descricao;
  }

  public set descricao(descricao: string) {
    this._descricao = descricao;
  }

  public get listaPresnca() {
    return this._listaPresnca;
  }

  public set listaPresnca(listaPresnca: Array<Usuario>) {
    this._listaPresnca = listaPresnca;
  }

  public inserirNaLista() {
    
  }

  public visualizar() {
    
  }
}
