module.exports = {
  siteMetadata: {
    title: "Gatsby + Netlify CMS Starter"
  },
  plugins: [
    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: "tomato",
        showSpinner: true
      }
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/img`,
        name: "images"
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-relative-images-v2`
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 300
            }
          }
        ]
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`
      }
    },
    "gatsby-plugin-netlify" // make sure to keep it last in the array
  ]
};
