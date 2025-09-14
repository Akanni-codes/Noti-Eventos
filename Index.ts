import { EventoController } from "./src/controller/EventoController";
import { UsuarioController } from "./src/controller/UsuarioController";
import { EventoPresencial } from "./src/model/EventoPresencial";
import { EventoVirtual } from "./src/model/EventoVirtual";
import { Usuario } from "./src/model/Usuario";
import { colors } from "./src/util/Colors";
import { coleta, falha, sucesso } from "./src/util/Mensagens";

const readlineSync = require("readline-sync");
const usuario: UsuarioController = new UsuarioController();
const promotor: EventoController = new EventoController();

// usuario.baixarUsuarios();

export function main() {

  while (true) {
    const userlogin: Array<string> = ["Sim", "Nao"];
    let opcao: number;

    console.log(
      colors.bg.black,
      colors.fg.yellowstrong,
      "*****************************************************"
    );
    console.log("                                                     ");
    console.log("                Noti-Eventos                          ");
    console.log("                                                     ");
    console.log("*****************************************************");
    console.log("                                                     ");
    console.log("            1 - Painel do Promotor                   ");
    console.log("            2 - Painel do Usuário                     ");
    console.log("            3 - Sair                                 ");
    console.log("                                                     ");
    console.log("*****************************************************");
    console.log("                                                     ");

    coleta("Escolha uma opção: ");
    opcao = readlineSync.questionInt("");

    if (opcao === 3) {
      sucesso("\nNoti-Eventos - O seu Show começa aqui!");
      sucesso("Obrigado por usar o Noti-Eventos");
      process.exit(0);
    }
    switch (opcao) {
      case 1:
        coleta("\nPainel do Promotor\n");
        PainelPromotor();
        break;
      case 2:
        coleta("\nPainel do Usuário\n");
        coleta("Já possui um usuário? : ");
        let possuiUsuario =
          readlineSync.keyInSelect(userlogin, "", { cancel: false }) + 1;
        switch (possuiUsuario) {
          case 1:
            PainelUsuario();
            break;
          case 2:
            coleta("Cadastrar novo Usuário");
            coleta("Entre com o nome do usuário: ");
            let nome = readlineSync.question("");
            coleta("Entre com o email do usuário: ");
            let email = readlineSync.question("");
            coleta("Entre com a senha do usuário: ");
            let senha = readlineSync.question("");
            coleta("Entre com a data de nascimento do usuário (YYYY-MM-DD): ");
            let dataNasc = new Date(readlineSync.question(""));
            usuario.cadastrar(
              new Usuario(usuario.gerarId(), nome, senha, dataNasc)
            );
            sucesso("Usuário cadastrado com sucesso!");
            PainelUsuario();
            break;
        }
        break;
    }
  }
}

