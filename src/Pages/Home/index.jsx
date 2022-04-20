import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Button from "../../Components/Button";
import { Container, ContentBox } from "./style";

const Home = ({ authenticated }) => {
  const histoty = useHistory();

  const handleNavigation = (path) => {
    return histoty.push(path);
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Container>
      <ContentBox>
        <h1>
          do<span>.</span>it
        </h1>
        <span>Organize-se de forma fácil e efetiva</span>
        <div>
          <Button onClick={() => handleNavigation("/signup")} whiteSchema>
            Cadastre-se
          </Button>
          <Button onClick={() => handleNavigation("/login")}>Login</Button>
        </div>
      </ContentBox>
    </Container>
  );
};
export default Home;
