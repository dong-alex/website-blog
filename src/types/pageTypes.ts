import { PageProps } from "gatsby"
import { Topic } from "./topics"

export interface Post {
  excerpt: string
  fields: {
    slug: string
  }
  frontmatter: {
    date: string
    title: string
    description: string
    tags?: Topic[]
  }
}

export interface TagGroup {
  fieldValue: Topic
  totalCount: number
}

export interface BlogProps extends PageProps {
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
