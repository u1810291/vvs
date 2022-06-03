import React from "react";
import useLanguage from "../../hook/useLanguage";
const { ActiveCard } = require("../../components/cards/active");
import PermissionConfirmationTimeCard from '../cards/permissionConfirmationTimeCard';
import {BlueStatus} from '../buttons/blueStatus';

const PermissionConfirmationSideRight = () => {
  const { english, lithuanian, t } = useLanguage();
  return (
    <>
      <div className="flex flex-col">
        <div className="text-slate-400">
          <ActiveCard />
          <PermissionConfirmationTimeCard
            receivedAt={"2021-07-12 14:32:01"}
            Status={BlueStatus}
          />
        </div>
      </div>
    </>
  );
};

export default PermissionConfirmationSideRight;
