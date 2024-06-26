import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Books from './pages/Books'
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Footer from "./components/Footer"
import Recommend from "./pages/Recommend";
import SingleBook from './pages/SingleBook'
import Edit from './pages/Edit'

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/books/:id" element={<SingleBook />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
