import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { SideMenu } from "../SideMenu/SideMenu";

export default function PageTemplate() {
    return (
        <div style={{ position: "relative", height: "100%" }}>
            <Header />
            <SideMenu />
            <Outlet />
            <Footer />
        </div>
    )
} 