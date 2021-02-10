import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";

import Header from "./header";
import "./layout.css";
import { Grommet, Anchor, Box, Footer, Text } from "grommet";
import { grommet } from "grommet/themes";

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <Grommet
      theme={grommet}
      full
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header siteTitle={data.site.siteMetadata.title} />
      <AmplifyAuthenticator usernameAlias="email">
        <Box as="main" pad="medium" flex overflow="auto">
          {children}
        </Box>
      </AmplifyAuthenticator>
      <Footer background="light-4" justify="center" pad="small">
        <Text textAlign="center" size="small">
          © {new Date().getFullYear()}, Built with
          {` `}
          <Anchor href="https://www.gatsbyjs.org">Gatsby</Anchor>
          {` and `}
          <Anchor href="https://v2.grommet.io">Grommet</Anchor>
        </Text>
      </Footer>
    </Grommet>
  );
};

export default Layout;
