module.exports = {
  siteMetadata: {
    title: "i4t",
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    `gatsby-transformer-csv`,
    "gatsby-plugin-styled-components",
  ],
};
