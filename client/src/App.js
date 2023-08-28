import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Table from "./components/Table";

function App() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("http://127.0.0.1:3002/");
      const data = response.json();
      resolve(data);
    });

    promise.then((d) => {
      console.log("data: ", d);
      setIssues(d.issues);
    });
  }

  // const fetchAPI = async () => {
  //   const response = await (await fetch("http://localhost:3002")).json();
  //   console.log(response.issues);
  //   setIssues(response.issues);
  //   //console.log("issues: ", issues);
  // };

  return (
    <div className="App">
      <NavBar />
      <Table issueList={issues} />
      <button onClick={fetchData}>Fetch</button>
    </div>
  );
}

export default App;
