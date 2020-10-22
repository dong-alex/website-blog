import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { Topics } from "../types"

interface TagEntryProps {
  tags: string[]
}

const TagContainer = styled.section`
  padding: 1rem 0;
`

const TagName = styled.span`
  border: 1px solid black;
  border-radius: 5rem;
  user-select: none;
  padding: 0.5rem;

  :first-child {
    margin: 0;
    margin-right: 0.5rem;
  }

  not:first-child {
    margin: 0 0.5rem;
  }
`

const TagEntry: FunctionComponent<TagEntryProps> = ({ tags }) => {
  return (
    tags && (
      <TagContainer>
        {tags.map(name => (
          <TagName>{Topics[name]}</TagName>
        ))}
      </TagContainer>
    )
  )
}

export default TagEntry
