import React, {useState, useCallback, useRef} from "react";
import {useNavigate} from "react-router-dom";

import {GoogleMap, useLoadScript} from "@react-google-maps/api";

import {OverlayProvider} from "react-aria";
import SidebarLayout from "../../../layout/sidebarLayout";
import Textarea from '../../../components/input/Textarea';
import MainSidebar from "../../../components/sidebars/main";
import Selectbox from "../../../components/input/Selectbox";
import SlideOver from "../../../components/sidebars/slideOver";
import MainHeader from "../../../components/headers/MainHeader";
import NewTaskForm from '../form/newTaskForm';
import Breadcrumbs from "../../../components/headers/Breadcrumbs";
import ControlledInput from "../../../components/input/ControlledInput";
import HeaderButtonGroup from "../../../components/headers/HeaderButtonGroup";

import {generate} from "shortid";

import {useFetch} from '../../../hook/useFetch';
import useLanguage from "../../../hook/useLanguage";

const NewTaskLayout = () => {
  const {t} = useLanguage();
  const navigate = useNavigate();
  const onCancelButton = useCallback(() => {
    navigate("/tasks")
  }, []);
  const onSaveButton = useCallback(() => {

  }, []);

  return (
    <SidebarLayout>
      <div className="flex flex-col min-h-full w-[calc(100%-80px)]">
        <MainHeader>
          <Breadcrumbs
            titleText={"eurocash.tasks"}
            subtitleText={"eurocash.newTask"}
            titlePath={"/tasks"}
            subtitlePath={"/newTask"}/>
          <HeaderButtonGroup
            saveButtonText={"eurocash.createNewTask"}
            cancelButtonText={"eurocash.cancel"}
            onSaveButton={onSaveButton}
            onCancelButton={onCancelButton}
            twSaveButton={"text-white bg-slate-600"}
            twCancelButton={"mr-4 bg-gray-200 text-gray-500"}
          />
        </MainHeader>
        <NewTaskForm/>
      </div>
    </SidebarLayout>
  );
};

export default NewTaskLayout;
