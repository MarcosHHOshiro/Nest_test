# AGENTS.md

Este arquivo centraliza os agentes do projeto e quando cada um deve ser usado.

## Regras Gerais

- Sempre manter consistencia com os padroes existentes em `src/modules/`, `src/core/`, `prisma/` e `test/`.
- Evitar criar novo padrao sem necessidade; priorizar convencoes ja usadas em `projects` e `tasks`.
- Sempre que possivel, incluir ou atualizar testes no mesmo fluxo da alteracao (`*.spec.ts` e `test/app.e2e-spec.ts`).
- Antes de editar comportamento de dominio, revisar a organizacao por camadas: `application/use-cases`, `infra/controllers` e `infra/repositories`.

## Agentes Disponiveis

| Agente | Quando acionar | Documento |
| --- | --- | --- |
| `nest-crud-module-generator` | Criar novo modulo CRUD no padrao do projeto (module + controller + repository + use-cases + dto) | `agent-docs/nest-crud-module-generator.md` |
| `prisma-schema-migration-agent` | Alterar modelo de dados, gerar migracao e alinhar acesso a dados com Prisma | `agent-docs/prisma-schema-migration-agent.md` |
| `test-suite-generator` | Criar ou expandir testes unitarios e e2e com cobertura minima de fluxos e regras de negocio | `agent-docs/test-suite-generator.md` |
| `documentation-writer` | Atualizar documentacao tecnica de modulos, endpoints e decisoes relevantes | `agent-docs/documentation-writer.md` |
| `architecture` | Decisoes de modelagem, organizacao de camadas e impacto entre modulos (`projects` e `tasks`) | `agent-docs/architecture.md` |

## Ordem Recomendada de Uso

1. `architecture` (entender contexto, limites e dependencias entre modulos)
2. `prisma-schema-migration-agent` (ajustar modelo de dados quando necessario)
3. `nest-crud-module-generator` (gerar ou evoluir base do modulo)
4. `test-suite-generator` (garantir cobertura minima e regressao)
5. `documentation-writer` (registrar contrato e decisoes)

## Convencoes de Entrega dos Agentes

- Explicitar entradas consideradas (modulo, dominio, DTOs, rotas, tabelas e casos de uso).
- Informar arquivos criados/alterados.
- Validar tipagem/sintaxe e, quando possivel, executar testes relacionados (`pnpm run test` e/ou `pnpm run test:e2e`).
- Destacar pendencias manuais (se houver), incluindo migracoes, seeds ou variaveis de ambiente.
