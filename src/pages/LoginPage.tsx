import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <StyledWrapper>
        <div className="container">
          <div className="login-box">
            <form className="form">
              <div className="logo">
                <img 
                  src="/logosemfundo.png" 
                  alt="Tiamat" 
                  className="logo-img"
                />
              </div>
              <span className="header">
                {isLogin ? 'Welcome Back!' : 'Join Tiamat!'}
              </span>
              
              {!isLogin && (
                <input type="text" placeholder="Full Name" className="input" />
              )}
              <input type="email" placeholder="Email" className="input" />
              <input type="password" placeholder="Password" className="input" />
              {!isLogin && (
                <input type="password" placeholder="Confirm Password" className="input" />
              )}
              
              <button type="submit" className="button sign-in">
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
              
              <button type="button" className="button google-sign-in">
                <svg className="icon" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" fill="#000000">
                  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                  <g id="SVGRepo_iconCarrier">
                    <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" />
                    <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" />
                    <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" />
                    <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" />
                  </g>
                </svg>
                <span className="span two">Sign in with Google</span>
              </button>
              
              <p className="footer">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button 
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="link"
                >
                  {isLogin ? 'Sign up, it\'s free!' : 'Sign in here!'}
                </button>
                <br />
                {isLogin && (
                  <button type="button" className="link">Forgot password?</button>
                )}
              </p>
            </form>
          </div>
        </div>
      </StyledWrapper>
      
      {/* Back to Home */}
      <Link 
        to="/" 
        className="absolute top-8 left-8 text-white hover:text-purple-400 transition-colors flex items-center gap-2"
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
  .container {
    --form-width: 350px;
    --aspect-ratio: 1.4;
    --login-box-color: #1e293b;
    --input-color: #334155;
    --button-color: #7c3aed;
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
      0 0 8px rgba(124, 58, 237, 0.2),
      0 0 16px rgba(124, 58, 237, 0.1);
  }

  .container::before {
    content: "";
    position: absolute;
    inset: -50px;
    z-index: -2;
    background: conic-gradient(
      from 45deg,
      transparent 75%,
      #7c3aed,
      #a855f7,
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
      inset 0 40px 60px -8px rgba(124, 58, 237, 0.15),
      inset 4px 0 12px -6px rgba(168, 85, 247, 0.12),
      inset 0 0 12px -4px rgba(124, 58, 237, 0.12);
  }

  .form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 12px;
    height: 100%;
  }

  .logo {
    width: 70px;
    height: 70px;
    background: linear-gradient(
      135deg,
      rgba(124, 58, 237, 0.3),
      rgba(168, 85, 247, 0.2)
    );
    box-shadow:
      8px 8px 16px rgba(0, 0, 0, 0.3),
      -8px -8px 16px rgba(124, 58, 237, 0.1);
    border-radius: 20px;
    border: 2px solid #7c3aed;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
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
    background: linear-gradient(135deg, #7c3aed, #a855f7);
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
    border: 2px solid #7c3aed;
    background: #475569;
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
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
      0 4px 8px rgba(124, 58, 237, 0.3),
      inset 0px 1px 0px rgba(255, 255, 255, 0.2);
  }

  .sign-in {
    margin-top: 8px;
    background: linear-gradient(135deg, #7c3aed, #a855f7);
  }

  .google-sign-in {
    background: #374151;
    margin-top: 4px;
  }

  .button:hover {
    transform: translateY(-2px);
    box-shadow:
      0 6px 12px rgba(124, 58, 237, 0.4),
      inset 0px 1px 0px rgba(255, 255, 255, 0.3);
  }

  .sign-in:hover {
    background: linear-gradient(135deg, #8b5cf6, #c084fc);
  }

  .google-sign-in:hover {
    background: #4b5563;
  }

  .icon {
    height: 18px;
    width: 18px;
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
    color: #a855f7;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: color 0.3s ease;
    font-size: 13px;
    margin-left: 4px;
  }

  .footer .link:hover {
    color: #c084fc;
    text-decoration: underline;
  }
`;

export default LoginPage;