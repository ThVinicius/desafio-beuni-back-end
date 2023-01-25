# Desafio beUni

<div align="center">

<h3>Built With</h3>

  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" height="30px"/>

  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<br/>

# Sumário

- [Descrição](#description)
- [Deploy](#deploy)
- [Documentação da API](#api-reference)
  - [Buscar todos os produtos](#get-products)
- [Rodar localmente](#run-local)
- [Rodar com docker](#run-docker)
- [Rodar os testes](#run-tests)

<div id='description'/>

# Descrição

Desafio técnico do processo seletivo da beUni.

</br>

## Funções

- Buscar todos os produtos

</br>

<div id='api-reference'/>

<div id='deploy'/>

# Deploy

- [Link Deploy BackEnd](https://beuni.onrender.com)

<div id='authentication-routes'/>

# Documentação da API

<div id='get-products'/>

## Buscar todos os produtos

```http
GET /products?name={name}
```

<h3>Request:</h3>
Essa rota aceita um query params (name) para buscar apenas os produtos que contenham o parametro passado.
Ex: http://localhost:4000/products?name=lápis

<h3>Response:</h3>

<h3>Em caso de sucesso:</h3>

- Status code: 200
- Um array de produtos

```json
[
  {
    "id": 24,
    "name": "Lápis ATENEO",
    "category": "recZg8UZySB2adS72",
    "description": "Lápis com borracha. Grau de dureza: HB. Dimensões: ø 7 x 190 mm",
    "image": "https://dl.airtable.com/.attachments/f84420f59f09e85dee8c3417de00c6ab/c7f68877/ATENEO.jpg",
    "brand": "reczh2ctSywA3I2Rz",
    "hasFreeShipping": true,
    "rating": 5,
    "minimumQuantity": 50,
    "kitManagerVariations": "recQmqRjRkhDdh76d",
    "stock": 4443753,
    "price": 5.19156
  }
]
```

#

<div id='run-local'/>

# Rodar localmente

Clone o projeto

```bash
  git clone https://github.com/ThVinicius/desafio-beuni-back-end.git
```

Vá para o diretório do projeto

```bash
  cd desafio-beuni-back-end
```

Instale as dependências

```bash
npm i
```

Crie o arquivo `.env` no diretório raiz do projeto com a seguinte variavel:

- `DATABASE_URL=postgres://{user}:{password}@localhost:5432/desafio_beuni`

Crie as tabelas e as sementes do banco de dados

```bash
npm run migrate dev
```

Inice o projeto

```bash
npm run dev
```

<div id='run-docker'/>

# Rodar com docker

Clone o projeto

```bash
  git clone https://github.com/ThVinicius/desafio-beuni-back-end.git
```

Vá para o diretório do projeto

```bash
  cd desafio-beuni-back-end
```

Faça o build do container

```bash
  docker-compose up --build -d
```

Caso queira parar o container basta utilizar o comando

```bash
  docker-compose down
```

<div id='run-tests'/>

# Rodar os testes

## Localmente

Instale as dependências

```bash
npm i
```

Crie o arquivo `.env` no diretório raiz do projeto com a seguinte variavel:

- `DATABASE_URL=postgres://{user}:{password}@localhost:5432/desafio_beuni`

Rode os testes com o comando:

```bash
npm run test
```

## Com o docker

Inicie o docker-compose

```bash
docker-compose up -d
```

Execute o comando

```bash
docker exec back_end_development npm run test
```

</br>

## Acknowledgements

- [Awesome Badges](https://github.com/Envoy-VC/awesome-badges)

</br>
