import React, { FunctionComponent } from "react"
import { AiFillProject } from "react-icons/ai"
import { MdSchool, MdComputer } from "react-icons/md"
import { graphql, useStaticQuery } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"
import WorkExperienceSection from "../components/WorkExperienceSection"
import ProjectSection from "../components/ProjectSection"
import ContactSection from "../components/ContactSection"

export type WorkExperience = {
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  values: string[]
}

const PortfolioHeader = styled.header`
  margin: 1rem 0;
  border: 2px solid;
  border-image: linear-gradient(
      90deg,
      rgba(60, 74, 83, 0),
      rgba(60, 74, 83, 0.5),
      rgba(60, 74, 83, 0)
    )
    1;
  border-left: none;
  border-right: none;
`

const PortfolioSection = styled.header`
  margin: 1rem 0;
  border: 2px solid;
  border-image: linear-gradient(
      90deg,
      rgba(60, 74, 83, 0),
      rgba(60, 74, 83, 0.5),
      rgba(60, 74, 83, 0)
    )
    1;
  border-left: none;
  border-top: none;
  border-right: none;
`

const Headline = styled.section`
  display: flex;
  margin: 1rem 0;
  justify-content: center;
  align-items: center;
`

const Portfolio: FunctionComponent<any> = () => {
  const data = useStaticQuery(graphql`
    query {
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
        }
      }
    }
  `)

  const avatar = data.avatar.childImageSharp.fixed
  const author = data.site.siteMetadata.author.name

  return (
    <div style={{ userSelect: "none" }}>
      <PortfolioHeader>
        <Headline>
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
          <span>
            <strong>Alex Dong</strong> | Software Developer
          </span>
        </Headline>
        <ContactSection />
      </PortfolioHeader>
      <PortfolioSection>
        <Headline>
          <MdSchool size={32} style={{ marginRight: "0.5rem" }} />
          <strong>Education</strong>
        </Headline>
        <p>
          University of Alberta
          <span style={{ float: "right" }}>April 2020</span>
        </p>
        <p>
          BSc. in Computing Science
          <span style={{ float: "right" }}>cGPA: 3.2</span>
        </p>
      </PortfolioSection>
      <PortfolioSection>
        <Headline>
          <MdComputer size={32} style={{ marginRight: "0.5rem" }} />
          <strong>Work Experience</strong>
        </Headline>
        <WorkExperienceSection />
      </PortfolioSection>
      <PortfolioSection>
        <Headline>
          <AiFillProject size={32} style={{ marginRight: "0.5rem" }} />
          <strong>Projects</strong>
        </Headline>
        <ProjectSection />
      </PortfolioSection>
    </div>
  )
}

export default Portfolio
