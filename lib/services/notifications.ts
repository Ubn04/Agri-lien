// Notification Service

interface NotificationData {
  userId: string
  type: 'ORDER' | 'PAYMENT' | 'DELIVERY' | 'PRODUCT' | 'ACCOUNT'
  title: string
  message: string
  data?: Record<string, any>
}

interface SMSData {
  to: string
  message: string
}

interface EmailData {
  to: string
  subject: string
  body: string
  html?: string
}

class NotificationsService {
  async sendNotification(data: NotificationData): Promise<void> {
    // Send in-app notification
    await this.sendInAppNotification(data)

    // Optionally send SMS or email based on user preferences
    // await this.sendSMS(...)
    // await this.sendEmail(...)
  }

  private async sendInAppNotification(data: NotificationData): Promise<void> {
    // Store notification in database
    // Send via WebSocket if user is online
    console.log('Sending in-app notification:', data)
  }

  async sendSMS(data: SMSData): Promise<void> {
    // Integration with SMS gateway (e.g., Africa's Talking)
    try {
      // const response = await fetch('SMS_GATEWAY_URL', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${process.env.SMS_API_KEY}`,
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // })
      
      console.log('SMS sent to:', data.to)
    } catch (error) {
      console.error('Failed to send SMS:', error)
      throw error
    }
  }

  async sendEmail(data: EmailData): Promise<void> {
    // Integration with email service (e.g., SendGrid, AWS SES)
    try {
      // Implementation here
      console.log('Email sent to:', data.to)
    } catch (error) {
      console.error('Failed to send email:', error)
      throw error
    }
  }

  // Specific notification types
  async notifyOrderCreated(orderId: string, userId: string): Promise<void> {
    await this.sendNotification({
      userId,
      type: 'ORDER',
      title: 'Nouvelle commande',
      message: `Votre commande ${orderId} a été créée avec succès`,
      data: { orderId },
    })
  }

  async notifyOrderStatusChange(orderId: string, userId: string, status: string): Promise<void> {
    await this.sendNotification({
      userId,
      type: 'ORDER',
      title: 'Mise à jour de commande',
      message: `Votre commande ${orderId} est maintenant: ${status}`,
      data: { orderId, status },
    })
  }

  async notifyPaymentCompleted(orderId: string, userId: string, amount: number): Promise<void> {
    await this.sendNotification({
      userId,
      type: 'PAYMENT',
      title: 'Paiement confirmé',
      message: `Paiement de ${amount} FCFA pour la commande ${orderId} confirmé`,
      data: { orderId, amount },
    })
  }

  async notifyNewProduct(farmerId: string, buyerIds: string[]): Promise<void> {
    for (const buyerId of buyerIds) {
      await this.sendNotification({
        userId: buyerId,
        type: 'PRODUCT',
        title: 'Nouveau produit disponible',
        message: 'Un fermier que vous suivez a ajouté un nouveau produit',
        data: { farmerId },
      })
    }
  }
}

export const notificationsService = new NotificationsService()
