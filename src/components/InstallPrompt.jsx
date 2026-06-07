import { useEffect, useState } from 'react'

export default function InstallPrompt() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const ua = navigator.userAgent
    const isIOS = /iphone|ipad|ipod/i.test(ua)
    const isStandalone =
      navigator.standalone === true ||
      window.matchMedia('(display-mode: standalone)').matches

    // Afficher seulement sur iOS et seulement si pas encore installé
    if (isIOS && !isStandalone) {
      // Ne pas afficher si l'utilisateur a déjà fermé la bannière
      const dismissed = localStorage.getItem('install-dismissed')
      if (!dismissed) setShow(true)
    }
  }, [])

  if (!show) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 80,
      left: 16,
      right: 16,
      background: 'white',
      borderRadius: 16,
      padding: '16px 20px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      border: '1px solid #f0d0db',
    }}>
      <img src="/icon-192.png" width={44} height={44} style={{ borderRadius: 10, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: '#1a1a1a', marginBottom: 4 }}>
          Installer BagStyle
        </div>
        <div style={{ fontSize: 13, color: '#666', lineHeight: 1.4 }}>
          Appuyez sur <strong>⬆️</strong> puis <strong>"Sur l'écran d'accueil"</strong> pour utiliser l'app sans navigateur.
        </div>
      </div>
      <button
        onClick={() => {
          localStorage.setItem('install-dismissed', '1')
          setShow(false)
        }}
        style={{
          background: 'none',
          border: 'none',
          fontSize: 20,
          color: '#aaa',
          cursor: 'pointer',
          padding: 0,
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        ✕
      </button>
    </div>
  )
}