import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { SideMenu } from "../SideMenu/SideMenu";

export default function PageTemplate() {
    return (
        <div style={{ "position": "relative" }}>
            <Header />
            <SideMenu />
            <Outlet />
            <Footer />
        </div>
    )
} 