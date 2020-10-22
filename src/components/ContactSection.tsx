import React, { FunctionComponent } from "react"
import { FiGithub, FiLinkedin } from "react-icons/fi"
import { SiLeetcode } from "react-icons/si"

import styled from "styled-components"

const Contacts = styled.section`
  display: flex;
  margin: 1rem 0;
  flex-direction: row;
  justify-content: space-around;
`
const ContactLine = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const LOGO_SIZE = 32

const LogoNavigationLink = styled.a`
  text-decoration: None;
  color: inherit;
  align-items: center;

  &:hover {
    transform: scale(1.1);
  }
`

const ContactSection: FunctionComponent<{}> = params => {
  return (
    <Contacts>
      <ContactLine>
        <LogoNavigationLink
          href="github.com/dong-alex"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FiGithub size={LOGO_SIZE} />
        </LogoNavigationLink>
      </ContactLine>
      <ContactLine>
        <LogoNavigationLink
          href="leetcode.com/dongqingli/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiLeetcode size={LOGO_SIZE} />
        </LogoNavigationLink>
      </ContactLine>
      <ContactLine>
        <LogoNavigationLink
          href="linkedin.com/in/dongalex"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FiLinkedin size={LOGO_SIZE} />
        </LogoNavigationLink>
      </ContactLine>
    </Contacts>
  )
}

export default ContactSection
