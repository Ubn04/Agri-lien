'use client'

export default function Error() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Erreur</h2>
      <p>Une erreur s'est produite.</p>
      <button onClick={() => window.location.reload()}>Réessayer</button>
    </div>
  )
}
