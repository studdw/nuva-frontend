<div align="center">

<img src="public/favicon.svg" width="72" alt="Ícone NUVA" />

# NUVA — Guardiões da Luz

**Plataforma de gamificação que transforma ações sustentáveis em desconto real na conta de energia.**

</div>

## 📌 Título e Descrição

A **NUVA — Guardiões da Luz** distribui **missões sustentáveis diárias**, valida a execução por **vídeo com inteligência artificial**, credita **SoulCoins** e converte os pontos em **desconto na conta de energia** (`100 SoulCoins = R$ 1,00`). Os dados vêm da **API Java** (Spring Boot + Oracle) hospedada no Render.

**Problema:** quem já recicla, economiza água/energia ou usa transporte alternativo não recebe retorno concreto.
**Solução:** recompensa financeira + validação por IA + ligas comunitárias com ranking semanal além da competição vista como um incentivo para continuar a colaboração.

## 🛠️ Tecnologias utilizadas

| Tecnologia | Uso |
|---|---|
| React 19 + Vite 6 + TypeScript | Interface e build |
| React Router DOM 7 | Rotas estáticas, dinâmicas e redirecionamentos |
| Tailwind CSS 4 | Design system "Midnight Gallery" |
| Fetch API + Context API | Integração com a API Java e estado da carteira |
| API Java (Spring Boot, JDBC, Oracle) | Back-end — repositório `nuva-api` |
| Vercel / Render | Hospedagem do front / da API |

## 🧭 Rotas

| Tipo | Rota | Página | API usada |
|---|---|---|---|
| Estática | `/` | Home | `GET /missoes`, `GET /usuarios/1` |
| Estática | `/sobre` | Sobre | — |
| Estática | `/integrantes` | Integrantes | — |
| Estática | `/faq` | FAQ | — |
| Estática | `/contato` | Contato | `POST /contatos` |
| Solução | `/missoes` | Catálogo de missões | `GET /missoes`, `GET /usuarios/1/validacoes` |
| Solução | `/ligas` | Ligas | `GET /ligas` |
| Solução | `/carteira` | Saldo e conversão | `GET /usuarios/1/carteira`, `POST /conversoes`, `DELETE /conversoes/{id}` |
| Solução | `/modelo-de-negocio` | Canvas e backlog | — |
| Dinâmica | `/missoes/:id` | Detalhe + envio do vídeo | `GET /missoes/{id}`, `POST /validacoes` |
| Dinâmica | `/ligas/:id` | Ranking + trocar de liga | `GET /ligas/{id}`, `GET /ligas/{id}/ranking`, `PUT /usuarios/1` |
| Dinâmica | `/integrantes/:rm` | Perfil do integrante | — |
| Redirect | `/home`, `/about`, `/jogo` | → `/`, `/sobre`, `/missoes` | — |

IDs inválidos (ex.: `/missoes/999`) recebem 404 da API e redirecionam para a listagem com mensagem personalizada.

## 📁 Estrutura de Pastas

```
src/
├── components/   Header, Footer, Layout, Celular, Estado, Icones, ui
├── context/      CarteiraContext.tsx   (usuário + saldo vindos da API)
├── data/         integrantes.ts, conteudo.ts (FAQ, canvas, cores)
├── hooks/        useApi.ts             (carregando / erro / dados)
├── services/     api.ts                (todas as chamadas HTTP)
├── pages/        Home, Sobre, Missoes, MissaoDetalhe, Ligas, LigaDetalhe,
│                 Carteira, ModeloNegocio, Integrantes, IntegranteDetalhe,
│                 Faq, Contato, NaoEncontrado
├── App.tsx  ·  main.tsx  ·  index.css  ·  types.ts
```

## 🖼️ Imagens e ícones

- `public/favicon.svg` — marca NUVA (sol monoline).
- Ícones GitHub/LinkedIn em SVG (`src/components/Icones.tsx`).
- Fotos dos integrantes a partir dos perfis do GitHub/LinkedIn.

## 🚀 Como usar

- **GitHub:** https://github.com/studdw/nuva-guardioes-da-luz
- **YouTube:** 
- **Vercel:** https://nuva-guardioes-da-luz.vercel.app

```bash
git clone https://github.com/studdw/nuva-guardioes-da-luz.git
cd nuva-guardioes-da-luz
npm install
cp .env.example .env      # ajuste VITE_API_URL
npm run dev
```

## 👥 Autores e Créditos

| Foto | Nome | RM | Turma | GitHub | LinkedIn |
|---|---|---|---|---|---|
| <img src="https://github.com/studdw.png" width="48" /> | Lucas Kaftan | 571302 | 1TDSPV | [studdw](https://github.com/studdw) | [LinkedIn](https://www.linkedin.com/in/lucas-pasturuti-354523273/) |
| <img src="https://media.licdn.com/dms/image/v2/D4D03AQGPjLE86UcqKQ/profile-displayphoto-shrink_800_800/B4DZQrte1sGgAc-/0/1735900131165?e=1792627200&v=beta&t=5iZsTmBZw4xQpXhiSxzmlSLiFPhW1mKRrmvyrWwWczE" width="48" /> | Matheus Iumatti | 571047 | 1TDSPV | [IuRuas](https://github.com/IuRuas) | [LinkedIn](https://www.linkedin.com/in/matheus-iumatti-ruas-6923352bb/) |
| <img src="https://media.licdn.com/dms/image/v2/D4D03AQH1f1-EAjR1BQ/profile-displayphoto-crop_800_800/B4DZx7KvIPGUAI-/0/1771592940499?e=1792627200&v=beta&t=iB4ytzlwaz0ifpWwWExqZuKrtWUjswvz_sO7yXXLAa4" width="48" /> | Vinicius Silveira Espósito | 571844 | 1TDSPV | [ViniEsposito-dev](https://github.com/ViniEsposito-dev) | [LinkedIn](https://www.linkedin.com/in/vinicius-silveira-esp%C3%B3sito-107a2a25a/) |
| <img src="https://media.licdn.com/dms/image/v2/D4D03AQGAxyYOO32cbg/profile-displayphoto-crop_800_800/B4DZyMkw6rGQAI-/0/1771884974184?e=1792627200&v=beta&t=H0aN6tXIy_A74clS3zCJFk2DzmdyPw-drDXkcsXLUVk" width="48" /> | Joao Carlos | 568952 | 1TDSPV | [jocax007](https://github.com/jocax007) | [LinkedIn](https://www.linkedin.com/in/jo%C3%A3o-carlos-lopes-957976264/) |
| <img src="https://media.licdn.com/dms/image/v2/D4D03AQE74WGo9OpVdw/profile-displayphoto-crop_800_800/B4DZyLRNFuJkAM-/0/1771863069648?e=1792627200&v=beta&t=hIGHV1XHWyP578WOqVrr1NFCfmFUec227EF44TEcePc" width="48" /> | Lucas Luque | 573347 | 1TDSPV | [Lucas Luque](https://github.com/) | [LinkedIn]() |

## ✉️ Contato

Formulário em `/contato` (salvo na API) · contato@nuva.app
