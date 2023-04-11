import { useImperitaveHandle } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function LandingNav() {
    const path = window.location.pathname

    return (
        <nav className="nav">
            <Link to="/dashboard" className="site-title">
                BEARMAX
            </Link>

            <ul>
                <CustomLink to="/dashboard">Main Dashboard</CustomLink>
                <CustomLink to="/report-hist">Report History</CustomLink>
                <CustomLink to="/how-to-use">How To Use</CustomLink>
                <CustomLink to="/settings">Settings</CustomLink>
            </ul>
        </nav>
    )
}

function CustomLink({ to, children, ...props }) {
    //const path = window.location.pathname

    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end:true });

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {... props}>{children}</Link>
        </li>
    )
}