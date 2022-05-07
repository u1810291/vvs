import { useState } from "react";

function useExpandFilters() {
    const [expandFilters, setExpandFilters] = useState(true)

    function expandFiltersFunction() {
        if (expandFilters) {
          setExpandFilters(false);
        } if (!expandFilters) {
          setExpandFilters(true);
        }
      }
      
  return { expandFilters, expandFiltersFunction };
}

export default useExpandFilters;