export function PainelUsuario() {
  let opcao: number;
  
  
  
  while (true) {
    console.log(
      colors.bg.black,
      colors.fg.yellowstrong,
      "*****************************************************"
    );
    console.log("                                                     ");
    console.log("                Noti-Eventos                          ");
    console.log("                                                     ");
    console.log("*****************************************************");
    console.log("                                                     ");
    console.log("               Painel do Usuário                      ");
    console.log("                                                     ");
    console.log("*****************************************************");
    console.log("                                                     ");
    console.log("            1 - Cadastrar Usuário                     ");
    console.log("            2 - Participar de Evento                  ");
    console.log("            3 - Consultar Eventos por Usuário         ");
    console.log("            4 - cancelar Participação em Evento      ");
    console.log("            5 - Sair                                 ");
    console.log("                                                     ");
    console.log(
      "*****************************************************",
      colors.reset
    );
    console.log("enter com a opção desejada: ");
    opcao = readlineSync.questionInt("");

    if (opcao === 5) {
      sucesso("\nNoti-Eventos - O seu Show começa aqui!");
      sucesso("Obrigado por usar o Noti-Eventos");
      main();
    }

    switch (opcao) {
      case 1:
        coleta("Cadastrar novo Usuário");
        coleta("Entre com o nome do usuário: ");
        let nome = readlineSync.question("");
        coleta("Entre com o email do usuário: ");
        let email = readlineSync.question("");
        coleta("Entre com a senha do usuário: ");
        let senha = readlineSync.question("");
        coleta("Entre com a data de nascimento do usuário (YYYY-MM-DD): ");
        let dataNasc = new Date(readlineSync.question(""));
        try {
          usuario.cadastrar(
            new Usuario(usuario.gerarId(), nome, senha, dataNasc)
          );
          sucesso("Usuário cadastrado com sucesso!");
        } catch (error) {
          falha("Erro ao cadastrar usuário: " + error);
        }

        restar();
        break;
      case 2:
        console.log("Participar de um Evento");
        promotor.listar();
        coleta("Digite o Id do evento que deseja participar: ");
        let idEvento = readlineSync.questionInt("");
        coleta("Digite o seu Id de usuário: ");
        let idUsuario = readlineSync.questionInt("");
        let evento = promotor.buscarEventoNaLista(idEvento);
        let user = usuario.buscarUsuarioNaLista(idUsuario);
        if (evento != null && user != null) {
          usuario.participarEvento(idUsuario, evento);
          sucesso(
            `Usuário ${user.nome} adicionado ao evento ${evento.nome} com sucesso!`
          );
        } else {
          falha("Evento ou Usuario não encontrado!");
        }
        restar();
        break;
      case 3:
        console.log("Consultar Eventos por Usuário");
        coleta("Digite o seu Id de usuário: ");
        let idUser = readlineSync.questionInt("");
        usuario.consultarParticipacao(idUser);
        restar();
        break;
      case 4:
        console.log("Cancelar Participação em Evento");
        coleta("Digite o Id do evento que deseja cancelar a participação: ");
        let idEv = readlineSync.questionInt("");
        coleta("Digite o seu Id de usuário: ");
        let idUs = readlineSync.questionInt("");
        let ev = promotor.buscarEventoNaLista(idEv);
        let us = usuario.buscarUsuarioNaLista(idUs);
        if (ev && us) {
          usuario.cancelarParticipacao(idUs, ev);
          promotor.retirarPresenca(ev, us);
          sucesso(
            `Usuário ${us.nome} removido do evento ${ev.nome} com sucesso!`
          );
        } else {
          falha("Evento ou Usuário não encontrado!");
        }
        restar();
        break;
    }
  }
}

