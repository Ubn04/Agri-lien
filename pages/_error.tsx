import React from 'react'
import type { NextPageContext } from 'next'

interface ErrorProps {
  statusCode?: number
}

export default class ErrorPage extends React.Component<ErrorProps> {
  static getInitialProps({ res, err }: NextPageContext): ErrorProps {
    const statusCode = res?.statusCode ?? err?.statusCode ?? 404
    return { statusCode }
  }

  render() {
    const { statusCode } = this.props

    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h1>{statusCode ? `Erreur ${statusCode}` : 'Erreur'}</h1>
        <p>Une erreur inattendue s&apos;est produite.</p>
        <a href="/" style={{ color: '#16a34a' }}>Retour à l&apos;accueil</a>
      </div>
    )
  }
}
