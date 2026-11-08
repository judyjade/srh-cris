# PAUSA ATIVA — Movimente-se. Cuide de você.

Site educativo do Projeto Integrador de Fisioterapia (Fisioterapia do Trabalho), com exercícios de
alongamento e mobilidade para funcionários do McDonald's.

## Como abrir

Dê dois cliques em `index.html`. Não precisa instalar nada nem ter servidor.
As fontes (Archivo e Mulish) vêm do Google Fonts; sem internet o site usa uma fonte padrão do sistema.

## Estrutura de pastas

```
pausa-ativa/
├── index.html            Estrutura das páginas (Início, Exercícios, Sobre, Dicas) e rodapé
├── css/
│   └── estilos.css       Cores, tipografia, layout e responsividade
└── js/
    ├── ilustracoes.js    Desenho dos exercícios em SVG (figura, poses, área de alongamento, setas)
    ├── dados.js          Conteúdo: exercícios, categorias, benefícios, dicas e ícones
    └── app.js            Cartões, página de detalhe, filtro, menu e navegação entre páginas
```

A ordem dos `<script>` no `index.html` importa: `ilustracoes.js`, depois `dados.js`, depois `app.js`.

## Como editar

| Quero mudar...                              | Onde                                                    |
|---------------------------------------------|---------------------------------------------------------|
| Textos de um exercício (passos, tempo etc.) | `js/dados.js`, lista `EX`                               |
| Mover um exercício de categoria             | `js/dados.js`, campo `cat` (`sup`, `col` ou `per`)      |
| Dicas de saúde                              | `js/dados.js`, lista `TIPS`                             |
| Benefícios da página inicial                | `js/dados.js`, lista `BEN`                              |
| Textos de "Sobre o projeto", rodapé, título | `index.html`                                            |
| Cores                                       | `css/estilos.css`, bloco `:root` no início              |
| Postura de uma figura                       | `js/ilustracoes.js`, objeto `POSES`                     |

## Navegação

O site é uma página só, com rotas pelo endereço: `#inicio`, `#exercicios`, `#sobre`, `#dicas`
e `#ex-1` até `#ex-10` (detalhe de cada exercício).

## Aviso

O conteúdo tem finalidade educativa e não substitui uma avaliação individual com um fisioterapeuta.
