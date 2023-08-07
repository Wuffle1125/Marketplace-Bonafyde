import CommonSection from "../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import LoginModal from "../components/ui/LoginModal/LoginModal";

const Login = () => {
  return (
    <>
      <CommonSection title={"Explore Bonafyde"} />;
      <section>
        <LoginModal />
      </section>
    </>
  );
};

export default Login;
