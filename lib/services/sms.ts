// SMS Service for sending notifications via Africa's Talking or similar providers

interface SMSMessage {
  to: string | string[]
  message: string
  from?: string
}

interface SMSResponse {
  messageId: string
  status: 'sent' | 'failed'
  recipients: number
}

class SMSService {
  private readonly apiUrl = process.env.SMS_API_URL || 'https://api.africastalking.com/version1'
  private readonly apiKey = process.env.SMS_API_KEY
  private readonly username = process.env.SMS_USERNAME
  private readonly from = process.env.SMS_FROM || 'Agri-Lien'

  async sendSMS(data: SMSMessage): Promise<SMSResponse> {
    try {
      const recipients = Array.isArray(data.to) ? data.to.join(',') : data.to

      const response = await fetch(`${this.apiUrl}/messaging`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'apiKey': this.apiKey || '',
          'Accept': 'application/json',
        },
        body: new URLSearchParams({
          username: this.username || '',
          to: recipients,
          message: data.message,
          from: data.from || this.from,
        }),
      })

      if (!response.ok) {
        throw new Error('SMS sending failed')
      }

      const result = await response.json()

      return {
        messageId: result.SMSMessageData?.Message || '',
        status: 'sent',
        recipients: result.SMSMessageData?.Recipients?.length || 0,
      }
    } catch (error) {
      console.error('SMS sending error:', error)
      throw error
    }
  }

  // Template methods for common notifications
  async sendOrderConfirmation(phoneNumber: string, orderNumber: string, totalAmount: number): Promise<void> {
    const message = `Votre commande ${orderNumber} a été confirmée. Montant: ${totalAmount} FCFA. Merci d'utiliser Agri-Lien!`
    
    await this.sendSMS({
      to: phoneNumber,
      message,
    })
  }

  async sendOrderStatusUpdate(phoneNumber: string, orderNumber: string, status: string): Promise<void> {
    const statusMessages: Record<string, string> = {
      CONFIRMED: 'confirmée',
      IN_PROGRESS: 'en cours de préparation',
      SHIPPED: 'expédiée',
      DELIVERED: 'livrée',
      CANCELLED: 'annulée',
    }

    const message = `Votre commande ${orderNumber} est maintenant ${statusMessages[status] || status}. Agri-Lien`
    
    await this.sendSMS({
      to: phoneNumber,
      message,
    })
  }

  async sendPaymentConfirmation(phoneNumber: string, amount: number, orderNumber: string): Promise<void> {
    const message = `Paiement de ${amount} FCFA reçu pour la commande ${orderNumber}. Merci! Agri-Lien`
    
    await this.sendSMS({
      to: phoneNumber,
      message,
    })
  }

  async sendDeliveryNotification(phoneNumber: string, orderNumber: string, estimatedTime: string): Promise<void> {
    const message = `Votre commande ${orderNumber} est en route! Livraison estimée: ${estimatedTime}. Agri-Lien`
    
    await this.sendSMS({
      to: phoneNumber,
      message,
    })
  }

  async sendOTP(phoneNumber: string, code: string): Promise<void> {
    const message = `Votre code de vérification Agri-Lien est: ${code}. Valide pendant 10 minutes.`
    
    await this.sendSMS({
      to: phoneNumber,
      message,
    })
  }

  async sendWelcomeMessage(phoneNumber: string, firstName: string): Promise<void> {
    const message = `Bienvenue sur Agri-Lien ${firstName}! Connectez les agriculteurs aux marchés du Bénin. Pour assistance: +229 XX XX XX XX`
    
    await this.sendSMS({
      to: phoneNumber,
      message,
    })
  }

  async sendProductAlert(phoneNumbers: string[], productName: string, farmerName: string): Promise<void> {
    const message = `Nouveau produit disponible: ${productName} de ${farmerName}. Commandez maintenant sur Agri-Lien!`
    
    await this.sendSMS({
      to: phoneNumbers,
      message,
    })
  }

  // Bulk SMS for marketing
  async sendBulkSMS(phoneNumbers: string[], message: string): Promise<SMSResponse[]> {
    const chunkSize = 100 // Send in batches of 100
    const chunks = []
    
    for (let i = 0; i < phoneNumbers.length; i += chunkSize) {
      chunks.push(phoneNumbers.slice(i, i + chunkSize))
    }

    const results = []
    for (const chunk of chunks) {
      const result = await this.sendSMS({
        to: chunk,
        message,
      })
      results.push(result)
    }

    return results
  }

  // Check SMS balance (if supported by provider)
  async checkBalance(): Promise<{ balance: number; currency: string }> {
    try {
      const response = await fetch(`${this.apiUrl}/user?username=${this.username}`, {
        headers: {
          'apiKey': this.apiKey || '',
          'Accept': 'application/json',
        },
      })

      const result = await response.json()

      return {
        balance: parseFloat(result.UserData?.balance || '0'),
        currency: 'XOF',
      }
    } catch (error) {
      console.error('Balance check error:', error)
      throw error
    }
  }
}

export const smsService = new SMSService()
