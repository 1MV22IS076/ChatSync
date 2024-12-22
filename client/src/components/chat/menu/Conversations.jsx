import { useContext, useEffect, useState, userContext } from "react";

import { getUsers } from "../../../service/api";
import { AccountContext } from "../../../context/AccountProvider";
import { Box, Divider, styled } from "@mui/material";

// components
import Conversation from "./Conversation";

const Component = styled(Box)`
    height: 81vh;
    overflow: overlay;
`;

const StyledDivider = styled(Divider)`
    margin: 0 0 0 70px;
    background: #e9edef;
    opacity: 0.6;
`;

const Conversations = ({text}) => {
  const [users, setUsers] = useState([]);

  const { account, socket, setActiveUsers} = useContext(AccountContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await getUsers();

        // Check if response is valid before attempting to filter
        if (Array.isArray(response)) {
          const filteredData = response.filter(user =>
            user.name.toLowerCase().includes(text.toLowerCase())
          );
          setUsers(filteredData);
        } else {
          console.error("Response is not an array:", response);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData(); // Call the fetchData function to load users

  }, [text]);

  useEffect(() => {
    if (socket.current && account) {
      socket.current.emit('addUsers', account);
      socket.current.on('getUsers', (users) => {
        setActiveUsers(users);
      });
    }
  }, [account, socket, setActiveUsers]);

  return (
    <Component>
      {
        users.map((user) => (
            user.sub !== account.sub &&
            <>
                <Conversation user={user} />
                <StyledDivider/>
            </>
            
        ))
      }
    </Component>
  );
};

export default Conversations;
