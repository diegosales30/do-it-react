import { Container } from "./style";
import { FiCalendar, FiClipboard } from "react-icons/fi";
import Button from "../Button";

const Card = ({ title, date, onClick }) => {
  return (
    <Container>
      <span>
        <FiClipboard /> {title}
      </span>
      <hr />
      <time>
        <FiCalendar /> {date}
      </time>
      <Button onClick={onClick}>Concluir</Button>
    </Container>
  );
};
export default Card;
