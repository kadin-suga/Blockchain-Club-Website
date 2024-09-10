import { Route, Routes } from "react-router-dom";
import { HOME_NAVIGATION_LINKS } from "./libs/consts/Routes.Jsx";

function App() {
  return (
      <Routes>
        {HOME_NAVIGATION_LINKS.map((item) => (
          <Route
            key={item.key}
            path={item.path}
            element = {item.element}
          />
        ))}
      </Routes>
  );
}

export default App;
