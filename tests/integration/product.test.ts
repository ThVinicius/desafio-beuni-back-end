import agent from '../config/supertestConfig'
import { customerTest } from './../../prisma/seed/customerSeed'

describe('GET /products tests', () => {
  it('deve retornar todos os produtos cadastrados', async () => {
    const productsCount = 50
    const OK = 200

    const signIn = await agent.post('/sign-in').send(customerTest)
    const { token } = signIn.body

    const { status, body } = await agent
      .get('/products')
      .set('Authorization', `Bearer ${token}`)

    expect(status).toEqual(OK)
    expect(body.length).toEqual(productsCount)
  })

  it('deve retornar todos os produtos que possuem camiseta no nome', async () => {
    const expectedReturn = 9
    const OK = 200

    const signIn = await agent.post('/sign-in').send(customerTest)
    const { token } = signIn.body

    const { status, body } = await agent
      .get('/products?name=camiseta')
      .set('Authorization', `Bearer ${token}`)

    expect(status).toEqual(OK)
    expect(body.length).toEqual(expectedReturn)
  })
})
