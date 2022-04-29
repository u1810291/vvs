import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  getRefreshTokenSession,
  setRefreshTokenSession,
  removeRefreshTokenSession,
  setEmailRecoverySession,
  getEmailRecoverySession,
  removeEmailRecoverySession
} from "../feature/sessions";
import dayjs from "dayjs";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [registerName, setRegisterName] = useState("");
  const [registerSurname, setRegisterSurname] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerRepeatPassword, setRegisterRepeatPassword] = useState("");
  const [registerBirthday, setRegisterBirthday] = useState("2000-01-01");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recoverPassword, setRecoverPassword] = useState("");
  const [repeatRecoverPassword, setRepeatRecoverPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [initPage, setInitPage] = useState(true);
  const [loginError, setLoginError] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [passwordRecoveryToken, setPasswordRecoveryToken] = useState(null);
  const [role, setRole] = useState("customer");
  const [emailValidationError, setEmailValidationError] = useState(false);
  const [phoneValidationError, setPhoneValidationError] = useState(false);
  // const abortController = useRef(null);
  // const cancelRequest = () => abortController.current && abortController.current.abort();

  useEffect(() => {
    // RefreshTokenUpdate();
    window.addEventListener("beforeunload", RefreshTokenUpdate())
    if (user) {
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

      if (isExpired) {
        RefreshTokenUpdate();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!accessToken) {
      () => navigate("/");
    }
  }, [accessToken, navigate]);

  const Logout = useCallback(async () => {
    setUser(null);
    setAccessToken(null);
    removeRefreshTokenSession();
    () => navigate("/");
  }, [navigate]);

  const LoginUser = useCallback(
    async (e) => {
      try {
        // abortController.current = newAbortController();
        e.preventDefault();
        const res = await fetch("https://ec.swarm.testavimui.eu/v1/graphql", {
          // signal: abortController.current.signal,
          method: "POST",
          body: JSON.stringify({
            query: `query loginUser($username: String!, $password: String!) {
                login(password: $password, username: $username) {
                  refreshToken
                  token
                }
              }
              `,
            variables: {
              username: email,
              password: password,
            },
          }),
          headers: {
            "content-type": "application/json",
            "x-hasura-admin-secret": "secret",
          },
        });
        const data = await res.json();
        if (data) {
          const token = data?.data?.login?.token;
          const refresh = data?.data?.login?.refreshToken;
          setUser(jwt_decode(token));
          setAccessToken(token);
          setRefreshTokenSession(refresh);
          navigate("/dashboard");
        }
      } catch (err) {
        setLoginError(true);
        // console.log(err);
      }
    },
    [email, navigate, password]
  );

  const RegisterUser = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        const res = await fetch("https://ec.swarm.testavimui.eu/v1/graphql", {
          method: "POST",
          body: JSON.stringify({
            query: `query registerUser($firstName: String!, $lastName: String!, $mobilePhone: String!, $email: String!, $birthDate: String!, $password: String!, $role: String!) {
                register(firstName: $firstName, lastName: $lastName, mobilePhone: $mobilePhone, email: $email, password: $password, birthDate: $birthDate, role: $role) {
                  refreshToken
                  token
                }
              }
              `,
            variables: {
              firstName: registerName,
              lastName: registerSurname,
              mobilePhone: registerPhone,
              email: registerEmail,
              birthDate: registerBirthday,
              password: registerPassword,
              role: role,
            },
          }),
          headers: {
            "content-type": "application/json",
            "x-hasura-admin-secret": "secret",
          },
        });
        const data = await res.json();
        if (data) {
          const token = data?.data?.register?.token;
          const refresh = data?.data?.register?.refreshToken;
          if (data.errors) {
            const emailError = data?.errors[0]?.extensions.internal.response.body.fieldErrors["user.email"][0].code;
            setEmailValidationError(true);
            const phoneError = data?.errors[0]?.extensions.internal.response.body.fieldErrors;
          }
          setUser(jwt_decode(token));
          setAccessToken(token);
          setRefreshTokenSession(refresh);
          navigate("/dashboard");
        }
      } catch (err) {
        // console.log(err);
      }
    },
    [
      navigate,
      registerBirthday,
      registerEmail,
      registerName,
      registerPassword,
      registerPhone,
      registerSurname,
      role,
    ]
  );

  const RefreshTokenUpdate = useCallback(async () => {
    try {
    const currentRefreshToken = getRefreshTokenSession();
      const res = await fetch("https://ec.swarm.testavimui.eu/v1/graphql/", {
        method: "POST",
        body: JSON.stringify({
          query: `query refreshSession($refreshToken: String!) {
                refresh(refreshToken: $refreshToken) {
                  refreshToken
                  token
                }
              }
              `,
          variables: {
            refreshToken: currentRefreshToken,
          },
        }),
        headers: {
          "content-type": "application/json",
          "x-hasura-admin-secret": "secret",
        },
      });
      const data = await res.json();

      if (data) {
        const token = data?.data?.refresh?.token;
        const refresh = data?.data?.refresh?.refreshToken;
        setUser(jwt_decode(token));
        setAccessToken(token);
        setRefreshTokenSession(refresh);
      } else {
        Logout();
      }
    } catch (err) {
      // console.log(err);
    }
  }, [Logout]);

  const HandleRecoverPassword = useCallback(
    async (e) => {
      const getEmailRecoveryId = getEmailRecoverySession();
      try {
        e.preventDefault();
        const res = await fetch("https://ec.swarm.testavimui.eu/v1/graphql", {
          method: "POST",
          body: JSON.stringify({
            query: `query recoverPassword($changePasswordId: String!, $password: String!) {
                remind(password: $password, changePasswordId: $changePasswordId) {
                  refreshToken
                  token
                }
              }
              `,
            variables: {
              changePasswordId: getEmailRecoveryId,
              password: recoverPassword,
            },
          }),
          headers: {
            "content-type": "application/json",
            "x-hasura-admin-secret": "secret",
          },
        });
        const data = await res.json();
        if (data) {
          removeEmailRecoverySession();
          navigate("/");
        } else {
          console.log("errors ", data);
          // handle errors appropriately
        }
      } catch (err) {
        console.log(err);
      }
    },
    [navigate, recoverPassword]
  );

  const ForgotPassword = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        const res = await fetch("https://ec.swarm.testavimui.eu/v1/graphql", {
          method: "POST",
          body: JSON.stringify({
            query: `query forgotPassword($loginId: String! $sendForgotPasswordEmail: Boolean!) {
              forgot(loginId: $loginId, sendForgotPasswordEmail: $sendForgotPasswordEmail ) {
                changePasswordId
                }
              }
              `,
            variables: {
              loginId: forgotEmail,
              sendForgotPasswordEmail: true, // false
            },
          }),
          headers: {
            "content-type": "application/json",
            "x-hasura-admin-secret": "secret",
          },
        });
        const data = await res.json();
        if (data) {
          const expiringID = data?.data?.forgot?.changePasswordId;
          console.log(expiringID)
          // setPasswordRecoveryToken(expiringID);
          setEmailRecoverySession(expiringID);
          navigate("/forgotSuccess");
        } else {
          console.log("errors ", res);
          // handle errors appropriately
        }
      } catch (err) {
        console.log(err);
      }
    },
    [forgotEmail, navigate]
  );

  // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
  const contextData = {
    LoginUser: LoginUser,
    RegisterUser: RegisterUser,
    Logout: Logout,
    RefreshTokenUpdate: RefreshTokenUpdate,
    HandleRecoverPassword: HandleRecoverPassword,
    ForgotPassword: ForgotPassword,
    user: user,
    accessToken: accessToken,
    email,
    setEmail,
    password,
    setPassword,
    initPage,
    setInitPage,
    registerName,
    setRegisterName,
    registerSurname,
    setRegisterSurname,
    registerPhone,
    setRegisterPhone,
    registerEmail,
    setRegisterEmail,
    registerPassword,
    setRegisterPassword,
    registerRepeatPassword,
    setRegisterRepeatPassword,
    recoverPassword,
    setRecoverPassword,
    repeatRecoverPassword,
    setRepeatRecoverPassword,
    forgotEmail,
    setForgotEmail,
    loginError,
    setLoginError,
    emailValidationError,
    setEmailValidationError,
    phoneValidationError,
    setPhoneValidationError,
  };

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
