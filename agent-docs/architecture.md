# architecture

## Objetivo
Apoiar decisoes de arquitetura para manter consistencia entre modulos, camadas e integracao com banco.

## Quando usar
- Definir ou revisar fronteiras entre modulos (`projects`, `tasks` e futuros).
- Avaliar impacto de mudancas entre camadas (`application`, `infra`, `core`).
- Planejar evolucoes de dominio antes de alterar controllers/repositorios/use-cases.

## Entradas esperadas
- Contexto do problema de dominio.
- Modulos e endpoints impactados.
- Regras de negocio e restricoes de dados.

## Checklist de saida
- Decisao tomada e trade-offs.
- Arquivos e camadas impactadas.
- Riscos de regressao e estrategia de teste.
