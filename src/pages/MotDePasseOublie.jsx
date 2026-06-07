import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import styles from './Auth.module.css'

export default function MotDePasseOublie() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (error) throw error
      setSent(true)
      toast.success('Email envoyé !')
    } catch (err) {
      toast.error(err.message || 'Erreur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page-layout">
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <Link to="/connexion" className={styles.logo}>
            Bag<span>Style</span>
          </Link>

          {sent ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📧</div>
              <h2 style={{ fontSize: 20, marginBottom: 8 }}>Email envoyé !</h2>
              <p style={{ color: '#666', marginBottom: 24 }}>
                Vérifiez votre boîte mail et cliquez sur le lien pour réinitialiser votre mot de passe.
              </p>
              <Link to="/connexion" className="btn btn-primary">Retour à la connexion</Link>
            </div>
          ) : (
            <>
              <h2 style={{ fontSize: 20, marginBottom: 8 }}>Mot de passe oublié</h2>
              <p style={{ color: '#666', marginBottom: 24, fontSize: 14 }}>
                Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
              </p>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                  <label>Email</label>
                  <div className={styles.inputWrap}>
                    <Mail size={16} className={styles.inputIcon} />
                    <input
                      type="email"
                      placeholder="vous@exemple.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      style={{ paddingLeft: '38px' }}
                    />
                  </div>
                </div>
                <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={loading}>
                  {loading ? '...' : 'Envoyer le lien'}
                </button>
              </form>
              <p style={{ textAlign: 'center', marginTop: 16, fontSize: 14 }}>
                <Link to="/connexion" style={{ color: '#d4537e' }}>← Retour à la connexion</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  )
}