import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { signIn, signUp, resetPassword, error, clearError } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    clearError();
  };

  // --- NOVA FUNÇÃO DE VALIDAÇÃO ---
  const validateForm = () => {
    // 1. Validação de Nome (Apenas no Cadastro)
    if (!isLogin) {
      if (!formData.fullName.trim()) {
        throw new Error('Full name is required');
      }
      if (formData.fullName.trim().length < 3) {
        throw new Error('Full name must be at least 3 characters');
      }
    }

    // 2. Validação de Email (Formato e Preenchimento)
    if (!formData.email.trim()) {
      throw new Error('Email is required');
    }
    // Regex simples e eficaz para validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      throw new Error('Please enter a valid email address (e.g., user@domain.com)');
    }

    // 3. Validação de Senha
    if (!formData.password) {
      throw new Error('Password is required');
    }
    if (formData.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    
    // 4. Confirmação de Senha (Apenas no Cadastro)
    if (!isLogin && formData.password !== formData.confirmPassword) {
      throw new Error('Passwords do not match');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setSuccessMessage('');

    try {
      setLoading(true);
      // Chama a validação antes de tentar enviar ao Supabase
      validateForm();

      if (isLogin) {
        await signIn(formData.email, formData.password);
        navigate('/');
      } else {
        await signUp(formData.email, formData.password, formData.fullName);
        setSuccessMessage('Account created successfully! Check your email to verify.');
        setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
        setTimeout(() => setIsLogin(true), 2000);
      }
    } catch (err) {
      // O erro lançado pelo validateForm cairá aqui e será exibido
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      console.error('Form error:', errorMessage);
      // Força a exibição do erro no estado do AuthContext (ou localmente se preferir)
      // Aqui estamos assumindo que o AuthContext expõe uma forma de setar erro, 
      // mas como o clearError limpa, vamos confiar que o hook trate erros de API.
      // Para erros locais de validação, vamos jogar um alerta ou usar um estado local de erro se o context não suportar set manual.
      // Pelo seu código anterior, o context tem 'error' state, mas não 'setError'. 
      // Vamos usar o throw para interromper o fluxo, e exibir o erro localmente se necessário.
      // *AJUSTE*: Como seu hook pode não ter um setError exposto publicamente, 
      // o ideal seria ter um estado local de erro neste componente ou garantir que o validateForm use o setError do context se disponível.
      // Vou usar um alert simples para validação local se o context não permitir setar erro manual, 
      // mas o ideal é que o AuthContext capture isso.
      // Neste exemplo, vou assumir que o catch abaixo pega erros de API. 
      // Para validação local, vou lançar um alerta se o contexto não tiver "setError".
      alert(errorMessage); 
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setSuccessMessage('');

    try {
      setLoading(true);
      if (!formData.email.trim()) {
        throw new Error('Email is required');
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Invalid email format');
      }

      await resetPassword(formData.email);
      setSuccessMessage('Password reset link sent to your email!');
      setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
      setTimeout(() => setIsForgotPassword(false), 2000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error sending reset email';
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMode = () => {
    clearError();
    setSuccessMessage('');
    setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
    setIsForgotPassword(false);
    setIsLogin(!isLogin);
  };

  const handleBackToLogin = () => {
    clearError();
    setSuccessMessage('');
    setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
    setIsForgotPassword(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <StyledWrapper>
        <div className="container">
          <div className="login-box">
            {isForgotPassword ? (
              <form className="form" onSubmit={handleForgotPassword}>
                <div className="logo">
                  <img
                    src={`${import.meta.env.BASE_URL}logosemfundo.png`}
                    alt="Tiamat"
                    className="logo-img"
                  />
                </div>
                <span className="header">Reset Password</span>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={loading}
                  maxLength={100} // Limite de caracteres
                />

                {error && <div className="error-message">{error}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}

                <button type="submit" className="button sign-in" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>

                <p className="footer">
                  <button
                    type="button"
                    onClick={handleBackToLogin}
                    className="link"
                  >
                    Back to Login
                  </button>
                </p>
              </form>
            ) : (
              <form className="form" onSubmit={handleSubmit}>
                <div className="logo">
                  <img
                    src={`${import.meta.env.BASE_URL}logosemfundo.png`}
                    alt="Tiamat"
                    className="logo-img"
                  />
                </div>
                <span className="header">
                  {isLogin ? 'Welcome Back!' : 'Join Tiamat!'}
                </span>

                {!isLogin && (
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    className="input"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    disabled={loading}
                    maxLength={50} // Limite de 50 caracteres para o nome
                  />
                )}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={loading}
                  maxLength={100} // Limite de 100 caracteres para o email
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={loading}
                  maxLength={64} // Limite de segurança para senha
                />
                {!isLogin && (
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="input"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    disabled={loading}
                    maxLength={64}
                  />
                )}

                {error && <div className="error-message">{error}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}

                <button type="submit" className="button sign-in" disabled={loading}>
                  {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                </button>

                <p className="footer">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button
                    type="button"
                    onClick={handleToggleMode}
                    className="link"
                    disabled={loading}
                  >
                    {isLogin ? 'Sign up, it\'s free!' : 'Sign in here!'}
                  </button>
                  <br />
                  {isLogin && (
                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(true)}
                      className="link"
                      disabled={loading}
                    >
                      Forgot password?
                    </button>
                  )}
                </p>
              </form>
            )}
          </div>
        </div>
      </StyledWrapper>

      <Link
        to="/"
        className="absolute top-8 left-8 text-white hover:text-blue-400 transition-colors flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </Link>
    </div>
  );
};

const StyledWrapper = styled.div`
  /* ... MANTENHA O CSS IGUAL AO QUE VOCÊ JÁ TINHA ... */
  .container {
    --form-width: 350px;
    --aspect-ratio: 1.5;
    --login-box-color: #1e293b;
    --input-color: #334155;
    --button-color: #3b82f6;
    --footer-color: rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    background: var(--login-box-color);
    border-radius: 24px;
    width: calc(var(--form-width) + 1px);
    height: calc(var(--form-width) * var(--aspect-ratio) + 1px);
    z-index: 8;
    box-shadow:
      0 4px 8px rgba(0, 0, 0, 0.3),
      0 8px 16px rgba(0, 0, 0, 0.2),
      0 0 8px rgba(59, 130, 246, 0.2),
      0 0 16px rgba(59, 130, 246, 0.1);
  }

  .container::before {
    content: "";
    position: absolute;
    inset: -50px;
    z-index: -2;
    background: conic-gradient(
      from 45deg,
      transparent 75%,
      #3b82f6,
      #60a5fa,
      transparent 100%
    );
    animation: spin 6s ease-in-out infinite;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }

  .login-box {
    background: var(--login-box-color);
    border-radius: 24px;
    padding: 32px;
    width: var(--form-width);
    height: calc(var(--form-width) * var(--aspect-ratio));
    position: absolute;
    z-index: 10;
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    box-shadow:
      inset 0 40px 60px -8px rgba(59, 130, 246, 0.15),
      inset 4px 0 12px -6px rgba(96, 165, 250, 0.12),
      inset 0 0 12px -4px rgba(59, 130, 246, 0.12);
    overflow-y: auto;
    max-height: calc(var(--form-width) * var(--aspect-ratio));
  }

  .form {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    gap: 12px;
    min-height: 100%;
  }

  .logo {
    width: 70px;
    height: 70px;
    background: linear-gradient(
      135deg,
      rgba(59, 130, 246, 0.3),
      rgba(96, 165, 250, 0.2)
    );
    box-shadow:
      8px 8px 16px rgba(0, 0, 0, 0.3),
      -8px -8px 16px rgba(59, 130, 246, 0.1);
    border-radius: 20px;
    border: 2px solid #3b82f6;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
  }

  .logo-img {
    width: 50px;
    height: 50px;
    object-fit: contain;
    filter: brightness(1.2);
  }

  .header {
    width: 100%;
    text-align: center;
    font-size: 26px;
    font-weight: bold;
    padding: 8px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #3b82f6, #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid transparent;
    border-radius: 12px;
    background: var(--input-color);
    color: white;
    outline: none;
    font-size: 14px;
    transition: all 0.3s ease;
  }

  .input::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  .input:focus {
    border: 2px solid #3b82f6;
    background: #475569;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .button {
    width: 100%;
    height: 44px;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background: var(--button-color);
    color: white;
    transition: all 0.3s ease;
    box-shadow:
      0 4px 8px rgba(59, 130, 246, 0.3),
      inset 0px 1px 0px rgba(255, 255, 255, 0.2);
  }

  .sign-in {
    margin-top: 8px;
    background: linear-gradient(135deg, #3b82f6, #60a5fa);
  }

  .button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow:
      0 6px 12px rgba(59, 130, 246, 0.4),
      inset 0px 1px 0px rgba(255, 255, 255, 0.3);
  }

  .sign-in:hover:not(:disabled) {
    background: linear-gradient(135deg, #2563eb, #3b82f6);
  }

  .button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .footer {
    width: 100%;
    text-align: center;
    color: var(--footer-color);
    font-size: 13px;
    margin-top: 8px;
  }

  .footer .link {
    background: none;
    border: none;
    color: #60a5fa;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: color 0.3s ease;
    font-size: 13px;
    margin-left: 4px;
    padding: 0;
  }

  .footer .link:hover:not(:disabled) {
    color: #93c5fd;
    text-decoration: underline;
  }

  .footer .link:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .error-message {
    width: 100%;
    padding: 10px 12px;
    background-color: rgba(239, 68, 68, 0.2);
    border: 1px solid rgba(239, 68, 68, 0.5);
    border-radius: 8px;
    color: #fca5a5;
    font-size: 13px;
    text-align: center;
  }

  .success-message {
    width: 100%;
    padding: 10px 12px;
    background-color: rgba(34, 197, 94, 0.2);
    border: 1px solid rgba(34, 197, 94, 0.5);
    border-radius: 8px;
    color: #86efac;
    font-size: 13px;
    text-align: center;
  }
`;

export default LoginPage;
