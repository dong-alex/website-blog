import React, { FunctionComponent } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image, { FixedObject } from "gatsby-image"

interface BioProps {}
interface BioQuery {
  avatar: {
    childImageSharp: {
      fixed: FixedObject
    }
  }
  site: {
    siteMetadata: {
      author: {
        name: string
        summary: string
      }
      social: {
        twitter: string
      }
    }
  }
}

const Bio: FunctionComponent<BioProps> = () => {
  const data: BioQuery = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const avatar = data?.avatar?.childImageSharp?.fixed

  return (
    <div className="bio">
      {avatar && (
        <Image
          fixed={avatar}
          alt={author?.name || ``}
          className="bio-avatar"
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      )}
      {author?.name && (
        <p>
          Written by <strong>{author.name}</strong> | {author?.summary || null}
        </p>
      )}
    </div>
  )
}

export default Bio
