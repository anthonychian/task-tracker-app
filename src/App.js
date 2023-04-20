import { Route, Routes } from "react-router-dom";
import AllTaskPage from "./pages/AllTaskPage"
import NewTaskPage from "./pages/NewTaskPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route path="/:username" element={<AllTaskPage />}/>
      <Route path="/new-task" element={<NewTaskPage />} />
    </Routes>
  );
}

export default App;
