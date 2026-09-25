# Bella Fit

Aplicativo web instalável para montar rotinas, registrar sessões de treino e acompanhar a evolução. Interface em português, pensada primeiro para celular.

## Funcionalidades

- Cadastro, login, logout e redefinição local de senha.
- Treinos iniciais e CRUD de rotinas e movimentos; exercícios personalizados, favoritos, pesquisa e séries independentes.
- Agenda semanal vinculada às rotinas.
- Execução de treino com registro de carga/repetições, cronômetro de descanso, som e vibração configuráveis.
- Histórico, calendário e gráficos derivados dos registros do perfil.
- Perfil, tema, unidade kg/lb, backup JSON, restauração e exclusão com confirmação.
- PWA com manifesto, ícones, cache do app e demonstrações para acesso offline depois da instalação/carregamento do cache.

## Desenvolvimento

Requer Node.js 22 e pnpm.

```bash
pnpm install
pnpm dev
```

Verificações antes de publicar:

```bash
pnpm check
pnpm test
pnpm build
```

O build gera o frontend em `dist/public`. A hospedagem deve servir HTTPS e redirecionar rotas de navegação para `index.html`.

## Dados e privacidade

O app não possui backend de conta nem sincronização na nuvem. Credenciais, perfil, rotinas, preferências e histórico ficam no `localStorage` do navegador e são separados por perfil local. As senhas são armazenadas como hashes PBKDF2 com salt aleatório quando o navegador oferece Web Crypto. A redefinição de senha só alcança uma conta criada **neste mesmo navegador/dispositivo**. Exporte backups regulares: limpar os dados do navegador pode apagar os registros.

A opção de lembrete usa notificações locais quando o app é aberto e há treino programado para o dia. Como esta versão não tem serviço push/backend, ela não agenda avisos enquanto o app estiver fechado.

## PWA e mídia

O service worker guarda o shell, os ícones e as demonstrações visuais para uso offline. Os arquivos de mídia do preview atual são servidos pelo armazenamento gerenciado do WebDev em `/manus-storage/`; essa origem de mídia precisa ser mantida ou substituída ao mover a implantação para outro provedor.

As demonstrações derivadas do Free Exercise DB estão documentadas em [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md).
