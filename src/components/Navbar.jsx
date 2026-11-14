import React from "react";

function Navbar({ isOffline }) {
  return (
    <header>
      <h1>WeatherBoard</h1>
      {/* offline mode banner */}
      {isOffline && (
        <p>
          <b>Offline Mode:</b> Showing last caught weather data.
        </p>
      )}
      <hr />
    </header>
  );
}

export default Navbar;
