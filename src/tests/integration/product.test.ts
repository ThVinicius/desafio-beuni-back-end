import agent from '../config/supertestConfig'

describe('GET /products tests', () => {
  it('deve retornar todos os produtos cadastrados', async () => {
    const productsCount = 50
    const OK = 200

    const { status, body } = await agent.get('/products')

    expect(status).toEqual(OK)
    expect(body.length).toEqual(productsCount)
  })

  it('deve retornar todos os produtos que possuem camiseta no nome', async () => {
    const expectedReturn = 9
    const OK = 200

    const { status, body } = await agent.get('/products?name=camiseta')

    expect(status).toEqual(OK)
    expect(body.length).toEqual(expectedReturn)
  })
})
