import React, { useState, useEffect } from 'react';
import axios from "axios";
import KanbanBoard from "./components/KanbanBoard";
import Dropdown from "./components/Dropdown";
import './App.css';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  // const [grouping, setGrouping] = useState("status");
  // const [ordering, setOrdering] = useState("priority");
  const [viewState, setViewState] = useState(() => {
    const savedState = JSON.parse(localStorage.getItem("viewState"));
    return savedState || {
      grouping: "status",
      ordering: "priority",
    };
  });

  useEffect(() => {
    axios.get("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => {
        setTickets(response.data.tickets);
        setUsers(response.data.users);
      })
      .catch((error) => console.error("Error fetching tickets:", error));
  }, []);

  useEffect(() => {
    localStorage.setItem("viewState", JSON.stringify(viewState));
  }, [viewState]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment").then((res) => res.json());
  //     setTickets(data.tickets);
  //     setUsers(data.users);
  //   };

  //   fetchData();

  //   const savedState = JSON.parse(localStorage.getItem("viewState"));
  //   if (savedState) setViewState(savedState);
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("viewState", JSON.stringify(viewState));
  // }, [viewState]);

  return (
    <div className='app'>
      <Dropdown viewState={viewState} setViewState={setViewState} />
      <KanbanBoard tickets={tickets} users={users} viewState={viewState} />
    </div>
  );
};

export default App;