export function PainelPromotor() {
  
  const listaPresenca: Array<Usuario> = [];
  const tipoCategoria: Array<string> = ["Presencial", "Virtual"];
  let nome, endereco, descricao, link: string;
  let horario: Date;
  let Id, capacidade, categoria: number;
  let opcao: number;

  while (true) {
    console.log(
      colors.bg.black,
      colors.fg.yellowstrong,
      "*****************************************************"
    );
    console.log("                                                     ");
    console.log("                Noti-Eventos                          ");
    console.log("                                                     ");
    console.log("*****************************************************");
    console.log("                                                     ");
    console.log("               Painel do Promotor                    ");
    console.log("                                                     ");
    console.log("*****************************************************");
    console.log("                                                     ");
    console.log("            1 - Criar Evento                         ");
    console.log("            2 - Listar todos Eventos                 ");
    console.log("            3 - Buscar Evento por Id                  ");
    console.log("            4 - Atualizar Dados do Evento            ");
    console.log("            5 - Apagar Evento                        ");
    console.log("            6 - Sair                                ");
    console.log("                                                     ");
    console.log("*****************************************************");
    console.log(
      "                                                     ",
      colors.reset
    );

    console.log("Entre com a opção desejada: ");
    opcao = readlineSync.questionInt("");

    if (opcao == 6) {
      sucesso("\nNoti-Eventos - O seu Show começa aqui!");
      sucesso("Obrigado por usar o Noti-Eventos");
      main();
    }
    switch (opcao) {
      case 1:
        coleta("\nCriar Evento\n");
        coleta("Entre com o nome do evento: ");
        nome = readlineSync.question("");
        coleta("Entre com a data e hora do evento (YYYY-MM-DD HH:MM): ");
        horario = new Date(readlineSync.question(""));
        coleta("Escolha a categoria do evento:");
        categoria =
          readlineSync.keyInSelect(tipoCategoria, "", { cancel: false }) + 1;

        switch (categoria) {
          case 1:
            coleta("Entre com o endereço do evento: ");
            endereco = readlineSync.question("");
            coleta("Entre com a capacidade máxima de participantes: ");
            capacidade = readlineSync.questionInt("");
            coleta("Entre com a descrição do evento: ");
            descricao = readlineSync.question("");
            promotor.cadastrar(
              new EventoPresencial(
                promotor.gerarId(),
                nome,
                endereco,
                horario,
                categoria,
                descricao,
                listaPresenca,
                capacidade
              )
            );

            break;

          case 2:
            coleta("Entre com o link do evento virtual: ");
            link = readlineSync.question("");
            coleta("Entre com a descrição do evento: ");
            descricao = readlineSync.question("");
            promotor.cadastrar(
              new EventoVirtual(
                promotor.gerarId(),
                nome,
                horario,
                categoria,
                descricao,
                listaPresenca,
                link
              )
            );

            break;
        }

        restar();
        break;

      case 2:
        coleta("\nListar todos Eventos");
        promotor.listar();
        restar();
        break;

      case 3:
        coleta("\nBuscar Evento por Id");
        console.log("Entre com o Id do evento: ");
        Id = readlineSync.questionInt("");
        promotor.buscarPorId(Id);
        restar();
        break;

      case 4:
        coleta("\nAtualizar Dados do Evento");
        console.log("Entre com o Id do evento: ");
        Id = readlineSync.questionInt("");

        let evento = promotor.buscarEventoNaLista(Id);
        if (evento != null) {
          coleta("Entre com o nome do evento: ");
          nome = readlineSync.question("");
          coleta("Entre com a data e hora do evento (YYYY-MM-DD HH:MM): ");
          horario = new Date(readlineSync.question(""));
          coleta("Escolha a categoria do evento:");
          categoria =
            readlineSync.keyInSelect(tipoCategoria, "", { cancel: false }) + 1;
          switch (categoria) {
            case 1:
              coleta("Entre com o endereço do evento: ");
              endereco = readlineSync.question("");
              coleta("Entre com a capacidade máxima de participantes: ");
              capacidade = readlineSync.questionInt("");
              coleta("Entre com a descrição do evento: ");
              descricao = readlineSync.question("");
              promotor.atualizar(
                new EventoPresencial(
                  Id,
                  nome,
                  endereco,
                  horario,
                  categoria,
                  descricao,
                  evento.listaPresnca,
                  capacidade
                )
              );
              restar();
              break;
            case 2:
              coleta("Entre com o link do evento virtual: ");
              link = readlineSync.question("");
              coleta("Entre com a descrição do evento: ");
              descricao = readlineSync.question("");
              promotor.atualizar(
                new EventoVirtual(
                  Id,
                  nome,
                  horario,
                  categoria,
                  descricao,
                  evento.listaPresnca,
                  link
                )
              );
              restar();
              break;
          }
        } else {
          falha("Evento não encontrado!");
          restar();
        }
        break;

      case 5:
        coleta("\nApagar Evento");
        console.log("Entre com o Id do evento: ");
        Id = readlineSync.questionInt("");
        promotor.deletar(Id);
        restar();
        break;
    }
  }
}

function restar(): void {
  console.log(colors.reset, "");
  coleta("\nPressione enter para continuar...");
  readlineSync.prompt();
}

main();
