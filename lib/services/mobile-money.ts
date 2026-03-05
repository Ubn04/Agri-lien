// Mobile Money Integration Service
// Supports MTN Mobile Money, Moov Money, and Celtiis

interface MobileMoneyPaymentRequest {
  amount: number
  phoneNumber: string
  reference: string
  description: string
}

interface MobileMoneyPaymentResponse {
  transactionId: string
  status: 'PENDING' | 'SUCCESS' | 'FAILED'
  message: string
  paymentUrl?: string
}

class MobileMoneyService {
  private readonly apiUrl = process.env.MOBILE_MONEY_API_URL
  private readonly apiKey = process.env.MOBILE_MONEY_API_KEY

  // MTN Mobile Money
  async initiateMTNPayment(data: MobileMoneyPaymentRequest): Promise<MobileMoneyPaymentResponse> {
    try {
      // MTN MoMo API integration
      const response = await fetch(`${this.apiUrl}/mtn/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'X-Target-Environment': process.env.MTN_ENVIRONMENT || 'sandbox',
        },
        body: JSON.stringify({
          amount: data.amount,
          currency: 'XOF',
          externalId: data.reference,
          payer: {
            partyIdType: 'MSISDN',
            partyId: data.phoneNumber,
          },
          payerMessage: data.description,
          payeeNote: data.description,
        }),
      })

      if (!response.ok) {
        throw new Error('MTN payment initiation failed')
      }

      const result = await response.json()

      return {
        transactionId: result.referenceId,
        status: 'PENDING',
        message: 'Veuillez composer *133# et entrer votre code PIN pour confirmer le paiement',
      }
    } catch (error) {
      console.error('MTN payment error:', error)
      throw error
    }
  }

  async checkMTNPaymentStatus(transactionId: string): Promise<{ status: string; message: string }> {
    try {
      const response = await fetch(`${this.apiUrl}/mtn/status/${transactionId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'X-Target-Environment': process.env.MTN_ENVIRONMENT || 'sandbox',
        },
      })

      const result = await response.json()

      return {
        status: result.status, // PENDING, SUCCESSFUL, FAILED
        message: result.reason || 'Transaction en cours',
      }
    } catch (error) {
      console.error('MTN status check error:', error)
      throw error
    }
  }

  // Moov Money
  async initiateMoovPayment(data: MobileMoneyPaymentRequest): Promise<MobileMoneyPaymentResponse> {
    try {
      // Moov Money API integration
      const response = await fetch(`${this.apiUrl}/moov/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          amount: data.amount,
          phone: data.phoneNumber,
          reference: data.reference,
          description: data.description,
        }),
      })

      if (!response.ok) {
        throw new Error('Moov payment initiation failed')
      }

      const result = await response.json()

      return {
        transactionId: result.transactionId,
        status: 'PENDING',
        message: 'Veuillez composer #155*4# et entrer votre code PIN pour confirmer le paiement',
      }
    } catch (error) {
      console.error('Moov payment error:', error)
      throw error
    }
  }

  // Celtiis Cash
  async initiateCeltiisPayment(data: MobileMoneyPaymentRequest): Promise<MobileMoneyPaymentResponse> {
    try {
      // Celtiis API integration
      const response = await fetch(`${this.apiUrl}/celtiis/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          amount: data.amount,
          phone: data.phoneNumber,
          reference: data.reference,
          description: data.description,
        }),
      })

      if (!response.ok) {
        throw new Error('Celtiis payment initiation failed')
      }

      const result = await response.json()

      return {
        transactionId: result.transactionId,
        status: 'PENDING',
        message: 'Veuillez composer *555# et entrer votre code PIN pour confirmer le paiement',
      }
    } catch (error) {
      console.error('Celtiis payment error:', error)
      throw error
    }
  }

  // Generic payment method that detects provider from phone number
  async initiatePayment(
    provider: 'MTN_MOMO' | 'MOOV_MONEY' | 'CELTIIS',
    data: MobileMoneyPaymentRequest
  ): Promise<MobileMoneyPaymentResponse> {
    switch (provider) {
      case 'MTN_MOMO':
        return this.initiateMTNPayment(data)
      case 'MOOV_MONEY':
        return this.initiateMoovPayment(data)
      case 'CELTIIS':
        return this.initiateCeltiisPayment(data)
      default:
        throw new Error('Unsupported payment provider')
    }
  }

  // Detect provider from phone number prefix
  detectProvider(phoneNumber: string): 'MTN_MOMO' | 'MOOV_MONEY' | 'CELTIIS' | null {
    // Remove country code and spaces
    const phone = phoneNumber.replace(/\+229|\s/g, '')

    // MTN Benin prefixes: 96, 97, 61, 62, 66, 67
    if (/^(96|97|61|62|66|67)/.test(phone)) {
      return 'MTN_MOMO'
    }

    // Moov Benin prefixes: 98, 99, 60, 69
    if (/^(98|99|60|69)/.test(phone)) {
      return 'MOOV_MONEY'
    }

    // Celtiis prefixes: 95
    if (/^95/.test(phone)) {
      return 'CELTIIS'
    }

    return null
  }

  // Validate phone number format
  validatePhoneNumber(phoneNumber: string): boolean {
    // Benin phone number format: +229 XX XX XX XX or XX XX XX XX
    const regex = /^(\+229)?[0-9]{8}$/
    return regex.test(phoneNumber.replace(/\s/g, ''))
  }

  // Process refund
  async processRefund(transactionId: string, amount: number): Promise<void> {
    try {
      await fetch(`${this.apiUrl}/refund`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          transactionId,
          amount,
        }),
      })
    } catch (error) {
      console.error('Refund error:', error)
      throw error
    }
  }
}

export const mobileMoneyService = new MobileMoneyService()
