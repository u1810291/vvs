import React, { useCallback, useState, useEffect, useContext } from "react";
import useLanguage from "../../hook/useLanguage";
import AuthContext from "../../context/authContext";
const { GrayDot } = require("../../components/icons/grayDot");
const { RedDot } = require("../../components/icons/redDot");
const { GreenDot } = require("../../components/icons/greenDot");

const LoginForm = () => {
  const { email, setEmail } = useContext(AuthContext);
  const { password, setPassword } = useContext(AuthContext);
  const { LoginUser } = useContext(AuthContext);
  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [emailEmpty, setEmailEmpty] = useState(true);
  const [passwordEmpty, setPasswordEmpty] = useState(true);
  const { english, lithuanian, t } = useLanguage();
  const { loginError, setLoginError } = useContext(AuthContext);

  useEffect(() => {
    if (loginError === true) {
      setTimeout(() => {
        setLoginError(false);
      }, 3000);
    }
  }, [loginError, setLoginError]);

  const passwordFunc = useCallback(
    async (e) => {
      setPassword(e.target.value);
       // Minimum eight characters, at least one upper case letter, one symbol and one number
      const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      const result = pattern.test(password);
      if (result === true || password === "") {
        setPasswordValid(true);
      } else {
        setPasswordValid(false);
      }
    },
    [password, setPassword, setPasswordValid]
  );

  const emailFunc = useCallback(
    async (e) => {
      setEmail(e.target.value);
      // To prevent matching multiple @ signs:
      const pattern =
        // eslint-disable-next-line no-useless-escape
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const result = pattern.test(email);
      if (result === true || email === "") {
        setEmailValid(true);
      } else {
        setEmailValid(false);
      }
    },
    [email, setEmail, setEmailValid]
  );

  useEffect(() => {
    if (email === "") {
      setEmailEmpty(true);
    } else {
      setEmailEmpty(false);
    }
  }, [email]);

  useEffect(() => {
    if (password === "") {
      setPasswordEmpty(true);
    } else {
      setPasswordEmpty(false);
    }
  }, [password]);

  return (
    <>
      <form onSubmit={LoginUser} className="space-y-6">
        <div>
          <div className="mt-12">
            <div className="flex w-full flex-row">
              {emailEmpty ? (
                <GrayDot />
              ) : !emailValid ? (
                <RedDot />
              ) : (
                <GreenDot />
              )}
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={emailFunc}
                required
                placeholder={t("loginSystem.email")}
                className="appearance-none block w-full px-3 py-2 border-b shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div className="space-y-1">
          <div className="mt-1">
            <div className="flex flex-row">
              {passwordEmpty ? (
                <GrayDot />
              ) : !passwordValid ? (
                <RedDot />
              ) : (
                <GreenDot />
              )}
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={passwordFunc}
                placeholder={t("loginSystem.password")}
                className="appearance-none block w-full px-3 py-2 border-b shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              />
            </div>
            {loginError ? (
              <a className="text-red-800 text-sm font-montserrat">
                {t("loginSystem.wrongEmailOrPassword")}
              </a>
            ) : null}
          </div>
        </div>
        <div className="flex flex-row justify-end my-12">
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent drop-shadow shadow text-sm font-normal text-white font-montserrat hover:shadow-none bg-slate-600 focus:outline-none"
            >
              {t("loginSystem.login")}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
