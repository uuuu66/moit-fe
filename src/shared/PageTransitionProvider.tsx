import React from 'react'
import { type PropsWithChildren } from 'react'
import { useLocation } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from 'styled-components'
import { routeInfos } from './Router'
import strings from '@/constants/strings'

interface Props extends PropsWithChildren {
  transitionKey: string
}

export default function PageTransitionProvider(props: Props): JSX.Element {
  const { transitionKey, children } = props
  const { state } = useLocation()
  return (
    <ContentsStyles
      childFactory={(child) => {
        const transitionType = routeInfos.find(
          (value) => value.path === `/${transitionKey}`
        )?.transitionType

        if (transitionType === null && state?.transitionType !== null) {
          return React.cloneElement(child, {
            classNames:
              state?.transitionType ?? strings.pageTransitionTypes['fade-in'],
          })
        }

        if (transitionType === null)
          return React.cloneElement(child, {
            classNames: strings.pageTransitionTypes['fade-in'],
          })
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
