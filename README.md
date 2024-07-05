# HackerCidadã0 11.0 2024 - Hera

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Expo-000000?style=for-the-badge&logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/github/contributors/wectornanime/HackerCIdadao2024.svg?style=for-the-badge" />
  <img src="https://img.shields.io/github/license/wectornanime/HackerCIdadao2024.svg?style=for-the-badge" />
  <img src="http://img.shields.io/static/v1?label=STATUS&message=CONCLUIDO&color=GREEN&style=for-the-badge" />
</div>

### Tópicos

🔹 [Descrição do projeto](#descrição-do-projeto-)

🔹 [Funcionalidades](#funcionalidades-️)

🔹 [Pré-requisitos](#pré-requisitos-)

🔹 [Tarefas em aberto](#tarefas-em-aberto-)

🔹 [Como rodar a aplicação](#como-rodar-a-aplicação-️)

## Descrição do projeto 📝

A hera é um aplicativo que utiliza geolocalização para mostrar os locais das barreiras e uma api de dados do recife com os abrigos.
Ela tambem mostra para a prefeitura um modelo 3D de cada barreira, esse modelo é gerado por fotometria com uso de câmeras.

## Funcionalidades 🛠️

✔️ Registar, ler, deletar ocorrências.

✔️ Atualizar o status das ocorrências.

✔️ Anexar imagem à ocorrência.

✔️ Enviar a localização da ocorrência.

## Pré-requisitos ✅

⚠️ [Node Js](https://nodejs.org/en/download/)

⚠️ [Expo](https://expo.dev/)

⚠️ [Mongo db](https://www.mongodb.com/)

## Tarefas em aberto 🔄

⚠️ Adicionar integração com o GoogleEarch.

## Como rodar a aplicação 🕹️

### Clone o projeto

Primeiro faça o clone do projeto com o seguinte comando:

```
git clone https://github.com/Wectornanime/HackerCIdadao2024.git
```

### Instale as dependências

Depois, acesse a pasta onde o projeto foi clonado.

#### Mobile

Acesse a pasta do mobile, e instale as dependencias com o seguinte comando:
```
npm install
```

#### Backend
Acesse a pasta do back, e instale as dependencias com o seguinte comando:
```
npm install
```

### Troque o link do back no mobile:

Acesse o arquivo `Report.js` e procure por `apiUrl`, troque pelo ip do seu backend.

### Rode a aplicação em modo de desenvolvimento:

Para rodar a aplicação em modo de desenvolvimento, execute o seguinte comando para o back e o mobile:

```
npm start
```

### Veja a aplicação rodando em seu dispositivo móvel:

#### Instale o Expo Go em seu dispositivo

Para ver a aplicação rodando em seu dispositivo móvel, você precisará instalar o aplicativo `Expo Go`.

[![](https://img.shields.io/badge/Google_Play-414141?style=for-the-badge&logo=google-play&logoColor=white)](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pt_BR)
[![](https://img.shields.io/badge/App_Store-0D96F6?style=for-the-badge&logo=app-store&logoColor=white)](https://apps.apple.com/br/app/expo-go/id982107779)

#### Abra a aplicação

Após a instalação do `Expo Go`, você poderá ler o `Qr code` disponivel no terminal.

## Licença ⚖️

The [MIT License](./LICENSE) (MIT)

Copyright ©️ 2024 - HackerCidadão 11.0
