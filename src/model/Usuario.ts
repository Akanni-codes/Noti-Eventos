export class Usuario {
  private _id: number;
  private _nome: string;
  private _senha: string;
  private _dataNasc: Date;
  constructor(id: number, nome: string, senha: string, dataNasc: Date) {
    (this._id = id),
      (this._nome = nome),
      (this._senha = senha),
      (this._dataNasc = dataNasc);
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

  public get senha() {
    return this._senha;
  }

  public set senha(senha: string) {
    this._senha = senha;
  }

  public get dataNasc() {
    return this._dataNasc;
  }

  public set dataNasc(dataNasc: Date) {
    this._dataNasc = dataNasc;
  }

  /**
   * caulcularIdade
   */
  public caulcularIdade(): number {
    return new Date().getFullYear() - this._dataNasc.getFullYear();
  }

  public visualizar(): void {
    console.log("Id: " + this._id);
    console.log("Nome: " + this._nome);
    console.log("Senha: " + this._senha);
    console.log("Idade: " + this.caulcularIdade() + " anos");
  }
}
