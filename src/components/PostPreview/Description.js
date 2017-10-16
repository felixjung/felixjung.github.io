import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { transparentize } from 'polished'

import Markdown from '../Markdown'
import TagList from '../TagList'
import Tag from '../Tag'
import Category from '../Category'

const DescriptionContainer = styled('div')`
  ${({ theme, className }) =>
    `
    ${className}
    color: ${theme.colors.greyDark};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: ${theme.spacing.xxl};
    padding-bottom: calc(${theme.spacing
      .xxl} + 20px); justify-content: space-between;
    background-image: radial-gradient(ellipse, ${transparentize(
      0.05,
      '#fff'
    )} 0%, ${transparentize(
      0.05,
      theme.colors.greyUltraLight
    )} 100%);`} border-top: 1px solid #fff;
`

const DescriptionParagraph = styled('p')(({ theme }) => ({
  margin: 0,
  fontFamily: 'Georgia',
  fontSize: theme.fontSize.m,
  lineHeight: theme.lineHeight.xxxxl,
  color: theme.colors.greyDark
}))

const Description = ({ text, tags, category, ...props }) => {
  const showTagList = category || tags
  const tagElements = tags && tags.map(name => <Tag key={name}>{name}</Tag>)
  const categoryElement = category && (
    <li key={category.identifier}>
      <Category identifier={category.identifier}>{category.name}</Category>
    </li>
  )

  return (
    <DescriptionContainer {...props}>
      <Markdown
        text={text}
        remarkReactComponents={{ p: DescriptionParagraph }}
      />
      {showTagList && (
        <TagList>
          {categoryElement}
          {tagElements}
        </TagList>
      )}
    </DescriptionContainer>
  )
}

export default Description
