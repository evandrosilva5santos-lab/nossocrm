'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { getErrorMessage } from '@/lib/utils/errorUtils'
import { Loader2, Lock, ArrowLeft, AlertTriangle } from 'lucide-react'

const MIN_PASSWORD_LENGTH = 6

/**
 * Componente React `ResetPasswordPage`.
 *
 * Define a nova senha usando a sessão de recuperação criada pelo link do email
 * (o `/auth/callback` já trocou o `code` por sessão antes de redirecionar para cá).
 *
 * @returns {Element} Retorna um valor do tipo `Element`.
 */
export default function ResetPasswordPage() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [checking, setChecking] = useState(true)
    const [hasSession, setHasSession] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    // Verifica se existe sessão de recuperação válida.
    useEffect(() => {
        if (!supabase) {
            setChecking(false)
            return
        }

        let active = true

        // O evento PASSWORD_RECOVERY cobre o fluxo legado (token no hash da URL),
        // que o browser client processa de forma assíncrona.
        const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!active) return
            if (session) {
                setHasSession(true)
                setChecking(false)
            }
        })

        supabase.auth.getSession().then(({ data }) => {
            if (!active) return
            setHasSession(Boolean(data.session))
            setChecking(false)
        })

        return () => {
            active = false
            subscription.subscription.unsubscribe()
        }
    }, [supabase])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (password.length < MIN_PASSWORD_LENGTH) {
            setError(`A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`)
            return
        }

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.')
            return
        }

        setLoading(true)

        try {
            if (!supabase) {
                throw new Error('Supabase não configurado. Configure as variáveis de ambiente.')
            }

            const { error } = await supabase.auth.updateUser({ password })
            if (error) throw error

            router.push('/dashboard')
        } catch (err) {
            setError(getErrorMessage(err))
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-dark-bg relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-primary-500/20 rounded-full blur-[120px]" />
                <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-md w-full relative z-10 px-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white font-display tracking-tight mb-2">
                        Nova senha
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400">
                        Escolha uma senha para voltar a acessar sua conta.
                    </p>
                </div>

                <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl p-8 backdrop-blur-sm">
                    {checking ? (
                        <div className="flex justify-center py-6">
                            <Loader2 className="animate-spin h-6 w-6 text-slate-400" />
                        </div>
                    ) : !hasSession ? (
                        <div className="text-center space-y-4">
                            <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto" />
                            <p className="text-slate-700 dark:text-slate-200 font-medium">
                                Link inválido ou expirado
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Solicite um novo link de recuperação para continuar.
                            </p>
                            <Link
                                href="/auth/forgot-password"
                                className="inline-flex justify-center items-center py-2.5 px-4 rounded-xl text-sm font-bold text-white bg-primary-600 hover:bg-primary-500 transition-all"
                            >
                                Solicitar novo link
                            </Link>
                        </div>
                    ) : (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                    Nova senha
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        aria-required="true"
                                        aria-describedby={error ? "reset-error" : undefined}
                                        className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all sm:text-sm"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                    Confirmar nova senha
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        id="confirm-password"
                                        name="confirm-password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        aria-required="true"
                                        aria-describedby={error ? "reset-error" : undefined}
                                        className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all sm:text-sm"
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            {error && (
                                <div
                                    id="reset-error"
                                    role="alert"
                                    aria-live="polite"
                                    className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm text-center"
                                >
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-primary-500/20 text-sm font-bold text-white bg-primary-600 hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
                            >
                                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Salvar nova senha'}
                            </button>
                        </form>
                    )}

                    <div className="mt-6 text-center">
                        <Link
                            href="/login"
                            className="inline-flex items-center text-sm text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 transition-colors"
                        >
                            <ArrowLeft className="mr-1.5 h-4 w-4" />
                            Voltar para o login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
