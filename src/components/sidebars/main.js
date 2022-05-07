import React, { useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";

const MainSidebar = () => {
  const { Logout } = useContext(AuthContext);
  const selfService = useCallback(() => {
    console.log("selfService");
  }, []);

  return (
    <div className="flex flex-col justify-between text-white w-96 h-full">
      <div className="flex flex-row">
        <div className="flex flex-col">
          <p className="flex text-normal text-gray-300 font-light">Meniu</p>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col items-start w-full">
          <Link to="/dashboard" className="text-gray-200 hover:text-gray-400">
            Pultas
          </Link>
        </div>
        <div className="items-start flex flex-col w-full">
          <Link
            to="/dashboard"
            className="font-light text-normal text-gray-200 hover:text-gray-400"
          >
            Pultas
          </Link>
          <Link
            to="/task"
            className="font-light text-normal text-gray-200 hover:text-gray-400"
          >
            Užduotys
          </Link>
          <Link
            to="/task"
            className="font-light text-normal text-gray-200 hover:text-gray-400"
          >
            Leidimai
          </Link>
          <Link
            to="/violations"
            className="font-light text-normal text-gray-200 hover:text-gray-400"
          >
            Pažeidimai
          </Link>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col items-start w-full">
          <Link to="/crews" className="text-gray-200 hover:text-gray-400">
            Ekipažai
          </Link>
        </div>
        <div className="items-start flex flex-col w-full">
          <Link
            to="/crews"
            className="font-light text-normal text-gray-200 hover:text-gray-400"
          >
            Ekipažai
          </Link>
          <Link
            to="/drivers"
            className="font-light text-normal text-gray-200 hover:text-gray-400"
          >
            Vairuotojai
          </Link>
          <Link
            to="/dislocation"
            className="font-light text-normal text-gray-200 hover:text-gray-400"
          >
            Dislokacijos zonos
          </Link>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col items-start w-full">
          <Link to="/objects" className="text-gray-200 hover:text-gray-400">
            Objektai
          </Link>
        </div>
        <div className="items-start flex flex-col w-full">
          <Link
            to="/objects"
            className="font-light text-normal text-gray-200 hover:text-gray-400"
          >
            Objektai
          </Link>
          <Link
            to="/objects"
            className="font-light text-normal text-gray-200 hover:text-gray-400"
          >
            Modemai
          </Link>
          <Link
            to="/keys"
            className="font-light text-normal text-gray-200 hover:text-gray-400"
          >
            Raktai
          </Link>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col items-start w-full">
          <button
            onClick={selfService}
            className="text-gray-200 hover:text-gray-400"
          >
            Savitarna
          </button>
        </div>
        <div className="items-start flex flex-col w-full">
          <Link
            to="/clients"
            className="font-light text-normal text-gray-200 hover:text-gray-400"
          >
            Klientai
          </Link>
          <Link
            to="/help"
            className="font-light text-normal text-gray-200 hover:text-gray-400"
          >
            Pagalba
          </Link>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col items-start w-full">
          <Link to="/reports" className="text-gray-200 hover:text-gray-400">
            Ataskaitos
          </Link>
        </div>
        <div className="items-start flex flex-col w-full">
          <Link
            to="/report"
            className="font-light text-normal text-gray-200 hover:text-gray-400"
          >
            Ataskaita 1
          </Link>
          <Link
            to="/report"
            className="font-light text-normal text-gray-200 hover:text-gray-400"
          >
            Ataskaita 2
          </Link>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col items-start w-full">
          <Link to="/settings" className="text-gray-200 hover:text-gray-400">
            Nustatymai
          </Link>
        </div>
        <div className="items-start flex flex-col w-full">
          <Link
            to="/settings"
            className="font-light text-normal text-gray-200 hover:text-gray-400"
          >
            Nustatymai?
          </Link>
          <Link
            to="/classifiers"
            className="font-light text-normal text-gray-200 hover:text-gray-400"
          >
            Klasifikatoriai
          </Link>
          <Link
            to="/users"
            className="font-light text-normal text-gray-200 hover:text-gray-400"
          >
            Vartotojai
          </Link>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col text-sm items-start font-light">
          <img src={require("../../assets/assets/Line.png")}></img>
          <Link
            to="/user"
            className="font-light text-normal text-gray-200 hover:text-gray-400"
          >
            Mano paskyra
          </Link>
          <button
            onClick={Logout}
            className="font-light text-normal text-gray-200 hover:text-gray-400"
          >
            Atsijungti
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainSidebar;
