# Desafio beUni

<div align="center">

<h3>Construído com</h3>

  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" height="30px"/>
  <img src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" height="30px"/>

  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<br/>

# Sumário

- [Descrição](#description)
- [Deploy](#deploy)
- [Documentação da API](#api-reference)
  - [Rotas de autenticação](#auth-routes)
    - [Criar uma conta](#sign-up)
    - [Acessar uma conta](#sign-in)
  - [Rota dos produtos](#product-routes)
    - [Buscar todos os produtos](#get-products)
  - [Rotas do carrinho](#cart-routes)
    - [Adicionar um produto ao carrinho](#post-carts)
    - [Buscar o carrinho do cliente](#get-carts)
    - [Remover um produto do carrinho](#delete-carts)
  - [Rotas do pedido](#order-routes)
    - [Criar um pedido](#post-orders)
    - [Buscar todos os pedidos do cliente](#get-orders)
- [Rodar localmente](#run-local)
- [Rodar com docker](#run-docker)
- [Rodar os testes](#run-tests)

<div id='description'/>

# Descrição

Desafio técnico do processo seletivo da beUni.

</br>

## Funções

- Criar uma conta
- Acessar uma conta
- Buscar todos os produtos
- Colocar um produto no carrinho
- Remover um produto do carrinho
- Fazer pedidos dos produtos dentro do carrinho
- Vizualizar os pedidos

</br>

<div id='deploy'/>

# Deploy

- [Link Deploy BackEnd](https://desafio-beuni-back-end-production.up.railway.app/)

<div id='api-reference'/>

# Documentação da API

<div id='auth-routes'/>

## Rotas de autenticação

<div id='sign-up'/>

### Criar uma conta

```http
POST /sign-up
```

<h3>Mandar pelo body da requisição:</h3>

| Parâmetro         | Tipo     | Descrição                              |
| :---------------- | :------- | :------------------------------------- |
| `nickname`        | `string` | **Obrigatório**, **não vazio**         |
| `password`        | `string` | **Obrigatório**, **não vazio**         |
| `confirmPassword` | `string` | **Obrigatório**, **igual ao password** |

<h2>Respostas:</h2>

<h3>Em caso de erro:</h3>

| Status code | Causa                                                    |
| :---------- | :------------------------------------------------------- |
| `400`       | _Requisição no formato incorreto_                        |
| `409`       | _Conflito entre nickname (cada nickname deve ser único)_ |

<h3>Em caso de sucesso:</h3>

- Status code: 201

#

<div id='sign-in'/>

### Acessar uma conta

```http
POST /sign-in
```

<h3>Mandar pelo body da requisição:</h3>

| Parâmetro  | Tipo     | Descrição                      |
| :--------- | :------- | :----------------------------- |
| `nickname` | `string` | **Obrigatório**, **não vazio** |
| `password` | `string` | **Obrigatório**, **não vazio** |

<h2>Respostas:</h2>

<h3>Em caso de erro:</h3>

| Status code | Causa                             |
| :---------- | :-------------------------------- |
| `400`       | _Requisição no formato incorreto_ |
| `401`       | _nickname ou password incorreto_  |

<h3>Em caso de sucesso:</h3>

- Status code: 200
- Um token JWT para poder acessar as outras rotas

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc0NzQ4NTg1fQ.5nesfQCR2I3IXb9KgukFUazA9mHjKsVEIHTImu9XXJA"
}
```

#

<div id='product-routes'/>

## Rota dos produtos

<div id='get-products'/>

### Buscar todos os produtos

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

<div id='cart-routes'/>

## Rotas do carrinho

<div id='post-carts'/>

### Adicionar um produto ao carrinho

```http
POST /carts
```

<h3>Mandar pelo body da requisição:</h3>

| Parâmetro   | Tipo     | Descrição                        |
| :---------- | :------- | :------------------------------- |
| `productId` | `number` | **Obrigatório**, **maior que 0** |
| `quantity`  | `number` | **Obrigatório**, **maior que 0** |

<h3>Mandar pelo headers da requisição:</h3>
Mandar o token jwt no headers da requisição da seguinte forma: `Bearer tokenJWT`

| Parâmetro        | Tipo     | Descrição                                 |
| :--------------- | :------- | :---------------------------------------- |
| `authentication` | `string` | **Obrigatório**, **começando com Bearer** |

<h2>Respostas:</h2>

<h3>Em caso de erro:</h3>

| Status code | Causa                                       |
| :---------- | :------------------------------------------ |
| `400`       | _Requisição no formato incorreto_           |
| `401`       | _Token inválido_                            |
| `406`       | _Não possui a quantidade pedida no estoque_ |

<h3>Em caso de sucesso:</h3>

- Status code: 201
- Dados do pedido

```json
{
  "id": 23,
  "productId": 33,
  "customerId": 1,
  "quantity": 50,
  "totalPrice": 670.5
}
```

#

<div id='get-carts'/>

### Buscar o carrinho do cliente

```http
GET /carts
```

<h3>Mandar pelo headers da requisição:</h3>
Mandar o token jwt no headers da requisição da seguinte forma: `Bearer tokenJWT`

| Parâmetro        | Tipo     | Descrição                                 |
| :--------------- | :------- | :---------------------------------------- |
| `authentication` | `string` | **Obrigatório**, **começando com Bearer** |

<h2>Respostas:</h2>

<h3>Em caso de erro:</h3>

| Status code | Causa                             |
| :---------- | :-------------------------------- |
| `400`       | _Requisição no formato incorreto_ |
| `401`       | _Token inválido_                  |

<h3>Em caso de sucesso:</h3>

- Status code: 200
- O carrinho do cliente

```json
[
  {
    "cartId": 23,
    "productId": 33,
    "name": "Caderno capa dura MEYER",
    "image": "https://dl.airtable.com/.attachments/1d412a9be1c6cb5d7a24214579fa5e7a/c22a967f/MEYER.jpeg",
    "quantity": 50,
    "totalPrice": 670.5
  }
]
```

#

<div id='delete-carts'/>

### Remover um produto do carrinho

```http
DELETE /carts/:id
```

<h3>Mandar pelo params da requisição:</h3>
Mandar o id do carrinho. Ex: http://localhost:4000/carts/23

| Parâmetro | Tipo     | Descrição                        |
| :-------- | :------- | :------------------------------- |
| `id`      | `string` | **Obrigatório**, **maior que 0** |

<h3>Mandar pelo headers da requisição:</h3>
Mandar o token jwt no headers da requisição da seguinte forma: `Bearer tokenJWT`

| Parâmetro        | Tipo     | Descrição                                 |
| :--------------- | :------- | :---------------------------------------- |
| `authentication` | `string` | **Obrigatório**, **começando com Bearer** |

<h2>Respostas:</h2>

<h3>Em caso de erro:</h3>

| Status code | Causa                                      |
| :---------- | :----------------------------------------- |
| `400`       | _Requisição no formato incorreto_          |
| `401`       | _Token inválido_                           |
| `403`       | _Tentar deletar um carrinho que não é seu_ |
| `404`       | _Carrinho não encontrado_                  |

<h3>Em caso de sucesso:</h3>

- Status code: 200

#

<div id='order-routes'/>

## Rotas do pedido

<div id='post-orders'/>

### Criar um pedido

```http
POST /orders
```

<h3>Mandar pelo headers da requisição:</h3>
Mandar o token jwt no headers da requisição da seguinte forma: `Bearer tokenJWT`

| Parâmetro        | Tipo     | Descrição                                 |
| :--------------- | :------- | :---------------------------------------- |
| `authentication` | `string` | **Obrigatório**, **começando com Bearer** |

<h2>Respostas:</h2>

<h3>Em caso de erro:</h3>

| Status code | Causa                                       |
| :---------- | :------------------------------------------ |
| `400`       | _Requisição no formato incorreto_           |
| `401`       | _Token inválido_                            |
| `406`       | _Não possui a quantidade pedida no estoque_ |

<h3>Em caso de sucesso:</h3>

- Status code: 201

#

<div id='get-orders'/>

### Buscar todos os pedidos do cliente

```http
GET /orders
```

<h3>Mandar pelo headers da requisição:</h3>
Mandar o token jwt no headers da requisição da seguinte forma: `Bearer tokenJWT`

| Parâmetro        | Tipo     | Descrição                                 |
| :--------------- | :------- | :---------------------------------------- |
| `authentication` | `string` | **Obrigatório**, **começando com Bearer** |

<h2>Respostas:</h2>

<h3>Em caso de erro:</h3>

| Status code | Causa                             |
| :---------- | :-------------------------------- |
| `400`       | _Requisição no formato incorreto_ |
| `401`       | _Token inválido_                  |

<h3>Em caso de sucesso:</h3>

- Status code: 200
- Um array com todos os pedidos do cliente

```json
[
  {
    "orderDate": "26/01/2023 - 20:26:48",
    "totalPrice": 482.904,
    "products": [
      {
        "orderId": 7,
        "productId": 81,
        "name": "Lápis RIZZOLI",
        "image": "https://dl.airtable.com/.attachments/73d1d5135c24be278215858974c6ed09/14aaeb81/51738_set.jpg",
        "totalPrice": 255.474,
        "quantity": 50
      },
      {
        "orderId": 6,
        "productId": 80,
        "name": "Esferográfica MILU FROST",
        "image": "https://dl.airtable.com/.attachments/466f95ee843f12590db4b8f0c95007cd/da8df754/81109_set.jpg",
        "totalPrice": 227.43,
        "quantity": 50
      }
    ]
  },
  {
    "orderDate": "27/01/2023 - 08:52:12",
    "totalPrice": 4527.576,
    "products": [
      {
        "orderId": 10,
        "productId": 78,
        "name": "Esferográfica JACKY",
        "image": "https://dl.airtable.com/.attachments/e7c7c19d70991a85fe7af7d1bc5797dd/42c0e77a/81119_set.jpg",
        "totalPrice": 286.995,
        "quantity": 50
      },
      {
        "orderId": 11,
        "productId": 79,
        "name": "Mini lápis BARTER",
        "image": "https://dl.airtable.com/.attachments/699ca6760c06e4ca0478ec6c358e90e9/4b0637da/51759_set.jpg",
        "totalPrice": 241.11,
        "quantity": 50
      },
      {
        "orderId": 13,
        "productId": 83,
        "name": "Caderno capa dura MEYER",
        "image": "https://dl.airtable.com/.attachments/1d412a9be1c6cb5d7a24214579fa5e7a/c22a967f/MEYER.jpeg",
        "totalPrice": 670.5,
        "quantity": 50
      },
      {
        "orderId": 12,
        "productId": 81,
        "name": "Lápis RIZZOLI",
        "image": "https://dl.airtable.com/.attachments/73d1d5135c24be278215858974c6ed09/14aaeb81/51738_set.jpg",
        "totalPrice": 2554.74,
        "quantity": 500
      },
      {
        "orderId": 8,
        "productId": 94,
        "name": "Caderno B7 BULFINCH",
        "image": "https://dl.airtable.com/.attachments/9d193602492f1f77d4ad352e555a55e2/9e264a4b/93461_set.jpg",
        "totalPrice": 518.757,
        "quantity": 50
      },
      {
        "orderId": 9,
        "productId": 76,
        "name": "Lápis CORNWELL",
        "image": "https://dl.airtable.com/.attachments/a4bbed28c780b32af7c1ceace753b796/6c9de3f1/51716_set1.jpg",
        "totalPrice": 255.474,
        "quantity": 50
      }
    ]
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

Crie o arquivo `.env` no diretório raiz do projeto com as seguintes variaveis:

- `DATABASE_URL=postgres://{user}:{password}@localhost:5432/desafio_beuni`
- `JWT_SECRET=qualquer_coisa`

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

Crie o arquivo `.env` no diretório raiz do projeto com as seguintes variaveis:

- `DATABASE_URL=postgres://{user}:{password}@localhost:5432/desafio_beuni`
- `JWT_SECRET=qualquer_coisa`

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
