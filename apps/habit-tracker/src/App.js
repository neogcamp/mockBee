import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [token, setToken] = useState("");
  const [habits, setHabits] = useState([]);
  const [labels, setLabels] = useState([]);
  const [archives, setArchives] = useState([]);
  const encodedToken = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      token && handleFetchHabits();
      token && handleFetchLabels();
      token && handleFetchArchives();
    })();
  }, [token]);

  const handleFetchHabits = async () => {
    try {
      const response = await axios.get(`/api/habits`, {
        headers: {
          authorization: encodedToken,
        },
      });
      setHabits(response.data.habits);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFetchArchives = async () => {
    try {
      const response = await axios.get(`/api/archives`, {
        headers: {
          authorization: encodedToken,
        },
      });
      setArchives(response.data.archives);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchLabels = async () => {
    try {
      const response = await axios.get(`/api/labels`, {
        headers: {
          authorization: encodedToken,
        },
      });
      setLabels(response.data.labels);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateHabit = async (habit) => {
    try {
      const response = await axios.post(
        `/api/habits`,
        { habit },
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      setHabits(response.data.habits);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreateLabel = async (labelName) => {
    try {
      const response = await axios.post(
        `/api/labels/${labelName}`,
        {},
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      setLabels(response.data.labels);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteHabit = async (habitId) => {
    try {
      const response = await axios.delete(`/api/habits/${habitId}`, {
        headers: {
          authorization: encodedToken,
        },
      });
      setHabits(response.data.habits);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteArchive = async (habitId) => {
    try {
      const response = await axios.delete(`/api/archives/${habitId}`, {
        headers: {
          authorization: encodedToken,
        },
      });
      setArchives(response.data.archives);
    } catch (error) {
      console.log(error);
    }
  };
  const handleArchiveHabit = async (habitId) => {
    try {
      const response = await axios.post(
        `/api/archives/${habitId}`,
        {},
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      setArchives(response.data.archives);
      setHabits(response.data.habits);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRestoreArchive = async (habitId) => {
    try {
      const response = await axios.post(
        `/api/archives/restore/${habitId}`,
        {},
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      setArchives(response.data.archives);
      setHabits(response.data.habits);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteLabel = async (labelName) => {
    try {
      const response = await axios.delete(`/api/habits/${labelName}`, {
        headers: {
          authorization: encodedToken,
        },
      });
      setLabels(response.data.labels);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditHabit = async (habit, habitId) => {
    try {
      const response = await axios.post(
        `/api/habits/${habitId}`,
        { habit },
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      setHabits(response.data.habits);
    } catch (error) {
      console.log(error);
    }
  };

  // signup API call
  const signupHandler = async () => {
    try {
      const response = await axios.post("/api/auth/signup", {
        firstName: "Soham",
        lastName: "Shah",
        email: "sohamshah456@gmail.com",
        password: "123",
      });
      localStorage.setItem("token", response.data.encodedToken);
      setToken(response.data.encodedToken);
    } catch (error) {
      console.log(error);
    }
  };

  // login API call
  const loginHandler = async () => {
    try {
      const response = await axios.post("/api/auth/login", {
        email: "sohamshah456@gmail.com",
        password: "123",
      });
      localStorage.setItem("token", response.data.encodedToken);
      setToken(response.data.encodedToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      {token}
      {encodedToken}
      <div>
        <button onClick={() => signupHandler()}> Signup</button>
        <button onClick={() => loginHandler()}> Login</button>
      </div>
      <div>
        <button
          onClick={() =>
            handleCreateHabit({
              title: "My First Habit",
              description: "Damn",
              priority: "high",
              status: "active",
            })
          }
        >
          Create Habit
        </button>
      </div>
      <div>
        {habits &&
          habits.map((habit, id) => {
            return (
              <ul key={id}>
                <li>{habit.title} </li>
                <li>{habit.priority}</li>
                <li>{habit.status}</li>
                <li>
                  <button onClick={() => handleDeleteHabit(habit._id)}>
                    Delete Habit
                  </button>
                </li>
                <li>
                  <button onClick={() => handleArchiveHabit(habit._id)}>
                    Archive Habit
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      handleEditHabit(
                        {
                          title: "My Edited Habit",
                          description: "Damn",
                        },
                        habit._id
                      )
                    }
                  >
                    Edit Habit
                  </button>
                </li>
                <li>
                  <ul>
                    {habit.labels.map((label, id) => (
                      <li key={id}>{label}</li>
                    ))}
                  </ul>
                </li>
              </ul>
            );
          })}
        <h2>Labels</h2>
        {labels &&
          labels.map((label, id) => {
            return (
              <p key={id}>
                {label}{" "}
                <button onClick={() => handleDeleteLabel(label)}>
                  Delete Label
                </button>
              </p>
            );
          })}
        <button onClick={() => handleCreateLabel("label22")}>
          Create Label
        </button>
      </div>
      <div>
        <h1>Archives</h1>
        {archives &&
          archives.map((archive, id) => (
            <p key={id}>
              {archive.title}{" "}
              <button
                onClick={() => {
                  handleDeleteArchive(archive._id);
                }}
              >
                Delete From Archive
              </button>{" "}
              <button
                onClick={() => {
                  handleRestoreArchive(archive._id);
                }}
              >
                Restore From Archive
              </button>
            </p>
          ))}
      </div>
    </div>
  );
}

export default App;
