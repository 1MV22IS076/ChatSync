import { emptyChatImage } from "../../../constants/data";
import { Box, Typography, styled, Divider } from "@mui/material";

const Component = styled(Box)`
  background: #f8f9fa;
  padding: 30px 0;
  text-align: center;
  height: 100vh;
`;
const Container = styled(Box)`
  pading: 0 200px;
`;
const Image = styled('img')({
    width: 400,
    marginTop: 100
})

const Title = styled(Typography)`
  font-size: 32px;
  margin: 25px 0 10px 0;
  font-family: inherit;
  font-weight: 300;
  color: #41525d;
`;

const SubTitle = styled(Typography)`
  font-size: 14px;
  color: #667781;
  font-weight: 400;
  font-family: inherit;
`;
const StyledDivider = styled(Divider)`
  margin: 400px 0;
  opacity: 0.4;
`;
const EmptyChat = () => {
  return (
    <Component>
      <Container>
        <Image src={emptyChatImage} alt="image" />
        <Title></Title>
        <SubTitle>Connect and Use <br /> </SubTitle>
        <SubTitle>Use this application to send and receive messages, files in real-time</SubTitle>
        <StyledDivider/>
      </Container>
    </Component>
  );
};

export default EmptyChat;
