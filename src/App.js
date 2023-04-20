import { Route, Routes } from "react-router-dom";
import AllTaskPage from "./pages/AllTaskPage";
import NewTaskPage from "./pages/NewTaskPage";
import UpdateTaskPage from "./pages/UpdateTaskPage";
function App() {
  return (
      <Routes>
        <Route path="/" element={<AllTaskPage />} />
        <Route path="/new-task" element={<NewTaskPage />} />
        <Route path="/tasks/:taskId" element={<UpdateTaskPage />} />
      </Routes>
  );
}

export default App;
