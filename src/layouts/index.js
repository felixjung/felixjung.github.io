/* global graphql */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { ThemeProvider } from 'emotion-theming'
import facepaint from 'facepaint'

import { getNavigationItems } from '../lib/contentful'
import * as theme from '../styles/variables'
import '../styles/globals'
import '../styles/highlight'

import MetaTags from '../components/MetaTags'
import Nav from '../components/Navigation'
import Footer from '../components/Footer'

const mq = facepaint([
  `@media(min-width: ${theme.breakpoints.m}px)`,
  `@media(min-width: ${theme.breakpoints.l}px)`
])

const CopySymbol = styled('span')`
  font-size: ${({ theme }) => theme.fontSize.xxs};
`

const Wrapper = styled('div')(({ theme }) =>
  mq({
    paddingTop: [0, `calc(5 * ${theme.spacing.xxxl})`]
  })
)

export default class Template extends React.Component {
  static propTypes = {
    children: PropTypes.func,
    data: PropTypes.object.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired
  }

  render() {
    const { data, location } = this.props
    const {
      title,
      description,
      twitter,
      baseUrl,
      author
    } = data.site.siteMetadata
    const url = `${baseUrl}${location.pathname}`
    const navItems = getNavigationItems(data)
    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <MetaTags {...{ title, description, twitter, url }} />
          <Nav items={navItems} />
          {this.props.children()}
          <Footer>
            <CopySymbol>&copy;&nbsp;</CopySymbol>
            2007 {author}
          </Footer>
        </Wrapper>
      </ThemeProvider>
    )
  }
}

export const pagesQuery = graphql`
  query LayoutQuery {
    allContentfulPage {
      edges {
        node {
          id
          title
          name
          route
          sections {
            id
            body {
              body
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        baseUrl
        author
        title
        description
        twitter
      }
    }
  }
`
