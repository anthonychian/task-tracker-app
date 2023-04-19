import { Route, Routes } from "react-router-dom";
import AllTaskPage from "./pages/AllTaskPage";
import NewTaskPage from "./pages/NewTaskPage";
function App() {
  return (
      <Routes>
        <Route path="/" element={<AllTaskPage />} />
        <Route path="/new-task" element={<NewTaskPage />} />
      </Routes>
  );
}

export default App;
