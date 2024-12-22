import { useContext } from "react";

import { Dialog, Box, Typography, List, ListItem, styled } from "@mui/material";

import { qrCodeImage } from "../../constants/data";
import { AccountContext } from "../../context/AccountProvider";
import { addUser } from "../../service/api";

import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const Component = styled(Box)`
  display: flex;
`;

const QRCode = styled("img")({
  height: "264px",
  width: "264px",
  margin: "56px 0 0 147px",
});

const Title = styled(Typography)`
  font-size: 26px;
  color: #525252;
  font-weight: 300;
  font-family: inherit;
  margin-bottom: 25px;
`;

const StyledList = styled(List)`
  & > li {
    padding: 0;
    margin-top: 15px;
    font-size: 18px;
    line-height: 28px;
    color: #4a4a4a;
  }
`;

const Container = styled(Box)`
  padding: 56px 0px 56px 56px;
`;

const dialogstyle = {
  height: "96%",
  marginTop: "12%",
  //   width: '60%',
  width: "1000px",
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "none",
  overflow: "hidden",
};

const LoginDialog = () => {
  const { setAccount } = useContext(AccountContext);

  const onLoginSuccess = async (res) => {
    const decoded = jwt_decode(res.credential);
    setAccount(decoded);
    await addUser(decoded);
  };

  const onLoginError = (err) => {
    console.log(err);
  };
  return (
    <Dialog open={true} PaperProps={{ sx: dialogstyle }} hideBackdrop={true}>
      <Component>
        <Container>
          <Title>The Applicatin is on your computer</Title>
          <StyledList>
            <ListItem>1. Open on Laptop And Start</ListItem>
            <ListItem>
              2. Login in to your Google account.
            </ListItem>
            <ListItem>
              3. Share chats , files and a memorable time.
            </ListItem>
            <ListItem>
            </ListItem>
            <ListItem>
                  <b>A project by Prajna,Pallavi,Pramitha and Saakshi</b>             </ListItem>
          </StyledList>
        </Container>

        <Box style={{ position: "relative" }}>
          <QRCode src={qrCodeImage} alt="QR Code" />
          <Box
            style={{
              position: "absolute",
              top: "50%",
              width: "40%",
              transform: "translateX(108%) translateY(-25%)",
            }}
          >
            <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError} />
          </Box>
        </Box>
      </Component>
    </Dialog>
  );
};

export default LoginDialog;
