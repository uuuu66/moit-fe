import React from 'react'
import { type PropsWithChildren } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from 'styled-components'
import { routeInfos } from './Router'

interface Props extends PropsWithChildren {
  transitionKey: string
}

export default function PageTransitionProvider(props: Props): JSX.Element {
  const { transitionKey, children } = props

  return (
    <ContentsStyles
      childFactory={(child) => {
        const transitionType = routeInfos.find(
          (value) => value.path === `/${transitionKey}`
        )?.transitionType

        return React.cloneElement(child, {
          classNames: transitionType,
        })
      }}
    >
      <CSSTransition
        key={transitionKey}
        timeout={500}
        classNames={
          transitionKey === '' ? 'fade-right-navigate' : 'slide-left-navigate'
        }
      >
        {children}
      </CSSTransition>
    </ContentsStyles>
  )
}

const ContentsStyles: typeof TransitionGroup = styled(TransitionGroup)`
  height: calc(100% - 66px);
  position: relative;
`
