import { createGlobalStyle } from "styled-components";
import ToDoList from "./components/ToDoList";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const GlobalStyle = createGlobalStyle``;

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<ToDoList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
