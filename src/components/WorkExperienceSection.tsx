import React, { FunctionComponent } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { WorkExperience } from "../pages/portfolio"
import moment from "moment"
import styled from "styled-components"

export type WorkExperienceSectionProps = {
  data: WorkExperience
}

const ExperienceSection = styled.div`
  margin: 2rem 0;
`

const Header = styled.section`
  display: flex;
  flex-drection: row;
  justify-content: space-between;
`

const Position = styled.section``

const MinorSpan = styled.span`
  font-size: 0.8rem;
`

const WorkExperienceSection: FunctionComponent<{}> = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/data/experiences/" } }
        sort: { fields: frontmatter___experiences___endDate, order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              experiences {
                company
                current
                endDate(formatString: "YYYY-MM")
                position
                startDate(formatString: "YYYY-MM")
                values
              }
            }
          }
        }
      }
    }
  `)

  const experiences = data.allMarkdownRemark.edges[0].node.frontmatter.experiences.sort(
    (a, b) => {
      // current is always first then sort by date
      if (a.current || b.current) {
        return 1
      }

      return moment(b.endDate).diff(moment(a.endDate))
    }
  )

  return (
    <div>
      {experiences.map(
        ({
          company,
          position,
          startDate,
          endDate,
          current,
          values,
        }: WorkExperience) => {
          return (
            <>
              <ExperienceSection key={`${company}-${startDate}`}>
                <Header>
                  <span>{company}</span>
                  <MinorSpan>
                    {moment(startDate).format("MMM YYYY")} -{" "}
                    {current ? "Current" : moment(endDate).format("MMM YYYY")}
                  </MinorSpan>
                </Header>
                <Position>
                  <MinorSpan>{position}</MinorSpan>
                </Position>
              </ExperienceSection>
            </>
          )
        }
      )}
    </div>
  )
}

export default WorkExperienceSection
