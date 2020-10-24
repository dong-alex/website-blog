import React, { FunctionComponent } from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

interface SEOProps {
  description?: string
  lang?: string
  meta?: Array<any>
  title: string
  image?: string // only src from a gatsby fixed
}

const SEO: FunctionComponent<SEOProps> = ({
  description = "",
  lang = "en",
  meta = [],
  title,
  image,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
            author {
              name
            }
            siteUrl
            featuredImage
          }
        }
      }
    `
  )

  const metaDescription: string = description || site.siteMetadata.description
  const defaultTitle: string = site.siteMetadata?.title
  const featuredImage: string = image || null
  const author: string = site.siteMetadata?.author.name

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: "author",
          content: author,
        },
      ].concat(meta)}
    >
      {featuredImage && (
        <meta
          property="og:image"
          content={`${site.siteMetadata?.siteUrl}${featuredImage}`}
        />
      )}
    </Helmet>
  )
}

export default SEO
