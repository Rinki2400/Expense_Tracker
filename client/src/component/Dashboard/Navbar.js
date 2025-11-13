// import React from "react";
// import '../../style/Dashboard.css'

// function Navbar() {
//   return (
//     <nav className="navbar">
//       <div className="navbar__logo">
//         Expense Tracker
//       </div>
//     </nav>
//   );
// }
// export default Navbar;

import React, { useEffect, useState } from "react";
import "../../style/Dashboard.css";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar__logo">Expense Tracker</div>

      <div className="navbar__user">
        {user ? <span>{user.name || "User"}</span> : <span>Welcome!</span>}
      </div>
    </nav>
  );
}

export default Navbar;
