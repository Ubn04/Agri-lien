function Error({ statusCode }: { statusCode?: number }) {
  return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <h1>{statusCode ? `Erreur ${statusCode}` : 'Erreur'}</h1>
      <p>Une erreur inattendue s&apos;est produite.</p>
      <a href="/" style={{ color: '#16a34a' }}>Retour à l&apos;accueil</a>
    </div>
  )
}

Error.getInitialProps = ({ res, err }: { res?: { statusCode: number }; err?: { statusCode: number } }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
