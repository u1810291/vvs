import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [registerName, setRegisterName] = useState("");
  const [registerSurname, setRegisterSurname] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerRepeatPassword, setRegisterRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recoverPassword, setRecoverPassword] = useState("");
  const [repeatRecoverPassword, setRepeatRecoverPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [user, setUser] = useState(() =>
    localStorage.getItem("userData")
      ? localStorage.getItem("userData") // jwt_decode
      : null
  );
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : null
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const Logout = useCallback(async () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem("userData");
    () => navigate("/");
  }, [navigate]);

  const LoginUser = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const res = await fetch(
          "http://ec.swarm.testavimui.eu/v1/graphql",
          {
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
                newUser: {
                  email: email,
                  password: password,
                },
              },
            }),
            headers: {
              "content-type": "application/json",
              "x-hasura-admin-secret":
                "secret",
            },
          }
        );
        const data = await res.json();
        if (data.errors) {
          console.log("errors ", data.errors);
          // handle errors appropriately
        }
        if (data) {
          console.log("data", data);
          const accessToken = data?.token;
          const refreshToken = data?.refresh;
          setUser(accessToken); // jwt_decode
          setAuthToken(data);
          localStorage.setItem("userData", JSON.stringify(user));
          navigate("/dashboard");
        }
      } catch (err) {
        console.log(err);
      }
    },
    [email, navigate, password, user]
  );

  const RegisterUser = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const res = await fetch(
          "http://ec.swarm.testavimui.eu/v1/graphql",
          {
            method: "POST",
            body: JSON.stringify({
              query: `query loginUser($password: String!, $firstName: String!, $lastName: String!, $mobilePhone: String!, $email: String!, $role: String!) {
                login(password: $password, username: $username) {
                  refreshToken
                  token
                }
              }
              `,
              variables: {
                newUser: {
                  birthDate: registerName,
                  surname: registerSurname,
                  phone: registerPhone,
                  email: registerEmail,
                  password: registerPassword,
                },
              },
            }),
            headers: {
              "content-type": "application/json",
              "x-hasura-admin-secret":
                "secret",
            },
          }
        );
        const data = await res.json();
        if (data.errors) {
          // handle errors
        }
        if (data) {
          console.log("data", data);
          const accessToken = data.token;
          const refreshToken = data.refresh;
          setUser(accessToken); // jwt_decode
          setAuthToken(data);
          localStorage.setItem("userData", JSON.stringify(user));
          navigate("/dashboard");
        }
      } catch (err) {
        console.log(err);
      }
    },
    [
      navigate,
      registerEmail,
      registerName,
      registerPassword,
      registerPhone,
      registerSurname,
      user,
    ]
  );

  const RefreshTokenUpdate = useCallback(async () => {
    try {
      const res = await fetch(
        "http://ec.swarm.testavimui.eu/v1/graphql/",
        {
          method: "POST",
          body: JSON.stringify({ refresh: authToken?.refresh }),
          headers: {
            "content-type": "application/json",
            "x-hasura-admin-secret":
              "secret",
          },
        }
      );
      const data = await res.json();

      if (data.status === 200) {
        setUser(accessToken); // jwt_decode
        setAuthToken(data);
        localStorage.setItem("userData", JSON.stringify(user));
      } else {
        Logout();
      }

      if (loading) {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [Logout, authToken?.refresh, loading, user]);

  const HandleRecoverPassword = useCallback(
    async (e) => {
      e.preventDefault();
      const expiringID = localStorage.getItem("changePasswordID", JSON.stringify(changePasswordId));
      try {
        const res = await fetch(
          "http://ec.swarm.testavimui.eu/v1/graphql",
          {
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
                User: {
                  changePasswordId: expiringID,
                  password: recoverPassword,
                },
              },
            }),
            headers: {
              "content-type": "application/json",
              "x-hasura-admin-secret":
                "secret",
            },
          }
        );
        const data = await res.json();
        if (data.errors) {
          console.log("errors ", data.errors);
          // handle errors appropriately
        }
        if (data) {
          console.log("data", data);
          navigate("/forgotSuccess");
        }
      } catch (err) {
        console.log(err);
      }
    },
    [navigate, recoverPassword]
  );

  const ForgotPassword = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const res = await fetch(
          "http://ec.swarm.testavimui.eu/v1/graphql",
          {
            method: "POST",
            body: JSON.stringify({
              query: `query ($email: String!) {
                forgotPassword(email: $email) {
                  refreshToken
                  token
                }
              }
              `,
              variables: {
                User: {
                  email: forgotEmail,
                },
              },
            }),
            headers: {
              "content-type": "application/json",
              "x-hasura-admin-secret":
                "secret",
            },
          }
        );
        const data = await res.json();
        if (data.errors) {
          console.log("errors ", data.errors);
          localStorage.setItem("changePasswordID", JSON.stringify(data.changePasswordId));
          // handle errors appropriately
        }
        if (data) {
          console.log("data", data);
          navigate("/forgotEmail");
        }
      } catch (err) {
        console.log(err);
      }
    },
    [forgotEmail, navigate]
  );

  useEffect(() => {
    if (loading) {
      RefreshTokenUpdate();
    }

    // let fourMinutes = 1000 * 60 * 4;
    // let interval = setInterval(() => {
    //   if (authToken) {
    //     RefreshTokenUpdate();
    //   }
    // }, fourMinutes);
    // return () => clearInterval(interval);
  }, [RefreshTokenUpdate, authToken, loading]);

  // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
  const contextData = {
    LoginUser: LoginUser,
    RegisterUser: RegisterUser,
    Logout: Logout,
    RefreshTokenUpdate: RefreshTokenUpdate,
    HandleRecoverPassword: HandleRecoverPassword,
    ForgotPassword: ForgotPassword,
    user: user,
    authToken: authToken,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    setLoading,
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
  };

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
    // {loading ? null : children}
  );
};
