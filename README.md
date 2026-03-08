# Aplicativo da Parko 

<p>
  <img src="assets/logo-parko.png" alt="Parko App" />
</p>

## Visão geral
Parko é um aplicativo mobile desenvolvido para facilitar a reserva de vagas em estacionamentos, permitindo que motoristas encontrem, visualizem e reservem vagas em tempo real, reduzindo tempo de busca e transtornos urbanos.

Este app utiliza os serviços do Google para utilizar o mapa e geolocalização do usuário.

Você pode encontrar estacionamentos marcados no mapa do aplicativo.

---

## Tecnologias utilizadas
- React Native (Expo)
- JWT (Autenticação de usuário)
- Axios
- Expo Location (Geolocalização)
- Mapa (react-native-maps)
- Map View Directions (API do Google)

---

## Pré-requisitos
Antes de começar, você vai precisar ter instalado: 
- Node.js (versão recomendada: >= 18)
- npm ou yarn

---

## Instalação

⚠️ Antes de rodar o app, é necessário configurar e executar o back-end:

🔗 https://github.com/rafaguima00/parko-server

```bash
# Clone o repositório
git clone https://github.com/rafaguima00/parko-app.git

# Acesse a pasta do projeto
cd parko-app

# Instale as dependências
npm install

# Para rodar no emulador Android
npm run android

# Para rodar no emulador iOS
npm run iOS
```

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione:

STATUS_APP=test
HOST=192.168.15.x

- STATUS_APP: controla o ambiente da aplicação
- HOST: endereço IPv4 da máquina onde o back-end está rodando

## Licença

Este projeto é de uso privado e pertence à Parko.