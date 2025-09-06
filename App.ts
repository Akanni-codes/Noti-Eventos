import { colors } from "./src/util/Colors";

const readlineSync = require("readline-sync");

export function main() {
  let opcao: number;
  while (true) {
    console.log(
      colors.bg.black,
      colors.fg.yellowstrong,
      "*****************************************************"
    );
    console.log("                                                     ");
    console.log("                BANCO DO BRAZIL COM Z                ");
    console.log("                                                     ");
    console.log("*****************************************************");
    console.log("                                                     ");
    console.log("            1 - Criar Evento                         ");
    console.log("            2 - Listar todos Eventos                 ");
    console.log("            3 - Buscar Evento por Nome               ");
    console.log("            4 - Atualizar Dados do Evento            ");
    console.log("            5 - Apagar Evento                        ");
    console.log("            6 - ******                               ");
    console.log("            7 - *********                            ");
    console.log("            8 - *******************************      ");
    console.log("            9 - Sair                                 ");
    console.log("                                                     ");
    console.log("*****************************************************");
    console.log(
      "                                                     ",
      colors.reset
    );

    console.log("Entre com a opção desejada: ");
    opcao = readlineSync.questionInt("");

    if (opcao == 9) {
      console.log(
        colors.fg.greenstrong,
        "\nNoti-Eventos - O seu Show começa aqui!"
      );
      console.log("Obrigado por usar o Noti-Eventos");
      console.log(colors.reset, "");
      process.exit(0);
    }
    switch (opcao) {
      case 1:
        console.log("\nCriar Evento");
        restar();
        break;

      case 2:
        console.log("\nListar todos Eventos");
        restar();
        break;

      case 3:
        console.log("\nBuscar Evento por Nome");
        restar();
        break;

      case 4:
        console.log("\nAtualizar Dados do Evento");
        restar();
        break;

      case 5:
        console.log("\nApagar Evento");
        restar();
        break;

      case 6:
        restar();
        break;

      case 7:
        restar();
        break;

      case 8:
        restar();
        break;
    }
  }

  function restar(): void {
    console.log(colors.reset, "");
    console.log("\nPressione enter para continuar...");
    readlineSync.prompt();
  }
}

main();
