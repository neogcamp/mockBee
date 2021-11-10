import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [token, setToken] = useState("");
  const [projects, setProjects] = useState([]);
  const [archives, setArchives] = useState([]);
  const encodedToken = localStorage.getItem("token");
  useEffect(() => {
    (async () => {
      token && (await handleFetchProjects());
      token && (await handleFetchArchives());
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

  const handleFetchLabels = async (projectId) => {
    try {
      const response = await axios.get(`/api/labels/${projectId}`, {
        headers: {
          authorization: encodedToken,
        },
      });
      console.log(response.data.labels);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateLabel = async (projectId, labelName) => {
    try {
      const response = await axios.post(
        `/api/labels/${projectId}/${labelName}`,
        {},
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      console.log(response.data.project);
      await handleFetchProjects();
    } catch (error) {
      console.log(error);
    }
  };
  const handleArchiveTask = async (projectId, taskId) => {
    try {
      const response = await axios.post(
        `/api/archives/${projectId}/${taskId}`,
        {},
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      setArchives(response.data.archives);
      await handleFetchArchives();
      await handleFetchProjects();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteLabel = async (projectId, labelName) => {
    try {
      const response = await axios.delete(
        `/api/labels/${projectId}/${labelName}`,
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      console.log(response.data.project);
      await handleFetchProjects();
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
  const handleCreateTask = async (projectId, task) => {
    try {
      const response = await axios.post(
        `/api/tasks/${projectId}`,
        { task },
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      console.log(response.data.tasks);
      await handleFetchProjects();
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditTask = async (projectId, taskId, task) => {
    try {
      const response = await axios.post(
        `/api/tasks/${projectId}/${taskId}`,
        { task },
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      console.log(response.data.tasks);
      await handleFetchProjects();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteTask = async (projectId, taskId) => {
    try {
      const response = await axios.delete(`/api/tasks/${projectId}/${taskId}`, {
        headers: {
          authorization: encodedToken,
        },
      });
      console.log(response.data.tasks);
      await handleFetchProjects();
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
  const handleRestoreFromArchives = async (taskId) => {
    try {
      const response = await axios.post(
        `/api/archives/restore/${taskId}`,
        {},
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      setArchives(response.data.archives);
      await handleFetchArchives();
      await handleFetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteFromArchives = async (taskId) => {
    try {
      const response = await axios.delete(`/api/archives/delete/${taskId}`, {
        headers: {
          authorization: encodedToken,
        },
      });
      setArchives(response.data.archives);
      await handleFetchArchives();
      await handleFetchProjects();
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
                {project.labels &&
                  project.labels.map((label, id) => (
                    <div key={id}>{label}</div>
                  ))}
                <button onClick={() => handleFetchLabels(project._id)}>
                  Fetch Project Labels
                </button>
                <button
                  onClick={() => handleCreateLabel(project._id, "New Label")}
                >
                  Create Project Label
                </button>
                <button
                  onClick={() => handleDeleteLabel(project._id, "New Label")}
                >
                  Delete Project Label
                </button>
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
                <button
                  onClick={() =>
                    handleCreateTask(project._id, {
                      title: "My Task",
                      description: "LOL this is fun",
                      status: "active",
                      priority: "high",
                    })
                  }
                >
                  Create Task
                </button>

                {project.tasks &&
                  project.tasks.map((task, id) => (
                    <ul key={id}>
                      <li>Task Title: {task.title}</li>
                      <li>Task Description: {task.description}</li>
                      <li>Task Status: {task.status}</li>
                      <li>Task Priority: {task.priority}</li>
                      <button
                        onClick={() => handleArchiveTask(project._id, task._id)}
                      >
                        Archive Task
                      </button>
                      <button
                        onClick={() =>
                          handleEditTask(project._id, task._id, {
                            status: "inactive",
                            priority: "low",
                          })
                        }
                      >
                        Edit Task
                      </button>
                      <button
                        onClick={() => handleDeleteTask(project._id, task._id)}
                      >
                        Delete Task
                      </button>
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
      {console.log(archives)}
      Archives
      {archives.map((task, id) => {
        return (
          <div key={id}>
            {task.title}{" "}
            <button onClick={() => handleRestoreFromArchives(task._id)}>
              Restore From Archives
            </button>
            <button onClick={() => handleDeleteFromArchives(task._id)}>
              Delete From Archives
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
