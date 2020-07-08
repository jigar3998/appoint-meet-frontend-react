import React from 'react'
import NavBarApplication from "../NavBar/NavBarApplication";

function Dashboard() {
    return (
        <div>
            <NavBarApplication dropdowntype={"customer"}/>
            Customer Dashboard
        </div>
    )
}

export default Dashboard
