import { EventoController } from "../controller/EventoController";
import { UsuarioController } from "../controller/UsuarioController";
import { EventoPresencial } from "../model/EventoPresencial";
import { EventoVirtual } from "../model/EventoVirtual";
import { Usuario } from "../model/Usuario";
import { colors } from "../util/Colors";
import { coleta, falha, sucesso } from "../util/Mensagens";

const readlineSync = require("readline-sync");

export function PainelUsuario() {
  let opcao: number;
  const promotor: EventoController = new EventoController();
  const usuario: UsuarioController = new UsuarioController();
// Dados iniciais para teste
  usuario.cadastrar(
    new Usuario(
      usuario.gerarId(),
      "Ana Silva",
      "senha123",
      new Date("1990-06-15")
    )
  );
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
      process.exit(0);
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
        usuario.cadastrar(
          new Usuario(usuario.gerarId(), nome, senha, dataNasc)
        );
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

function restar(): void {
  console.log(colors.reset, "");
  coleta("\nPressione enter para continuar...");
  readlineSync.prompt();
}

PainelUsuario();
