import { Link } from "gatsby";
import React, { useState, useEffect } from "react";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";

import { Box, Header as GrommetHeader, Heading } from "grommet";

const Header = ({ siteTitle }) => {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      console.log("Auth data: ", authData);
      setUser(authData);
    });
  }, []);

  return (
    <GrommetHeader background="dark-1" justify="center" gap="large">
      <Heading>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </Heading>
      {user && (
        <Box>
          <AmplifySignOut />
        </Box>
      )}
    </GrommetHeader>
  );
};

export default Header;
