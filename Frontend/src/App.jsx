import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Home } from "./components/Home";
import { Create } from "./components/Create";
import { Read } from "./components/Read";
import { Update } from "./components/Update";
import Delete from "./components/Delete";

function App() {
  return (
    <>
      <Router>
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/notes/create" element={<Create />}></Route>
          <Route path="/notes/read/:id" element={<Read />}></Route>
          <Route path="/notes/update/:id" element={<Update />} />
          <Route path="/notes/delete/:id" element={<Delete />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
