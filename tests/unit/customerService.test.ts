import customerRepository from '../../src/repositories/customerRepository'
import customerService from '../../src/services/customerService'
import {
  customerWithId,
  customerWithPasswordEncrypt
} from '../factory/customerFactory'

describe('testes da função add', () => {
  it('deve cadastrar um cliente', async () => {
    const customer = customerWithId()

    jest.spyOn(customerRepository, 'add').mockResolvedValueOnce(customer)

    await customerService.add(customer)

    expect(customerRepository.add).toBeCalled()
  })
})

describe('testes da função handleSignIn', () => {
  it('deve retornar um token caso seja passado um cliente válido', async () => {
    const customer = { nickname: 'test', password: '123' }

    jest
      .spyOn(customerRepository, 'findByNickname')
      .mockResolvedValueOnce(customerWithPasswordEncrypt())

    const response = await customerService.handleSignIn(customer)

    expect(customerRepository.findByNickname).toBeCalled()
    expect(typeof response).toBe('string')
  })

  it('deve lancar um erro caso o nickname esteja incorreto', async () => {
    const customer = customerWithId()

    jest.spyOn(customerRepository, 'findByNickname').mockResolvedValueOnce(null)

    const promise = customerService.handleSignIn(customer)

    expect(customerRepository.findByNickname).toBeCalled()

    expect(promise).rejects.toEqual({
      code: 'Unauthorized',
      message: 'nickname ou senha incorreta'
    })
  })

  it('deve lancar um erro caso a senha esteja incorreta', async () => {
    const customer = customerWithId()
    customer.password = 'senha errada'

    jest
      .spyOn(customerRepository, 'findByNickname')
      .mockResolvedValueOnce(customer)

    const promise = customerService.handleSignIn(customer)

    expect(customerRepository.findByNickname).toBeCalled()

    expect(promise).rejects.toEqual({
      code: 'Unauthorized',
      message: 'nickname ou senha incorreta'
    })
  })
})
