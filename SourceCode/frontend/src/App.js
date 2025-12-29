import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Feed from "./pages/Feed";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route path="/" element={<Feed />}/>
            </Routes>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
