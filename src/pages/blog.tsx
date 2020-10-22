import React, {
  FunctionComponent,
  ChangeEvent,
  useState,
  useEffect,
} from "react"
import { Link, graphql, PageProps } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Post, TagGroup, Topic, Topics } from "../types"
import TagEntry from "../components/TagEntry"
import styled from "styled-components"

interface BlogProps extends PageProps {
  data: {
    site: {
      siteMetadata: {
        title?: string
      }
    }
    allMarkdownRemark: {
      nodes: Post[]
      group: TagGroup[]
    }
  }
}

const BlogHeader = styled.header`
  margin: 1rem 0;
  border: 2px solid;
  border-image: linear-gradient(
      90deg,
      rgba(60, 74, 83, 0),
      rgba(60, 74, 83, 0.5),
      rgba(60, 74, 83, 0)
    )
    1;
  border-bottom: none;
  border-left: none;
  border-right: none;
`

const Blog: FunctionComponent<BlogProps> = ({ data, location }) => {
  const [selectedGroup, setSelectedGroup] = useState<Topic | "None">("None")
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(
    data.allMarkdownRemark.nodes
  )
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const tagGroups = data.allMarkdownRemark.group

  useEffect(() => {
    if (selectedGroup === "None") {
      setFilteredPosts(posts)
    } else {
      setFilteredPosts(
        posts.filter(post => {
          return (
            post.frontmatter.tags &&
            post.frontmatter.tags.length > 0 &&
            post.frontmatter.tags.includes(selectedGroup)
          )
        })
      )
    }
  }, [selectedGroup])

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  const handleSelectTagGroup = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedGroup(event.target.value as Topic) // enum of Topics
  }

  const handleResetFilter = () => {
    setSelectedGroup("None")
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Link to="/">Go to portfolio section</Link>
      <BlogHeader />
      <section>
        <select onChange={handleSelectTagGroup}>
          <option value="None" selected={selectedGroup === "None"}>
            Select a specific topic
          </option>
          {tagGroups.map(({ fieldValue, totalCount }: TagGroup, i: number) => (
            <option value={fieldValue} selected={selectedGroup === fieldValue}>
              {Topics[fieldValue]} - {totalCount}
            </option>
          ))}
        </select>
        <button onClick={handleResetFilter}>Reset Filter</button>
      </section>
      <ol style={{ listStyle: `none` }}>
        {filteredPosts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
                <TagEntry tags={post.frontmatter.tags} />
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/blog/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          tags
          description
        }
      }
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
