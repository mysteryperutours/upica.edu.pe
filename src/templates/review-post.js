import React from 'react';
import graphql from 'graphql';
import Helmet from 'react-helmet';
import Header from '../components/Header';
import Img from 'gatsby-image';
import FacebookProvider, { Comments } from 'react-facebook';
import Content, { HTMLContent } from '../components/Content';
import ShareButtonsMobile from '../components/ShareButtonsMobile';
import ShareButtonsDesktop from '../components/ShareButtonsDesktop';

export const ReviewPostTemplate = ({
  content,
  contentComponent,
  description,
  featuredImage,
  title,
  path,
  helmet,
}) => {
  const PostContent = contentComponent || Content;
  const url = `https://magazine.ravereviewz.net/${path}`;

  return (
    <section className="section">
      {helmet || ''}
      <Header alt={title} image={featuredImage} />
      <div className="container content">
        <div className="columns">
          <div className="column column--icons is-2">
            <ShareButtonsDesktop />
          </div>
          <div className="column is-8">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <PostContent content={content} />
            <ShareButtonsMobile />
            <FacebookProvider className="fb-comments" appId="1994812974114706">
              <Comments href={url} width="100%" />
            </FacebookProvider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ({ data }) => {
  const { markdownRemark: post } = data;
  const url = `https://magazine.ravereviewz.net/${post.frontmatter.path}`;
  const image = post.frontmatter.featuredImage ? post.frontmatter.featuredImage.childImageSharp.sizes[0] : '';
  const meta = [
    { name: 'description', content: post.frontmatter.description },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: url },
    {
      property: 'og:image',
      content: image,
    },
    { property: 'og:title', content: post.frontmatter.title },
    { property: 'og:description', content: post.frontmatter.description },
    { name: 'twitter:card', content: 'summary' },
    {
      name: 'twitter:image:src',
      content: image,
    },
    { name: 'twitter:title', content: post.frontmatter.title },
    { name: 'twitter:description', content: post.frontmatter.description },
  ];

  return (
    <ReviewPostTemplate
      content={post.html}
      contentComponent={HTMLContent}
      description={post.frontmatter.description}
      helmet={
        <Helmet
          title={`${post.frontmatter.title} | Rave Reviewz Magazine`}
          meta={meta}
        />
      }
      title={post.frontmatter.title}
      featuredImage={post.frontmatter.featuredImage}
      path={post.frontmatter.path}
    />
  );
};

export const pageQuery = graphql`
  query ReviewPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        date(formatString: "MMMM DD, YYYY")
        title
        description
        featuredImage {
          childImageSharp {
            sizes(maxWidth: 1240) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`;
