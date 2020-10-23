import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Portfolio from "./portfolio"

const LandingPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const isBrowser = typeof window !== `undefined`

  return (
    <Layout location={isBrowser ? location : {}} title={siteTitle}>
      <SEO title="Portfolio" image={data.image.childImageSharp.fluid.src} />
      <Link to="blog">Go to blog section</Link>
      <Portfolio />
    </Layout>
  )
}

export default LandingPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
    image: file(absolutePath: { regex: "/featured-image.jpg/" }) {
      childImageSharp {
        fluid(fit: COVER) {
          src
        }
      }
    }
  }
`
