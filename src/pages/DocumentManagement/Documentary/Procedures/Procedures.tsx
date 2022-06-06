import { useParams } from "react-router-dom";
import Container from "../../../../ui/Container";

export const Procedures = () => {
  let { id } = useParams();

  return (
    <Container>
      <p>Procedures</p> {id}
    </Container>
  );
};
