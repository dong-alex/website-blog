import React, { FunctionComponent } from "react"
import { Link, graphql } from "gatsby"
import { FluidObject } from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Portfolio from "./portfolio"

interface LandingPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
    allMarkdownRemark: {
      nodes: {
        except: string
        fields: {
          slug: string
        }
        frontmatter: {
          date: string
          title: string
          description: string
        }
      }
    }
    image: {
      childImageSharp: {
        fluid: FluidObject
      }
    }
  }
}

const LandingPage: FunctionComponent<LandingPageProps> = ({ data }) => {
  const siteTitle: string = data.site.siteMetadata?.title || `Title`

  return (
    <Layout title={siteTitle}>
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
