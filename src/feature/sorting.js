import { useContext } from "react";
import GlobalContext from "../context/globalContext";
import { Clients } from "../api/clients";

export function Sorting() {
  const { sortedDashboardTestApiKeys, setSortedDashboardTestApiKeys } =
    useContext(GlobalContext);
  const { sortedDashboardTestApiOrder, setSortedDashboardTestApiOrder } =
    useContext(GlobalContext);
    const {sortedClientsOrder, setSortedClientsOrder} = useContext(GlobalContext);
    const {sortedClientsKeys, setSortedClientsKeys} = useContext(GlobalContext);

  function sortToggle(arr, key, order) {
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: "base",
    });
    return arr.sort(function (a, b) {
      let x = a[key];
      let y = b[key];
      if (order === "asc") {
        return collator.compare(x, y);
      }
      if (order === "desc") {
        return collator.compare(x, y) * -1;
      }
      if (order === "") {
        return Math.random() - 0.5;
      }
    });
  }

  function sortedDashboardTestDate() {
    if (sortedDashboardTestApiOrder === "") {
      setSortedDashboardTestApiKeys("date");
      setSortedDashboardTestApiOrder("asc");
    }
    if (sortedDashboardTestApiOrder === "asc") {
      setSortedDashboardTestApiKeys("date");
      setSortedDashboardTestApiOrder("desc");
    }
    if (sortedDashboardTestApiOrder === "desc") {
      setSortedDashboardTestApiKeys("date");
      setSortedDashboardTestApiOrder("");
    }
  }

  function sortedDashboardTestObject() {
    if (sortedDashboardTestApiOrder === "") {
      setSortedDashboardTestApiKeys("object");
      setSortedDashboardTestApiOrder("asc");
    }
    if (sortedDashboardTestApiOrder === "asc") {
      setSortedDashboardTestApiKeys("object");
      setSortedDashboardTestApiOrder("desc");
    }
    if (sortedDashboardTestApiOrder === "desc") {
      setSortedDashboardTestApiKeys("object");
      setSortedDashboardTestApiOrder("");
    }
  }

  function sortedDashboardTestName() {
    if (sortedDashboardTestApiOrder === "") {
      setSortedDashboardTestApiKeys("name");
      setSortedDashboardTestApiOrder("asc");
    }
    if (sortedDashboardTestApiOrder === "asc") {
      setSortedDashboardTestApiKeys("name");
      setSortedDashboardTestApiOrder("desc");
    }
    if (sortedDashboardTestApiOrder === "desc") {
      setSortedDashboardTestApiKeys("name");
      setSortedDashboardTestApiOrder("");
    }
  }

  function sortedDashboardTestCrew() {
    if (sortedDashboardTestApiOrder === "") {
      setSortedDashboardTestApiKeys("crew");
      setSortedDashboardTestApiOrder("asc");
    }
    if (sortedDashboardTestApiOrder === "asc") {
      setSortedDashboardTestApiKeys("crew");
      setSortedDashboardTestApiOrder("desc");
    }
    if (sortedDashboardTestApiOrder === "desc") {
      setSortedDashboardTestApiKeys("crew");
      setSortedDashboardTestApiOrder("");
    }
  }

  function sortedDashboardTestInTime() {
    if (sortedDashboardTestApiOrder === "") {
      setSortedDashboardTestApiKeys("intime");
      setSortedDashboardTestApiOrder("asc");
    }
    if (sortedDashboardTestApiOrder === "asc") {
      setSortedDashboardTestApiKeys("intime");
      setSortedDashboardTestApiOrder("desc");
    }
    if (sortedDashboardTestApiOrder === "desc") {
      setSortedDashboardTestApiKeys("intime");
      setSortedDashboardTestApiOrder("");
    }
  }

  function sortedDashboardTestReactionTime() {
    if (sortedDashboardTestApiOrder === "") {
      setSortedDashboardTestApiKeys("reactiontime");
      setSortedDashboardTestApiOrder("asc");
    }
    if (sortedDashboardTestApiOrder === "asc") {
      setSortedDashboardTestApiKeys("reactiontime");
      setSortedDashboardTestApiOrder("desc");
    }
    if (sortedDashboardTestApiOrder === "desc") {
      setSortedDashboardTestApiKeys("reactiontime");
      setSortedDashboardTestApiOrder("");
    }
  }

  function sortedDashboardTestTimeInObject() {
    if (sortedDashboardTestApiOrder === "") {
      setSortedDashboardTestApiKeys("timeinobject");
      setSortedDashboardTestApiOrder("asc");
    }
    if (sortedDashboardTestApiOrder === "asc") {
      setSortedDashboardTestApiKeys("timeinobject");
      setSortedDashboardTestApiOrder("desc");
    }
    if (sortedDashboardTestApiOrder === "desc") {
      setSortedDashboardTestApiKeys("timeinobject");
      setSortedDashboardTestApiOrder("");
    }
  }

  function sortedDashboardTestStatus() {
    if (sortedDashboardTestApiOrder === "") {
      setSortedDashboardTestApiKeys("status");
      setSortedDashboardTestApiOrder("asc");
    }
    if (sortedDashboardTestApiOrder === "asc") {
      setSortedDashboardTestApiKeys("status");
      setSortedDashboardTestApiOrder("desc");
    }
    if (sortedDashboardTestApiOrder === "desc") {
      setSortedDashboardTestApiKeys("status");
      setSortedDashboardTestApiOrder("");
    }
  }

  function sortedDashboardTestReason() {
    if (sortedDashboardTestApiOrder === "") {
      setSortedDashboardTestApiKeys("reason");
      setSortedDashboardTestApiOrder("asc");
    }
    if (sortedDashboardTestApiOrder === "asc") {
      setSortedDashboardTestApiKeys("reason");
      setSortedDashboardTestApiOrder("desc");
    }
    if (sortedDashboardTestApiOrder === "desc") {
      setSortedDashboardTestApiKeys("reason");
      setSortedDashboardTestApiOrder("");
    }
  }

  function sortedClientsNames() {
    if (sortedClientsOrder === "") {
      setSortedClientsKeys("name");
      setSortedClientsOrder("asc");
    }
    if (sortedClientsOrder === "asc") {
      setSortedClientsKeys("name");
      setSortedClientsOrder("desc");
    }
    if (sortedClientsOrder === "desc") {
      setSortedClientsKeys("name");
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
      setSortedClientsKeys("phone");
      setSortedClientsOrder("asc");
    }
    if (sortedClientsOrder === "asc") {
      setSortedClientsKeys("phone");
      setSortedClientsOrder("desc");
    }
    if (sortedClientsOrder === "desc") {
      setSortedClientsKeys("phone");
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

  const sortedClients = sortToggle(
    Clients,
    sortedClientsKeys,
    sortedClientsOrder
  );
}
