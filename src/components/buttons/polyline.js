import React from "react";

export function RoutesPolyline({path, ...props}) {
  return new google.maps.Polyline({
    path: path,
    geodesic: true,
    // map: map,
    strokeColor: "#ff2343",
    strokeOpacity: 0.8,
    strokeWeight: 5,
    clickable: true,
  });
}
