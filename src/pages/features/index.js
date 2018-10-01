import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import Script from 'react-load-script';
import graphql from 'graphql';

export default class ReviewsPage extends React.Component {
  handleScriptLoad() {
    if (typeof window !== `undefined` && window.netlifyIdentity) {
      window.netlifyIdentity.on('init', user => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/';
          });
        }
      });
    }
    window.netlifyIdentity.init();
  }

  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <section className="reviews">
        <Script
          url="https://identity.netlify.com/v1/netlify-identity-widget.js"
          onLoad={() => this.handleScriptLoad()}
        />
        <div className="container">
          <div className="content">
            <h1 className="has-text-weight-bold is-size-2">Latest Features</h1>
          </div>
          {posts
            .filter(post => post.node.frontmatter.templateKey === 'review-post')
            .map(({ node: post }) => (
              <div className="content review-preview" key={post.id}>
                <Img
                  className="img-preview"
                  alt={post.frontmatter.title}
                  sizes={post.frontmatter.featuredImage.childImageSharp.sizes}
                />
                <div className="text">
                  <p>
                    <Link className="post-link" to={post.frontmatter.path}>
                      {post.frontmatter.title}
                    </Link>
                    <br />
                    <small>{post.frontmatter.date}</small>
                  </p>
                  <p>
                    {post.frontmatter.description}
                    <br />
                    <br />
                    <Link
                      className="button is-small"
                      to={post.frontmatter.path}
                    >
                      Keep Reading →
                    </Link>
                  </p>
                </div>
              </div>
            ))}
        </div>
      </section>
    );
  }
}

export const pageQuery = graphql`
  query ReviewsQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          frontmatter {
            title
            description
            templateKey
            date(formatString: "MMMM DD, YYYY")
            path
            featuredImage {
              childImageSharp {
                sizes(maxWidth: 600) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`;
