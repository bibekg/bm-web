// @flow

import * as React from 'react'
import styled from 'styled-components'
import { Text } from 'components/typography'
import { colors } from 'styles'

const CheckboxItem = styled.div`
  position: relative;
  z-index: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 6px;
  cursor: pointer;
  font-size: 22px;
  user-select: none;
  cursor: pointer;

  &:hover {
    .real-checkbox {
      border-color: ${colors.blue};
    }
  }

  > input[type='checkbox'] {
    z-index: 0;
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;

    &:checked {
      ~ .real-checkbox .real-checkmark {
        display: block;
      }
      ~ .real-checkbox {
        border-color: ${colors.blue};
      }
    }
  }

  > .real-checkbox {
    z-index: -1;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${colors.white};
    border: 2px solid ${colors.lightBlue};
    border-radius: 5px;
    cursor: pointer;
    ${'' /* Prevent checkbox from shrinking when option text is long */} flex-srhink: 1;

    .real-checkmark {
      display: none;
      width: 50%;
      height: 50%;
      background-color: ${colors.blue};
    }
  }
`

const ItemText = Text.extend`
  padding-left: 8px;
  font-size: 18px;
  margin: 0;
`

export type OptionType = {
  id: string,
  text: string
}

type PropsType = {
  name: string,
  value: OptionType,
  checked: boolean,
  onChange: (SyntheticInputEvent<*>) => void
}

export default function CheckboxInput(props: PropsType): React.Element<*> {
  return (
    <CheckboxItem>
      <input
        type="checkbox"
        name={props.name}
        value={props.value.id}
        checked={props.checked}
        onChange={props.onChange}
      />
      <div className="real-checkbox">
        <div className="real-checkmark" />
      </div>
      <ItemText paragraph>{props.value.text}</ItemText>
    </CheckboxItem>
  )
}
