import React, { FunctionComponent } from "react"
import { graphql, useStaticQuery } from "gatsby"
import moment from "moment"
import styled from "styled-components"

const Header = styled.section`
  display: flex;
  flex-drection: row;
  justify-content: space-between;
`

const MinorSpan = styled.span`
  font-size: 0.8rem;
`

const MinorLink = styled.a`
  font-size: 0.8rem;
  margin-left: 1rem;
`

const MinorDescription = styled.span`
  font-size: 0.8rem;
`

const ProjectSection: FunctionComponent<{}> = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/data/projects/" } }
        sort: { fields: frontmatter___projects___startDate, order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              projects {
                name
                description
                startDate
                github
              }
            }
          }
        }
      }
    }
  `)

  const projects = data.allMarkdownRemark.edges[0].node.frontmatter.projects

  return (
    <div>
      {projects.map(({ name, description, startDate, github }: any) => (
        <section style={{ margin: "2rem 0" }}>
          <Header>
            <span>
              {name}
              <MinorLink
                href={github}
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </MinorLink>
            </span>
            <MinorSpan>{moment(startDate).format("MMM YYYY")}</MinorSpan>
          </Header>
          <MinorDescription>{description}</MinorDescription>
        </section>
      ))}
    </div>
  )
}

export default ProjectSection
