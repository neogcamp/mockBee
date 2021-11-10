import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [token, setToken] = useState("");
  const [projects, setProjects] = useState([]);
  const encodedToken = localStorage.getItem("token");
  useEffect(() => {
    (async () => {
      token && (await handleFetchProjects());
    })();
  }, [token]);

  const handleFetchProjects = async () => {
    try {
      const response = await axios.get(`/api/projects`, {
        headers: {
          authorization: encodedToken,
        },
      });
      setProjects(response.data.projects);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateProject = async (project) => {
    try {
      const response = await axios.post(
        "/api/projects",
        { project },
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      setProjects(response.data.projects);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditProject = async (project, projectId) => {
    try {
      const response = await axios.post(
        `/api/projects/${projectId}`,
        { project },
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      setProjects(response.data.projects);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const response = await axios.delete(`/api/projects/${projectId}`, {
        headers: {
          authorization: encodedToken,
        },
      });
      setProjects(response.data.projects);
    } catch (error) {
      console.log(error);
    }
  };

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
      <h2>Project Management</h2>
      <p>
        {token} {encodedToken}
      </p>
      <button onClick={() => signupHandler()}> Signup</button>
      <button onClick={() => loginHandler()}> Login</button>
      <button
        onClick={() =>
          handleCreateProject({
            title: "New Project",
            description: "Hell World",
          })
        }
      >
        {" "}
        Create Project
      </button>
      {projects &&
        projects.map((project, id) => {
          return (
            <div key={id}>
              <ul>
                <li>Title: {project.title}</li>
                <li>Description: {project.description} </li>
                <button
                  onClick={() =>
                    handleEditProject(
                      {
                        title: "Changed Title",
                        description: "Changed Description",
                      },
                      project._id
                    )
                  }
                >
                  Edit Project
                </button>
                <button onClick={() => handleDeleteProject(project._id)}>
                  Delete Project
                </button>

                {project.tasks &&
                  project.tasks.map((task, id) => (
                    <ul key={id}>
                      <li>Task Title: {task.title}</li>
                      <li>Task Title: {task.description}</li>
                      <li>Task Status: {task.status}</li>
                      <li>Task Priority: {task.priority}</li>
                      <li>
                        {task.labels &&
                          task.labels.map((label, id) => (
                            <ul key={id}>
                              <li>{label}</li>
                            </ul>
                          ))}
                      </li>
                    </ul>
                  ))}
              </ul>
            </div>
          );
        })}
    </div>
  );
}

export default App;
