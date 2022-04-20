import { Redirect } from "react-router-dom";
import { Container, InputContainer, TasksContainer } from "./style";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

import { useForm } from "react-hook-form";

import { FiEdit2 } from "react-icons/fi";
import Card from "../../Components/Card";
import { useEffect, useState } from "react";

import api from "../../services/api";
import { toast } from "react-toastify";

const Dashboard = ({ authenticated }) => {
  const [tasks, setTasks] = useState([]);
  const [token] = useState(
    JSON.parse(localStorage.getItem("@Doit:token")) || ""
  );
  const { register, handleSubmit } = useForm();

  const loadTask = () => {
    api
      .get("/task", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          completed: false,
        },
      })
      .then((res) => {
        const apiTasks = res.data.data.map((task) => ({
          ...task,
          createdAt: new Date(task.createdAt).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
        }));
        setTasks(apiTasks);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadTask();
  }, []);

  const onSubmit = ({ task }) => {
    if (!task) {
      return toast.error("Complete o campo para enviar uma tarefa");
    }

    api
      .post(
        "/task",
        {
          description: task,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => loadTask());
  };

  const handleCompletedTask = (id) => {
    const newTasks = tasks.filter((task) => task._id !== id);

    api
      .put(
        `/task/${id}`,
        {
          completed: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => setTasks(newTasks));
  };

  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <Container>
      <InputContainer onSubmit={handleSubmit(onSubmit)}>
        <time>7 de maio de 2021</time>
        <section>
          <Input
            icon={FiEdit2}
            placeholder="Nova tarefa"
            register={register}
            name="task"
          />
          <Button type="submit">Adicionar</Button>
        </section>
      </InputContainer>
      <TasksContainer>
        {tasks.map((task) => (
          <Card
            key={task._id}
            title={task.description}
            date={task.createdAt}
            onClick={() => handleCompletedTask(task._id)}
          />
        ))}
      </TasksContainer>
    </Container>
  );
};
export default Dashboard;
