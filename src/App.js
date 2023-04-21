import { Route, Routes } from "react-router-dom";
import AllTaskPage from "./pages/AllTaskPage";
import NewTaskPage from "./pages/NewTaskPage";
import UpdateTaskPage from "./pages/UpdateTaskPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import useLocalState from "./useLocalStorage";
function App() {
  const [user, setUser] = useLocalState("","user");
  return (
      <Routes>
        <Route path="/" element={<PrivateRoute><AllTaskPage /></PrivateRoute>} />
        <Route path="/new-task" element={<PrivateRoute><NewTaskPage /></PrivateRoute>} />
        <Route path="/tasks/:taskId" element={<PrivateRoute><UpdateTaskPage /></PrivateRoute>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
  );
}

export default App;
