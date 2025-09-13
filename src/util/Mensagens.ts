import { colors } from "./Colors";

//Funções utilitárias para mensagens coloridas

export function sucesso(msg: string) {
  console.log(colors.fg.greenstrong, msg, colors.reset);
}
export function falha(msg: string) {
  console.log(colors.fg.redstrong, msg, colors.reset);
}
export function coleta(msg: string) {
  console.log(colors.fg.yellowstrong, msg, colors.reset);
}