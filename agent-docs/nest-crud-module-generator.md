# nest-crud-module-generator

## Objetivo
Gerar ou acelerar criacao de modulo CRUD seguindo o padrao atual do projeto NestJS.

## Estrutura alvo
- `src/modules/<modulo>/<modulo>.module.ts`
- `src/modules/<modulo>/infra/controllers/*.controller.ts`
- `src/modules/<modulo>/infra/repositories/*.repository.ts`
- `src/modules/<modulo>/application/use-cases/*.use-case.ts`
- `src/modules/<modulo>/dto/*.dto.ts`

## Quando usar
- Criacao de novo modulo de dominio.
- Inclusao de novos casos de uso CRUD em modulo existente.

## Checklist de saida
- Arquivos criados/alterados por camada.
- Rotas expostas e contratos (DTOs).
- Dependencias entre modulo, repositorio e use-cases.
