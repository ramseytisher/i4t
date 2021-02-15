import { Link } from "gatsby";
import React, { useState, useEffect } from "react";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";

import { Box, Layer, Button, Header as GrommetHeader, Heading } from "grommet";
import { Menu, LinkPrevious } from "grommet-icons";

const Header = ({ siteTitle }) => {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      console.log("Auth data: ", authData);
      setUser(authData);
    });
  }, []);

  return (
    <GrommetHeader justify="between" gap="large">
      <Box fill direction="row" justify="end">
        <Heading margin={{ horizontal: "medium", vertical: "small"}} >
          <Link
            to="/"
            style={{
              color: `#444444`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </Heading>
        <Button icon={<Menu />} onClick={() => setShow(true)} />
      </Box>

      {show && (
        <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
          position="right"
          full="vertical"
        >
          {user && (
            <Box width="medium" pad="medium">
              <Box pad="small" direction="row" justify="between">
                <Button
                  icon={<LinkPrevious />}
                  onClick={() => {
                    setShow(false);
                  }}
                />
                <AmplifySignOut />
              </Box>
            </Box>
          )}
        </Layer>
      )}
    </GrommetHeader>
  );
};

export default Header;
