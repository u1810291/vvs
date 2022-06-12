import { useState } from "react";

function useSort() {
  const [sortedClientsOrder, setSortedClientsOrder] = useState("");
  const [sortedClientsKeys, setSortedClientsKeys] = useState("");
  const [sortedDriversOrder, setSortedDriversOrder] = useState("");
  const [sortedDriversKeys, setSortedDriversKeys] = useState("");
  const [sortedObjectsOrder, setSortedObjectsOrder] = useState("");
  const [sortedObjectsKeys, setSortedObjectsKeys] = useState("");
  const [sortedModemsOrder, setSortedModemsOrder] = useState("");
  const [sortedModemsKeys, setSortedModemsKeys] = useState("");
  const [sortedDashboardKeys, setSortedDashboardKeys] = useState("");
  const [sortedDashboardOrder, setSortedDashboardOrder] = useState("");
  const [sortedKeysKeys, setSortedKeysKeys] = useState("");
  const [sortedKeysOrder, setSortedKeysOrder] = useState("");

  function sortedClientsNames() {
    if (sortedClientsOrder === "") {
      setSortedClientsKeys("fullName");
      setSortedClientsOrder("asc");
    }
    if (sortedClientsOrder === "asc") {
      setSortedClientsKeys("fullName");
      setSortedClientsOrder("desc");
    }
    if (sortedClientsOrder === "desc") {
      setSortedClientsKeys("fullName");
      setSortedClientsOrder("");
    }
  }

  function sortedClientsContracts() {
    if (sortedClientsOrder === "") {
      setSortedClientsKeys("contract");
      setSortedClientsOrder("asc");
    }
    if (sortedClientsOrder === "asc") {
      setSortedClientsKeys("contract");
      setSortedClientsOrder("desc");
    }
    if (sortedClientsOrder === "desc") {
      setSortedClientsKeys("contract");
      setSortedClientsOrder("");
    }
  }

  function sortedClientsPhones() {
    if (sortedClientsOrder === "") {
      setSortedClientsKeys("mobilePhone");
      setSortedClientsOrder("asc");
    }
    if (sortedClientsOrder === "asc") {
      setSortedClientsKeys("mobilePhone");
      setSortedClientsOrder("desc");
    }
    if (sortedClientsOrder === "desc") {
      setSortedClientsKeys("mobilePhone");
      setSortedClientsOrder("");
    }
  }

  function sortedClientsEmails() {
    if (sortedClientsOrder === "") {
      setSortedClientsKeys("email");
      setSortedClientsOrder("asc");
    }
    if (sortedClientsOrder === "asc") {
      setSortedClientsKeys("email");
      setSortedClientsOrder("desc");
    }
    if (sortedClientsOrder === "desc") {
      setSortedClientsKeys("email");
      setSortedClientsOrder("");
    }
  }

  function sortedDriversNames() {
    if (sortedDriversOrder === "") {
      setSortedDriversKeys("name");
      setSortedDriversOrder("asc");
    }
    if (sortedDriversOrder === "asc") {
      setSortedDriversKeys("name");
      setSortedDriversOrder("desc");
    }
    if (sortedDriversOrder === "desc") {
      setSortedDriversKeys("name");
      setSortedDriversOrder("");
    }
  }

  function sortedDriversStatus() {
    if (sortedDriversOrder === "") {
      setSortedDriversKeys("status");
      setSortedDriversOrder("asc");
    }
    if (sortedDriversOrder === "asc") {
      setSortedDriversKeys("status");
      setSortedDriversOrder("desc");
    }
    if (sortedDriversOrder === "desc") {
      setSortedDriversKeys("status");
      setSortedDriversOrder("");
    }
  }

  function sortedObjectsNames() {
    if (sortedObjectsOrder === "") {
      setSortedObjectsKeys("name");
      setSortedObjectsOrder("asc");
    }
    if (sortedObjectsOrder === "asc") {
      setSortedObjectsKeys("name");
      setSortedObjectsOrder("desc");
    }
    if (sortedObjectsOrder === "desc") {
      setSortedObjectsKeys("name");
      setSortedObjectsOrder("");
    }
  }

  function sortedObjectsCity() {
    if (sortedObjectsOrder === "") {
      setSortedObjectsKeys("city");
      setSortedObjectsOrder("asc");
    }
    if (sortedObjectsOrder === "asc") {
      setSortedObjectsKeys("city");
      setSortedObjectsOrder("desc");
    }
    if (sortedObjectsOrder === "desc") {
      setSortedObjectsKeys("city");
      setSortedObjectsOrder("");
    }
  }

  function sortedObjectsAddress() {
    if (sortedObjectsOrder === "") {
      setSortedObjectsKeys("address");
      setSortedObjectsOrder("asc");
    }
    if (sortedObjectsOrder === "asc") {
      setSortedObjectsKeys("address");
      setSortedObjectsOrder("desc");
    }
    if (sortedObjectsOrder === "desc") {
      setSortedObjectsKeys("address");
      setSortedObjectsOrder("");
    }
  }

  function sortedObjectsObject() {
    if (sortedObjectsOrder === "") {
      setSortedObjectsKeys("object");
      setSortedObjectsOrder("asc");
    }
    if (sortedObjectsOrder === "asc") {
      setSortedObjectsKeys("object");
      setSortedObjectsOrder("desc");
    }
    if (sortedObjectsOrder === "desc") {
      setSortedObjectsKeys("object");
      setSortedObjectsOrder("");
    }
  }

  function sortedObjectsContract() {
    if (sortedObjectsOrder === "") {
      setSortedObjectsKeys("contract");
      setSortedObjectsOrder("asc");
    }
    if (sortedObjectsOrder === "asc") {
      setSortedObjectsKeys("contract");
      setSortedObjectsOrder("desc");
    }
    if (sortedObjectsOrder === "desc") {
      setSortedObjectsKeys("contract");
      setSortedObjectsOrder("");
    }
  }

  function sortedObjectsSentCrew() {
    if (sortedObjectsOrder === "") {
      setSortedObjectsKeys("sentCrew");
      setSortedObjectsOrder("asc");
    }
    if (sortedObjectsOrder === "asc") {
      setSortedObjectsKeys("sentCrew");
      setSortedObjectsOrder("desc");
    }
    if (sortedObjectsOrder === "desc") {
      setSortedObjectsKeys("sentCrew");
      setSortedObjectsOrder("");
    }
  }

  function sortedModemsNumber() {
    if (sortedModemsOrder === "") {
      setSortedModemsKeys("number");
      setSortedModemsOrder("asc");
    }
    if (sortedModemsOrder === "asc") {
      setSortedModemsKeys("number");
      setSortedModemsOrder("desc");
    }
    if (sortedModemsOrder === "desc") {
      setSortedModemsKeys("number");
      setSortedModemsOrder("");
    }
  }

  function sortedModemsObjectName() {
    if (sortedModemsOrder === "") {
      setSortedModemsKeys("objectName");
      setSortedModemsOrder("asc");
    }
    if (sortedModemsOrder === "asc") {
      setSortedModemsKeys("objectName");
      setSortedModemsOrder("desc");
    }
    if (sortedModemsOrder === "desc") {
      setSortedModemsKeys("objectName");
      setSortedModemsOrder("");
    }
  }

  function sortedModemsObjectNo() {
    if (sortedModemsOrder === "") {
      setSortedModemsKeys("objectNo");
      setSortedModemsOrder("asc");
    }
    if (sortedModemsOrder === "asc") {
      setSortedModemsKeys("objectNo");
      setSortedModemsOrder("desc");
    }
    if (sortedModemsOrder === "desc") {
      setSortedModemsKeys("objectNo");
      setSortedModemsOrder("");
    }
  }

  function sortedModemsContractNo() {
    if (sortedModemsOrder === "") {
      setSortedModemsKeys("contractNo");
      setSortedModemsOrder("asc");
    }
    if (sortedModemsOrder === "asc") {
      setSortedModemsKeys("contractNo");
      setSortedModemsOrder("desc");
    }
    if (sortedModemsOrder === "desc") {
      setSortedModemsKeys("contractNo");
      setSortedModemsOrder("");
    }
  }

  function sortedModemsStatus() {
    if (sortedModemsOrder === "") {
      setSortedModemsKeys("status");
      setSortedModemsOrder("asc");
    }
    if (sortedModemsOrder === "asc") {
      setSortedModemsKeys("status");
      setSortedModemsOrder("desc");
    }
    if (sortedModemsOrder === "desc") {
      setSortedModemsKeys("status");
      setSortedModemsOrder("");
    }
  }

  function sortedDashboardDate() {
    if (sortedDashboardOrder === "") {
      setSortedDashboardKeys("date");
      setSortedDashboardOrder("asc");
    }
    if (sortedDashboardOrder === "asc") {
      setSortedDashboardKeys("date");
      setSortedDashboardOrder("desc");
    }
    if (sortedDashboardOrder === "desc") {
      setSortedDashboardKeys("date");
      setSortedDashboardOrder("");
    }
  }

  function sortedDashboardObject() {
    if (sortedDashboardOrder === "") {
      setSortedDashboardKeys("object");
      setSortedDashboardOrder("asc");
    }
    if (sortedDashboardOrder === "asc") {
      setSortedDashboardKeys("object");
      setSortedDashboardOrder("desc");
    }
    if (sortedDashboardOrder === "desc") {
      setSortedDashboardKeys("object");
      setSortedDashboardOrder("");
    }
  }

  function sortedDashboardName() {
    if (sortedDashboardOrder === "") {
      setSortedDashboardKeys("name");
      setSortedDashboardOrder("asc");
    }
    if (sortedDashboardOrder === "asc") {
      setSortedDashboardKeys("name");
      setSortedDashboardOrder("desc");
    }
    if (sortedDashboardOrder === "desc") {
      setSortedDashboardKeys("name");
      setSortedDashboardOrder("");
    }
  }

  function sortedDashboardCrew() {
    if (sortedDashboardOrder === "") {
      setSortedDashboardKeys("crew");
      setSortedDashboardOrder("asc");
    }
    if (sortedDashboardOrder === "asc") {
      setSortedDashboardKeys("crew");
      setSortedDashboardOrder("desc");
    }
    if (sortedDashboardOrder === "desc") {
      setSortedDashboardKeys("crew");
      setSortedDashboardOrder("");
    }
  }

  function sortedDashboardInTime() {
    if (sortedDashboardOrder === "") {
      setSortedDashboardKeys("intime");
      setSortedDashboardOrder("asc");
    }
    if (sortedDashboardOrder === "asc") {
      setSortedDashboardKeys("intime");
      setSortedDashboardOrder("desc");
    }
    if (sortedDashboardOrder === "desc") {
      setSortedDashboardKeys("intime");
      setSortedDashboardOrder("");
    }
  }

  function sortedDashboardReactionTime() {
    if (sortedDashboardOrder === "") {
      setSortedDashboardKeys("reactiontime");
      setSortedDashboardOrder("asc");
    }
    if (sortedDashboardOrder === "asc") {
      setSortedDashboardKeys("reactiontime");
      setSortedDashboardOrder("desc");
    }
    if (sortedDashboardOrder === "desc") {
      setSortedDashboardKeys("reactiontime");
      setSortedDashboardOrder("");
    }
  }

  function sortedDashboardTimeInObject() {
    if (sortedDashboardOrder === "") {
      setSortedDashboardKeys("timeinobject");
      setSortedDashboardOrder("asc");
    }
    if (sortedDashboardOrder === "asc") {
      setSortedDashboardKeys("timeinobject");
      setSortedDashboardOrder("desc");
    }
    if (sortedDashboardOrder === "desc") {
      setSortedDashboardKeys("timeinobject");
      setSortedDashboardOrder("");
    }
  }

  function sortedDashboardStatus() {
    if (sortedDashboardOrder === "") {
      setSortedDashboardKeys("status");
      setSortedDashboardOrder("asc");
    }
    if (sortedDashboardOrder === "asc") {
      setSortedDashboardKeys("status");
      setSortedDashboardOrder("desc");
    }
    if (sortedDashboardOrder === "desc") {
      setSortedDashboardKeys("status");
      setSortedDashboardOrder("");
    }
  }

  function sortedDashboardReason() {
    if (sortedDashboardOrder === "") {
      setSortedDashboardKeys("reason");
      setSortedDashboardOrder("asc");
    }
    if (sortedDashboardOrder === "asc") {
      setSortedDashboardKeys("reason");
      setSortedDashboardOrder("desc");
    }
    if (sortedDashboardOrder === "desc") {
      setSortedDashboardKeys("reason");
      setSortedDashboardOrder("");
    }
  }

  function sortedKeysSet() {
    if (sortedKeysOrder === "") {
      setSortedKeysKeys("set");
      setSortedKeysOrder("asc");
    }
    if (sortedKeysOrder === "asc") {
      setSortedKeysKeys("set");
      setSortedKeysOrder("desc");
    }
    if (sortedKeysOrder === "desc") {
      setSortedKeysKeys("set");
      setSortedKeysOrder("");
    }
  }

  function sortedKeysCrew() {
    if (sortedKeysOrder === "") {
      setSortedKeysKeys("crew");
      setSortedKeysOrder("asc");
    }
    if (sortedKeysOrder === "asc") {
      setSortedKeysKeys("crew");
      setSortedKeysOrder("desc");
    }
    if (sortedKeysOrder === "desc") {
      setSortedKeysKeys("crew");
      setSortedKeysOrder("");
    }
  }

  // new
  function sortedDashboardTimeOutOfZone() {
    if (sortedDashboardOrder === "") {
      setSortedDashboardKeys("timeOutOfZone");
      setSortedDashboardOrder("asc");
    }
    if (sortedDashboardOrder === "asc") {
      setSortedDashboardKeys("timeOutOfZone");
      setSortedDashboardOrder("desc");
    }
    if (sortedDashboardOrder === "desc") {
      setSortedDashboardKeys("timeOutOfZone");
      setSortedDashboardOrder("");
    }
  }

  function sortedDashboardDrivers() {
    if (sortedDriversOrder === "") {
      setSortedDriversKeys("drivers");
      setSortedDriversOrder("asc");
    }
    if (sortedDriversOrder === "asc") {
      setSortedDriversKeys("drivers");
      setSortedDriversOrder("desc");
    }
    if (sortedDriversOrder === "desc") {
      setSortedDriversKeys("drivers");
      setSortedDriversOrder("");
    }
  }

  function sortedDashboardAbbreviation() {
    if (sortedDriversOrder === "") {
      setSortedDriversKeys("abbreviation");
      setSortedDriversOrder("asc");
    }
    if (sortedDriversOrder === "asc") {
      setSortedDriversKeys("abbreviation");
      setSortedDriversOrder("desc");
    }
    if (sortedDriversOrder === "desc") {
      setSortedDriversKeys("abbreviation");
      setSortedDriversOrder("");
    }
  }

  function sortedDashboardDislocationZone() {
    if (sortedDriversOrder === "") {
      setSortedDriversKeys("dislocationZone");
      setSortedDriversOrder("asc");
    }
    if (sortedDriversOrder === "asc") {
      setSortedDriversKeys("dislocationZone");
      setSortedDriversOrder("desc");
    }
    if (sortedDriversOrder === "desc") {
      setSortedDriversKeys("dislocationZone");
      setSortedDriversOrder("");
    }
  }

  function sortedDashboardIsAssignedAutomatically() {
    if (sortedDriversOrder === "") {
      setSortedDriversKeys("isAssignedAutomatically");
      setSortedDriversOrder("asc");
    }
    if (sortedDriversOrder === "asc") {
      setSortedDriversKeys("isAssignedAutomatically");
      setSortedDriversOrder("desc");
    }
    if (sortedDriversOrder === "desc") {
      setSortedDriversKeys("isAssignedAutomatically");
      setSortedDriversOrder("");
    }
  }

  return {
    sortedClientsKeys,
    sortedClientsOrder,
    sortedDriversOrder,
    sortedDriversKeys,
    sortedObjectsOrder,
    sortedObjectsKeys,
    sortedModemsOrder,
    sortedModemsKeys,
    sortedDashboardKeys,
    sortedDashboardOrder,
    sortedKeysKeys,
    sortedKeysOrder,
    sortedDriversNames,
    sortedDriversStatus,
    sortedClientsNames,
    sortedClientsContracts,
    sortedClientsPhones,
    sortedClientsEmails,
    sortedObjectsNames,
    sortedObjectsCity,
    sortedObjectsAddress,
    sortedObjectsObject,
    sortedObjectsSentCrew,
    sortedObjectsContract,
    sortedModemsNumber,
    sortedModemsObjectName,
    sortedModemsObjectNo,
    sortedModemsContractNo,
    sortedModemsStatus,
    sortedDashboardDate,
    sortedDashboardObject,
    sortedDashboardName,
    sortedDashboardCrew,
    sortedDashboardInTime,
    sortedDashboardReactionTime,
    sortedDashboardTimeInObject,
    sortedDashboardStatus,
    sortedDashboardReason,
    sortedDashboardTimeOutOfZone,
    sortedDashboardDrivers,
    sortedDashboardAbbreviation,
    sortedDashboardDislocationZone,
    sortedDashboardIsAssignedAutomatically,
    sortedKeysSet,
    sortedKeysCrew
  };
}

export default useSort;
