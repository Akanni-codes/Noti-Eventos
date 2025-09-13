import { UsuarioController } from "./src/controller/UsuarioController";
import { PainelPromotor } from "./src/engines/PainelPromotor";
import { PainelUsuario } from "./src/engines/PainelUsuario";
import { Usuario } from "./src/model/Usuario";
import { colors } from "./src/util/Colors";
import { coleta, falha, sucesso } from "./src/util/Mensagens";

const readlineSync = require("readline-sync");

export function main() {
  while (true) {
    const usuario: UsuarioController = new UsuarioController();
    const userlogin: Array<string> = ["Sim", "Não"];
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
            break;
        }
        break;
    }
  }
}

main();
