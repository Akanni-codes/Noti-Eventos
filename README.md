# Noti-Eventos

Diagrama de classes
#


```mermaid
classDiagram
    %% ==================== Banco de Dados ====================
    class EventsData {
        <<datastore>>
        txt(events.data)
    }

    %% ==================== Classes ====================
    class Evento {
        <<Abstract>>
        + id: Number
        + nome: String
        + Endereço: String
        + Horario: Date
        + Categoria: Number
        + Descrição: String
        --
        + get nome(): void
        + set nome(): void
        + get endereço(): void
        + set endereço(): void
        + get Horario(): void
        + set Horario(): void
        + get Categoria(): void
        + set Categoria(): void
        + get Descrição(): void
        + set Descrição(): void
        + visualizar(): void
    }

    class Usuario {
        <<Abstract>>
        + id: Number
        + tipo: Number
        + nome: String
        + senha: Password
        + dataNascimento: Date
        --
        + get nome(): void
        + set nome(): void
        + get senha(): void
        + set senha(): void
        + get dataNascimento(): void
        + set dataNascimento(): void
        + consultarEventos(): void
        + participar(): void
        + consultarPresenca(): void
        + cancelarPresenca(): void
    }

    %% ==================== Subclasses Evento ====================
    class EventoShows {
        + atração: String
        + get atração(): String
        + set atração(): String
        + visualizar(): void
    }

    class EventoCongresso {
        + mesa: String
        + get mesa(): String
        + set mesa(): String
        + visualizar(): void
    }

    class EventoEsporte {
        + esporte: String
        + get esporte(): String
        + set esporte(): String
        + visualizar(): void
    }

    class EventoFesta {
        + dj: String
        + tipo: Number
        + get dj(): String
        + set dj(): String
        + get tipo(): String
        + set tipo(): String
        + visualizar(): void
    }

    %% ==================== Interfaces ====================
    class IUsuarioRepository {
        <<Interface>>
        + procurarPorNome(): void
        + listarTodos(): void
        + atualizar(): void
        + deletar(): void
        + cadastrar(): void
        + consultarEventos(): void
        + participar(): void
        + cancelarPresenca(): void
        + consultarPresenca(): void
    }

    class IEventoRepository {
        <<Interface>>
        + procurarPorNome(): void
        + listarTodos(): void
        + cadastrar(): void
        + atualizar(): void
        + deletar(): void
        + method(): void
    }

    %% ==================== Controllers ====================
    class UsuarioController {
        + procurarPorNome(): void
        + listarTodos(): void
        + cadastrar(): void
        + deletar(): void
        + atualizar(): void
    }

    class EventoController {
        + procurarPorNome(): void
        + listarTodos(): void
        + cadastrar(): void
        + deletar(): void
        + atualizar(): void
    }

    %% ==================== Relações ====================
    Evento <|-- EventoShows
    Evento <|-- EventoCongresso
    Evento <|-- EventoEsporte
    Evento <|-- EventoFesta

    IUsuarioRepository <|.. UsuarioController
    IEventoRepository  <|.. EventoController

    IUsuarioRepository ..> Usuario : manipula
    IEventoRepository  ..> Evento  : manipula

    Evento --> EventsData : lê/grava
