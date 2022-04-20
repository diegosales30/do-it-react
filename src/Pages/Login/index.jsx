import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import { AnimationContainer, Background, Container, Content } from "./style";

import { FiMail, FiLock } from "react-icons/fi";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import api from "../../services/api";

import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Redirect } from "react-router-dom";

const Login = ({ authenticated, setAuthenticated }) => {
  const schema = yup.object().shape({
    email: yup.string().required("Campo obrigatório").email("email inválido"),
    password: yup
      .string()
      .min(8, "Mínimo  de 8 digitos")
      .required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  const onSubmit = (data) => {
    api
      .post("/user/login", data)
      .then((res) => {
        const { token } = res.data;

        localStorage.setItem("@Doit:token", JSON.stringify(token));
        //toast.success("Conta criada com sucesso");
        setAuthenticated(true);
        return history.push("/dashboard");
      })
      .catch((err) => {
        toast.error("Email ou senha inválidos");
      });
  };
  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Login</h1>

            <Input
              register={register}
              icon={FiMail}
              label="Email"
              type="text"
              placeholder="Seu melhor email"
              name="email"
              error={errors.email?.message}
            />
            <Input
              register={register}
              icon={FiLock}
              label="Senha"
              type="password"
              placeholder="Senha"
              name="password"
              error={errors.password?.message}
            />

            <Button type="submit">Enviar</Button>
            <p>
              não possui cadastro? Faça seu<Link to="/signup"> cadastro</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};
export default Login;
