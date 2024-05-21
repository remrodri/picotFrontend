import adminBackground from "../assets/images/adminBackground.jpg";
import * as stylex from "@stylexjs/stylex";
import MenuComponent from "../components/MenuComponent";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const styles = stylex.create({
  base: () => ({
    backgroundImage: `url(${adminBackground})`,
    height: "100dvh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    padding: "1rem",
    
  }),
  menuContainer: () => ({
    height: "100%",
    
  }),
  componentContainer: () => ({
    height: "100%",
    width: "100%",
    marginLeft:'1rem'
  })
})
function AdminPage() {
  const [currentComponent, setCurrentComponent] = useState(null);
  const showComponent = (component) => {
    if (currentComponent) {
      setCurrentComponent(null);
    }
    setCurrentComponent(component);
  };

  return (
    <div {...stylex.props(styles.base())}>
      <div {...stylex.props(styles.menuContainer())}></div>
      <MenuComponent showComponent={showComponent} />
      <div {...stylex.props(styles.componentContainer())}>
        <Outlet/>
      </div>
    </div>
  )
}
export default AdminPage;