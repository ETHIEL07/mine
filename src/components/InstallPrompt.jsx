import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function InstallPrompt() {
  const [show, setShow] = useState(false)
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent)
  const isAndroid = /android/i.test(navigator.userAgent)

  useEffect(() => {
    const isStandalone =
      navigator.standalone === true ||
      window.matchMedia('(display-mode: standalone)').matches

    if (isStandalone) return

    const dismissed = localStorage.getItem('install-dismissed')
    if (dismissed) return

    if (isIOS || isAndroid) {
      // Afficher seulement si l'utilisateur est connecté
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) setShow(true)
      })
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
          {isIOS
         ? <>Appuyez sur{' '}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{display:'inline', verticalAlign:'middle', margin:'0 2px'}}>
          <polyline points="16 8 12 4 8 8"/>
          <line x1="12" y1="4" x2="12" y2="16"/>
           <path d="M4 16v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4"/>
        </svg>
             {' '}puis <strong>"Sur l'écran d'accueil"</strong></>
         : <>Appuyez sur <strong>⋮</strong> puis <strong>"Ajouter à l'écran d'accueil"</strong></>
}
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