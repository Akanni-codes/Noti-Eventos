export class Usuario {
  private _id: number;
  private _tipo: number;
  private _nome: string;
  private _senha: string;
  private _dataNasc: Date;
  constructor(
    id: number,
    tipo: number,
    nome: string,
    senha: string,
    dataNasc: Date
  ) {
    (this._id = id),
      (this._tipo = tipo),
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
public get tipo() {
    return this._tipo;
}

public set tipo(tipo: number) {
    this._tipo = tipo;
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

public consultarEventos() {
    
}

public presenca() {
    
}

public consultarPesenca() {
    
}

public cancelarPesenca() {
    
}

}
