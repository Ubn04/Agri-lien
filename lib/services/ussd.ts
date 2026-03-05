// USSD Session Management Service

interface USSDSession {
  sessionId: string
  phoneNumber: string
  currentMenu: string
  data: Record<string, any>
  createdAt: Date
}

class USSDService {
  private sessions: Map<string, USSDSession> = new Map()

  async handleUSSDRequest(sessionId: string, phoneNumber: string, input: string): Promise<string> {
    let session = this.sessions.get(sessionId)

    if (!session) {
      // New session
      session = {
        sessionId,
        phoneNumber,
        currentMenu: 'main',
        data: {},
        createdAt: new Date(),
      }
      this.sessions.set(sessionId, session)
      return this.getMainMenu()
    }

    // Handle user input
    return this.processInput(session, input)
  }

  private processInput(session: USSDSession, input: string): string {
    const menu = session.currentMenu

    switch (menu) {
      case 'main':
        return this.handleMainMenu(session, input)
      case 'products':
        return this.handleProductsMenu(session, input)
      case 'categories':
        return this.handleCategoriesMenu(session, input)
      case 'product_detail':
        return this.handleProductDetail(session, input)
      case 'orders':
        return this.handleOrdersMenu(session, input)
      case 'account':
        return this.handleAccountMenu(session, input)
      default:
        return this.getMainMenu()
    }
  }

  private getMainMenu(): string {
    return `CON Bienvenue sur Agri-Lien
1. Voir produits
2. Mes commandes
3. Mon compte
4. Aide
0. Quitter`
  }

  private handleMainMenu(session: USSDSession, input: string): string {
    switch (input) {
      case '1':
        session.currentMenu = 'categories'
        return this.getCategoriesMenu()
      case '2':
        session.currentMenu = 'orders'
        return this.getOrdersMenu()
      case '3':
        session.currentMenu = 'account'
        return this.getAccountMenu()
      case '4':
        return this.getHelpMenu()
      case '0':
        return 'END Merci d\'avoir utilisé Agri-Lien'
      default:
        return 'END Option invalide'
    }
  }

  private getCategoriesMenu(): string {
    return `CON Choisissez une catégorie:
1. Légumes
2. Fruits
3. Céréales
4. Tubercules
5. Épices
0. Retour`
  }

  private handleCategoriesMenu(session: USSDSession, input: string): string {
    const categories: Record<string, string> = {
      '1': 'VEGETABLES',
      '2': 'FRUITS',
      '3': 'CEREALS',
      '4': 'TUBERS',
      '5': 'SPICES',
    }

    if (input === '0') {
      session.currentMenu = 'main'
      return this.getMainMenu()
    }

    const category = categories[input]
    if (category) {
      session.data.category = category
      session.currentMenu = 'products'
      return this.getProductsList(category)
    }

    return 'END Catégorie invalide'
  }

  private getProductsList(category: string): string {
    // In real implementation, fetch from database
    const products: Record<string, string[]> = {
      VEGETABLES: [
        '1. Tomates - 800 FCFA/kg',
        '2. Piment - 1500 FCFA/kg',
        '3. Oignon - 600 FCFA/kg',
      ],
      FRUITS: [
        '1. Ananas - 1200 FCFA/pièce',
        '2. Mangue - 600 FCFA/kg',
      ],
    }

    const list = products[category] || ['Aucun produit disponible']
    return `CON ${list.join('\n')}\n0. Retour`
  }

  private handleProductsMenu(session: USSDSession, input: string): string {
    if (input === '0') {
      session.currentMenu = 'categories'
      return this.getCategoriesMenu()
    }

    session.data.productId = input
    session.currentMenu = 'product_detail'
    return this.getProductDetail(input)
  }

  private getProductDetail(productId: string): string {
    // In real implementation, fetch from database
    return `CON Tomates Bio
Prix: 800 FCFA/kg
Disponible: 50 kg
Fermier: Koffi Mensah
Localisation: Zou

1. Commander
0. Retour`
  }

  private handleProductDetail(session: USSDSession, input: string): string {
    if (input === '1') {
      return `END Commande enregistrée!
Vous recevrez un SMS de confirmation.`
    }

    if (input === '0') {
      session.currentMenu = 'products'
      return this.getProductsList(session.data.category)
    }

    return 'END Option invalide'
  }

  private getOrdersMenu(): string {
    return `CON Mes Commandes:
1. Commandes en cours (2)
2. Historique
0. Retour`
  }

  private handleOrdersMenu(session: USSDSession, input: string): string {
    if (input === '0') {
      session.currentMenu = 'main'
      return this.getMainMenu()
    }

    return 'END Détails de commande à venir'
  }

  private getAccountMenu(): string {
    return `END Mon Compte
Nom: Jean Kouassi
Tél: +229 XX XX XX XX
Solde: 45,000 FCFA`
  }

  private handleAccountMenu(session: USSDSession, input: string): string {
    return 'END Merci'
  }

  private getHelpMenu(): string {
    return `END Aide Agri-Lien
Pour assistance:
Tél: +229 XX XX XX XX
Email: support@agrilien.bj`
  }

  endSession(sessionId: string): void {
    this.sessions.delete(sessionId)
  }

  // Cleanup old sessions (run periodically)
  cleanupSessions(): void {
    const now = new Date()
    const timeout = 5 * 60 * 1000 // 5 minutes

    for (const [sessionId, session] of this.sessions.entries()) {
      if (now.getTime() - session.createdAt.getTime() > timeout) {
        this.sessions.delete(sessionId)
      }
    }
  }
}

export const ussdService = new USSDService()
