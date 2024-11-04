import React from 'react'
import { type PropsWithChildren } from 'react'
import { useLocation } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from 'styled-components'
import { routeInfos } from './Router'

interface Props extends PropsWithChildren {
  transitionKey: string
}

export default function PageTransitionProvider(props: Props): JSX.Element {
  const { transitionKey, children } = props
  const { state } = useLocation()

  return (
    <ContentsStyles
      childFactory={(child) => {
        if (state !== null && state.transitionType !== null) {
          return React.cloneElement(child, {
            classNames: state?.transitionType,
          })
        }

        const transitionType = routeInfos.find(
          (value) => value.path === `/${transitionKey}`
        )?.transitionType

        return React.cloneElement(child, {
          classNames: transitionType,
        })
      }}
    >
      <CSSTransition key={transitionKey} timeout={500}>
        {children}
      </CSSTransition>
    </ContentsStyles>
  )
}

const ContentsStyles: typeof TransitionGroup = styled(TransitionGroup)`
  height: calc(100% - 66px);
  position: relative;
`
