import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import { AnimationContainer, Background, Container, Content } from "./style";

import { FiUser, FiMail, FiLock } from "react-icons/fi";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import api from "../../services/api";

import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Redirect } from "react-router-dom";

const Signup = ({ authenticated }) => {
  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    email: yup.string().required("Campo obrigatório").email("email inválido"),
    password: yup
      .string()
      .min(8, "Mínimo  de 8 digitos")
      .required("Campo obrigatório"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas são diferentes")
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

  const onSubmit = ({ name, email, password }) => {
    const user = { name, email, password };
    api
      .post("/user/register", user)
      .then((_) => {
        toast.success("Conta criada com sucesso");
        return history.push("/login");
      })
      .catch((err) => {
        toast.error("Erro ao criar conta, tente outro email");
        console.log(err);
      });
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Cadastro</h1>
            <Input
              register={register}
              icon={FiUser}
              label="Nome"
              type="text"
              placeholder="Seu nome"
              name="name"
              error={errors.name?.message}
            />
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
            <Input
              register={register}
              icon={FiLock}
              label="Confirme sua senha"
              type="password"
              placeholder="Confirme sua senha"
              name="passwordConfirm"
              error={errors.passwordConfirm?.message}
            />
            <Button type="submit">Enviar</Button>
            <p>
              Já é cadastrado? Faça <Link to="/login">login</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};
export default Signup;
