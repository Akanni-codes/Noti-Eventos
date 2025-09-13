import { EventoVirtual } from "../model/EventoVirtual";
import { EventoPresencial } from "../model/EventoPresencial";
import { Usuario } from "../model/Usuario";
import { colors } from "../util/Colors";
import { EventoController } from "../controller/EventoController";
import { coleta, falha, sucesso } from "../util/Mensagens";

const readlineSync = require("readline-sync");

export function PainelPromotor() {
  const promotor: EventoController = new EventoController();
  const listaPresenca: Array<Usuario> = [];
  const tipoCategoria: Array<string> = ["Presencial", "Virtual"];
  let nome, endereco, descricao, link: string;
  let horario: Date;
  let Id, capacidade, categoria: number;
  let opcao: number;

  promotor.cadastrar(
    new EventoPresencial(
      promotor.gerarId(),
      "Show de Rock",
      "Av. Brasil, 1000",
      new Date("2024-12-31T21:00:00"),
      1,
      "Um show imperdível de rock!",
      [],
      5000
    )
  );
  promotor.cadastrar(
    new EventoVirtual(
      promotor.gerarId(),
      "Webinar de Tecnologia",
      new Date("2025-02-17 20:30"),
      2,
      "",
      [],
      "https://example.com/webinar"
    )
  );
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
      process.exit(0);
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

  function restar(): void {
    console.log(colors.reset, "");
    coleta("\nPressione enter para continuar...");
    readlineSync.prompt();
  }
}

PainelPromotor();
