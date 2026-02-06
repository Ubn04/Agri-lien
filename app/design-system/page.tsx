'use client';

import { useState } from 'react';
import { Button, Input, Select, Badge, Card, CardHeader, CardFooter, Modal, ModalHeader, ModalBody, ModalFooter, Table } from '@/components/design-system';
import { Mail, User, Package, Edit2, Trash2 } from 'lucide-react';

export default function DesignSystemShowcase() {
  const [modalOpen, setModalOpen] = useState(false);

  // Sample data for table
  const tableData = [
    { id: '1', name: 'Jean Kouadio', email: 'jean@example.com', role: 'Agriculteur', status: 'Actif' },
    { id: '2', name: 'Marie Assogba', email: 'marie@example.com', role: 'Acheteur', status: 'Actif' },
    { id: '3', name: 'Paul Dossa', email: 'paul@example.com', role: 'Logistique', status: 'Inactif' },
  ];

  const tableColumns = [
    { key: 'name' as const, label: 'Nom', sortable: true },
    { key: 'email' as const, label: 'Email', sortable: true },
    { 
      key: 'role' as const, 
      label: 'Rôle',
      render: (value: string) => (
        <Badge variant="primary" size="sm">{value}</Badge>
      )
    },
    { 
      key: 'status' as const, 
      label: 'Statut',
      render: (value: string) => (
        <Badge variant={value === 'Actif' ? 'success' : 'warning'} size="sm">
          {value}
        </Badge>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-agri-green-50/20 py-12">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        {/* Header */}
        <div className="text-center">
          <div className="inline-block px-4 py-2 bg-agri-green-100 text-agri-green-700 rounded-full text-sm font-medium mb-4">
            🎨 Design System
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Agri-Lien Design System
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Composants UI réutilisables pour une expérience cohérente et accessible
          </p>
        </div>

        {/* Buttons */}
        <Card variant="elevated">
          <CardHeader title="Boutons" subtitle="6 variantes × 4 tailles" />
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700 uppercase">Variantes</h4>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="success">Success</Button>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700 uppercase">Tailles</h4>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700 uppercase">États</h4>
              <div className="flex flex-wrap gap-3">
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button fullWidth>Full Width</Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Inputs */}
        <Card variant="elevated">
          <CardHeader title="Champs de saisie" subtitle="Input, Select avec validation" />
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Nom complet"
              placeholder="Ex: Jean Kouadio"
              leftIcon={<User className="h-5 w-5" />}
              required
            />
            <Input
              label="Email"
              type="email"
              placeholder="nom@example.com"
              leftIcon={<Mail className="h-5 w-5" />}
              helperText="Nous ne partagerons jamais votre email"
            />
            <Input
              label="Avec erreur"
              error="Ce champ est obligatoire"
              placeholder="Champ invalide"
            />
            <Select
              label="Département"
              options={[
                { value: '', label: 'Sélectionner...' },
                { value: 'atlantique', label: 'Atlantique' },
                { value: 'zou', label: 'Zou' },
                { value: 'borgou', label: 'Borgou' },
              ]}
              required
            />
          </div>
        </Card>

        {/* Badges */}
        <Card variant="elevated">
          <CardHeader title="Badges" subtitle="Indicateurs de statut et catégories" />
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700 uppercase">Variantes</h4>
              <div className="flex flex-wrap gap-3">
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700 uppercase">Avec point indicateur</h4>
              <div className="flex flex-wrap gap-3">
                <Badge variant="success" dot>En ligne</Badge>
                <Badge variant="warning" dot>En attente</Badge>
                <Badge variant="error" dot>Hors ligne</Badge>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700 uppercase">Tailles</h4>
              <div className="flex flex-wrap items-center gap-3">
                <Badge size="sm">Small</Badge>
                <Badge size="md">Medium</Badge>
                <Badge size="lg">Large</Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card variant="default">
            <CardHeader title="Card Default" subtitle="Style standard" />
            <p className="text-gray-600">Contenu de la carte avec bordure et ombre légère.</p>
          </Card>

          <Card variant="bordered">
            <CardHeader title="Card Bordered" subtitle="Bordure accentuée" />
            <p className="text-gray-600">Carte avec bordure verte pour mise en avant.</p>
          </Card>

          <Card variant="elevated">
            <CardHeader 
              title="Card Elevated" 
              subtitle="Ombre prononcée"
              action={<Button size="sm" variant="outline">Action</Button>}
            />
            <p className="text-gray-600">Carte avec ombre forte pour du contenu important.</p>
            <CardFooter>
              <Button size="sm" variant="primary">Confirmer</Button>
              <Button size="sm" variant="ghost">Annuler</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Modal */}
        <Card variant="elevated">
          <CardHeader title="Modal" subtitle="Dialogs et confirmations" />
          <Button onClick={() => setModalOpen(true)}>
            Ouvrir la Modal
          </Button>

          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} size="md">
            <ModalHeader 
              title="Exemple de Modal" 
              subtitle="Avec header, body et footer"
              onClose={() => setModalOpen(false)}
            />
            <ModalBody>
              <div className="space-y-4">
                <Input label="Nom" placeholder="Votre nom" fullWidth />
                <Input label="Email" type="email" placeholder="votre@email.com" fullWidth />
                <Select
                  label="Catégorie"
                  options={[
                    { value: '', label: 'Choisir...' },
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                  ]}
                  fullWidth
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={() => setModalOpen(false)}>
                Annuler
              </Button>
              <Button variant="primary" onClick={() => setModalOpen(false)}>
                Enregistrer
              </Button>
            </ModalFooter>
          </Modal>
        </Card>

        {/* Table */}
        <Card variant="elevated">
          <CardHeader title="Table" subtitle="Avec tri, pagination et actions" />
          <Table
            data={tableData}
            columns={tableColumns}
            pagination={true}
            itemsPerPage={5}
          />
        </Card>

        {/* Documentation Link */}
        <div className="text-center">
          <Card variant="bordered" padding="lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              📖 Documentation Complète
            </h3>
            <p className="text-gray-600 mb-6">
              Consultez la documentation complète pour découvrir toutes les fonctionnalités, 
              guidelines d'accessibilité et exemples d'implémentation.
            </p>
            <Button variant="primary" size="lg">
              Voir la Documentation
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
