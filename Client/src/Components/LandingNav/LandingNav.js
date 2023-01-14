import { useImperitaveHandle } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function LandingNav() {
    const path = window.location.pathname

    return (
        <nav className="nav">
            <Link to="/" className="site-title">
                B.E.A.R.M.A.X.
            </Link>

            <ul>
                <CustomLink to="/">Home</CustomLink>
                <CustomLink to="/about-us">About BearMax</CustomLink>
                <CustomLink to="/how-to-use">How to Use BearMax</CustomLink>
                <CustomLink to="/contact-us">Contact Us</CustomLink>
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