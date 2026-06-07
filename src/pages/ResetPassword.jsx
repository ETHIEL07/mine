import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import styles from './Auth.module.css'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      toast.success('Mot de passe mis à jour ✅')
      navigate('/accueil')
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
          <div className={styles.logo}>Bag<span>Style</span></div>
          <h2 style={{ fontSize: 20, marginBottom: 8 }}>Nouveau mot de passe</h2>
          <p style={{ color: '#666', marginBottom: 24, fontSize: 14 }}>
            Choisissez un nouveau mot de passe pour votre compte.
          </p>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label>Nouveau mot de passe</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={loading}>
              {loading ? '...' : 'Mettre à jour'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}