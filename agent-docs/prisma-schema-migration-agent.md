# prisma-schema-migration-agent

## Objetivo
Evoluir o modelo de dados com Prisma mantendo compatibilidade com dominio e repositorios.

## Quando usar
- Criar/alterar entidades em `prisma/schema.prisma`.
- Preparar migracoes para novas regras de negocio.
- Ajustar mapeamento de repositorios para novo schema.

## Entradas esperadas
- Mudanca de dominio esperada.
- Entidades/campos afetados.
- Regras de relacionamento e constraints.

## Checklist de saida
- Alteracoes no `schema.prisma`.
- Migracao gerada/planejada.
- Impacto em repositorios/use-cases/testes.
