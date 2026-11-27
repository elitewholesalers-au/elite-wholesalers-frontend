import type { CartEntityPayload } from '~/types/product'
import type { DeliveryMethod } from '~/types/enums'
import ApiService from './api.service'

export const CartService = {
  async getUserCart() {
    return await ApiService.run({ method: ApiService.GET, url: '/cart' })
  },
  async createUserCart(data: CartEntityPayload) {
    return await ApiService.run({ method: ApiService.POST, url: '/cart', data })
  },
  async initializeCheckout(data: { delivery_method: DeliveryMethod; promo_code?: string }) {
    return await ApiService.run({ method: ApiService.POST, url: '/cart/checkout', data })
  },
  async previewCheckout(data: { delivery_method: DeliveryMethod; promo_code?: string }) {
    return await ApiService.run({ method: ApiService.POST, url: '/cart/checkout/preview', data })
  },
  async prepareCheckout(data: { delivery_method: DeliveryMethod; promo_code?: string }) {
    if (typeof window === 'undefined' ||
        window.location.hostname !== 'elite-wholesalers-frontend-staging.up.railway.app') {
      throw new Error('Payment preparation test is restricted to staging')
    }
    return await ApiService.run({ method: ApiService.POST, url: '/cart/checkout/prepare', data })
  },
  async updateUserCart(cartId: string, data: { quantity: number }) {
    return await ApiService.run({ method: ApiService.PATCH, url: `/cart/${cartId}`, data })
  },
  async removeCart(cartId: string) {
    return await ApiService.run({ method: ApiService.DELETE, url: `/cart/${cartId}` })
  },
  async deleteCart() {
    return await ApiService.run({ method: ApiService.DELETE, url: '/cart/' })
  }
}
