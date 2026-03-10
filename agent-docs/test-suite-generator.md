# test-suite-generator

## Objetivo
Criar e expandir testes para reduzir regressao em fluxos principais de negocio.

## Quando usar
- Nova funcionalidade em use-case, controller ou repositorio.
- Correcao de bug com necessidade de teste de nao-regressao.

## Escopo
- Unitarios em `src/**/*.spec.ts`.
- e2e em `test/app.e2e-spec.ts` e futuros arquivos em `test/`.

## Checklist de saida
- Cenarios cobertos (sucesso, validacao, erro).
- Arquivos de teste criados/alterados.
- Comandos executados e resultado (`pnpm run test`, `pnpm run test:e2e`).
