import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  getAccessTokenSession,
  setAccessTokenSession,
  getRefreshTokenSession,
  setRefreshTokenSession,
  removeAccessTokenSession,
  removeRefreshTokenSession
} from "../feature/sessions";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    getAccessTokenSession() ? jwt_decode(getAccessTokenSession()) : null
  );
  const [accessToken, setAccessToken] = useState(() =>
    getAccessTokenSession() ? getAccessTokenSession() : null
  );

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

  const [refreshTokens, setRefreshTokens] = useState(null);
  const [applicationId, setApplicationId] = useState(null);
  const [startInstant, setStartInstant] = useState(null);
  const [userId, setUserId] = useState(null);

  const Logout = useCallback(async () => {
    setUser(null);
    setAccessToken(null);
    removeAccessTokenSession();
    removeRefreshTokenSession();
    () => navigate("/");
  }, [navigate]);

  const LoginUser = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        const res = await fetch("http://ec.swarm.testavimui.eu/v1/graphql", {
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
          console.log(data)
          const accessToken = data?.data?.login?.token;
          const refreshToken = data?.data?.login?.refreshToken;
          setUser(jwt_decode(accessToken));
          setAccessToken(data);
          setAccessTokenSession(accessToken);
          setRefreshTokenSession(refreshToken);
          navigate("/dashboard");
        }
      } catch (err) {
        setLoginError(true);
      }
    },
    [email, navigate, password]
  );

  const RegisterUser = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        const res = await fetch("http://ec.swarm.testavimui.eu/v1/graphql", {
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
              role: "customer",
            },
          }),
          headers: {
            "content-type": "application/json",
            "x-hasura-admin-secret": "secret",
          },
        });
        const data = await res.json();
        if (res.status === 200) {
          console.log(data);
          const accessToken = data?.data?.register?.token;
          const refreshToken = data?.data?.register?.refreshToken;
          setUser(jwt_decode(accessToken));
          setAccessToken(data);
          setAccessTokenSession(accessToken);
          setRefreshTokenSession(refreshToken);
          navigate("/dashboard");
        }
      } catch (err) {
        console.log(err);
      }
    },
    [navigate, registerBirthday, registerEmail, registerName, registerPassword, registerPhone, registerSurname]
  );

  const RefreshTokenUpdate = useCallback(async () => {
    try {
      const res = await fetch("http://ec.swarm.testavimui.eu/v1/graphql/", {
        method: "POST",
        body: JSON.stringify({
          query: `query getRefresh($refreshTokens: String!, $applicationId: String!, $startInstant: String!, $token: String!, $userId: String!) {
                refresh(refreshTokens: $refreshTokens, applicationId: $applicationId, startInstant: $startInstant, token: $token, userId: $userId) {
                  refreshToken
                  token
                }
              }
              `,
          variables: {
            refreshTokens: refreshTokens,
            applicationId: applicationId,
            startInstant: startInstant,
            token: accessToken,
            userId: userId,
          },
        }),
        headers: {
          "content-type": "application/json",
          "x-hasura-admin-secret": "secret",
        },
      });
      const data = await res.json();

      if (data) {
        // running this code every time!
        const accessToken = data?.data?.refresh?.token;
        const refreshToken = data?.data?.refresh?.refreshToken;
        setUser(jwt_decode(accessToken));
        setAccessToken(data);
        setAccessTokenSession(accessToken);
        setRefreshTokenSession(refreshToken);
      } else {
        Logout();
      }

      if (initPage) {
        setInitPage(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [
    Logout,
    accessToken,
    applicationId,
    initPage,
    refreshTokens,
    startInstant,
    userId,
  ]);

  const HandleRecoverPassword = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        // const expiringID = sessionStorage.getItem(
        //   "changePasswordID"
        //   // ,JSON.stringify(changePasswordId)
        // );
        // check if expiringID not null and handle if null
        const res = await fetch("http://ec.swarm.testavimui.eu/v1/graphql", {
          method: "POST",
          body: JSON.stringify({
            query: `query loginUser($changePasswordId: String!, $password: String!) {
                recoverPassword(password: $password, changePasswordId: $changePasswordId) {
                  refreshToken
                  token
                }
              }
              `,
            variables: {
              changePasswordId: expiringID,
              password: recoverPassword,
            },
          }),
          headers: {
            "content-type": "application/json",
            "x-hasura-admin-secret": "secret",
          },
        });
        const data = await res.json();
        if (res.status === 200) {
          console.log("data", data);
          navigate("/forgotSuccess");
        } else {
          console.log("errors ", data.errors);
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
        const res = await fetch("http://ec.swarm.testavimui.eu/v1/graphql", {
          method: "POST",
          body: JSON.stringify({
            query: `query ($loginId: String!) {
              loginId(loginId: $loginId) {
                changePasswordId
                }
              }
              `,
            variables: {
              loginId: forgotEmail,
            },
          }),
          headers: {
            "content-type": "application/json",
            "x-hasura-admin-secret": "secret",
          },
        });
        const data = await res.json();
        if (res.status === 200) {
          console.log("data", data);
          // sessionStorage.setItem(
          //   "changePasswordID",
          //   JSON.stringify(data.changePasswordId)
          // );
          // navigate("/forgotEmail");
        } else {
          console.log("errors ", res);
          // handle errors appropriately
        }
      } catch (err) {
        // console.log(err);
      }
    },
    [forgotEmail]
  );

  useEffect(() => {
    if (initPage) {
      RefreshTokenUpdate();
    }
  }, [RefreshTokenUpdate, initPage]);

  if (!getAccessTokenSession()) {
    () => navigate("/");
  }

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
  };

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
    // {initPage ? null : children}
  );
};
