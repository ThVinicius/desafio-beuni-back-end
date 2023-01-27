import cartRepository from '../../src/repositories/cartRepository'
import productRepository from '../../src/repositories/productRepository'
import cartService from '../../src/services/cartService'
import { cartDbFactory, queryCart } from '../factory/cartFactory'
import { productDbFactory } from '../factory/productFactory'

describe('testes da função add', () => {
  it('deve passar caso passe um produto existente e com estoque', async () => {
    const cart = cartDbFactory()
    const product = productDbFactory()

    jest.spyOn(productRepository, 'findById').mockResolvedValueOnce(product)

    jest.spyOn(cartRepository, 'add').mockResolvedValueOnce(cart)

    const response = await cartService.add(cart)

    expect(response).toEqual(cart)
    expect(productRepository.findById).toBeCalled()
    expect(cartRepository.add).toBeCalled()
  })

  it('não deve passar caso o produto não exista', () => {
    const cart = cartDbFactory()

    jest.spyOn(productRepository, 'findById').mockResolvedValueOnce(null)

    const promise = cartService.add(cart)

    expect(promise).rejects.toEqual({
      code: 'Not Found',
      message: 'produto não encontrado!'
    })
    expect(productRepository.findById).toBeCalled()
  })

  it('não deve passar caso a quantidade seja maior que o estoque', async () => {
    const cart = cartDbFactory()
    cart.quantity = 150
    const product = productDbFactory()

    jest.spyOn(productRepository, 'findById').mockResolvedValueOnce(product)

    const promise = cartService.add(cart)

    expect(promise).rejects.toEqual({
      code: 'Not Acceptable',
      message: 'O estoque desse produto não possui a quantidade solicitada!'
    })
    expect(productRepository.findById).toBeCalled()
  })
})

describe('testes da função findAllByCustomerId', () => {
  it('deve retornar o cart', async () => {
    const cart = [queryCart()]
    const customerId = 1

    jest
      .spyOn(cartRepository, 'findAllByCustomerId')
      .mockResolvedValueOnce(cart)

    const response = await cartService.findAllByCustomerId(customerId)

    expect(response).toEqual(cart)
    expect(cartRepository.findAllByCustomerId).toBeCalled()
  })
})

describe('testes da função remove', () => {
  it('deve remover um produto do carrinho', async () => {
    const cart = cartDbFactory()
    const cartId = 1
    const customerId = 1

    jest.spyOn(cartRepository, 'findById').mockResolvedValueOnce(cart)

    jest.spyOn(cartRepository, 'remove').mockResolvedValueOnce()

    await cartService.remove(cartId, customerId)

    expect(cartRepository.findById).toBeCalled()
    expect(cartRepository.remove).toBeCalled()
  })

  it('não deve remover caso o carrinho não seja encontrado', () => {
    const cartId = 16
    const customerId = 16

    jest.spyOn(cartRepository, 'findById').mockResolvedValueOnce(null)

    const promise = cartService.remove(cartId, customerId)

    expect(promise).rejects.toEqual({
      code: 'Not Found',
      message: 'Não encontrado'
    })
    expect(cartRepository.findById).toBeCalled()
  })

  it('não deve remover caso o cliente tente remover o carrinho de outro cliente ', () => {
    const cart = cartDbFactory()
    const cartId = 2
    const customerId = 2

    jest.spyOn(cartRepository, 'findById').mockResolvedValueOnce(cart)

    const promise = cartService.remove(cartId, customerId)

    expect(cartRepository.findById).toBeCalled()
    expect(promise).rejects.toEqual({
      code: 'Forbidden',
      message: 'Sua autenticação não permite realizar essa operação'
    })
  })
})
