// @flow

import * as React from 'react'
import styled from 'styled-components'
import { colors } from 'styles'

const RadioCellDiv = styled.div`
  position: relative;
  z-index: 0;
  display: block;
  width: 100%;
  height: 25px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  user-select: none;
  cursor: pointer;
  &:hover {
    .real-radio {
      border-color: ${colors.blue};
    }
  }

  > input[type='radio'] {
    z-index: 0;
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;

    &:checked {
      ~ .real-radio .real-radio-tick {
        display: block;
      }
      ~ .real-radio {
        border-color: ${colors.blue};
      }
    }
  }

  > .real-radio {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${colors.white};
    border: 2px solid ${colors.lightBlue};
    border-radius: 50%;
    cursor: pointer;

    .real-radio-tick {
      display: none;
      width: 50%;
      height: 50%;
      border-radius: 50%;
      background-color: ${colors.blue};
    }
  }
`

const ItemText = styled.span`
  padding-left: 35px;
  font-size: 18px;
  font-weight: 300;
`

export type OptionType = {
  id: string,
  text: string
}

type PropsType = {
  required: boolean,
  name: string,
  value: OptionType,
  checked: boolean,
  onChange: (SyntheticInputEvent<*>) => void
}

export default function RadioInput(props: PropsType): React.Element<*> {
  return (
    <RadioCellDiv>
      <input
        required={props.required}
        type="radio"
        name={props.name}
        value={props.value.id}
        checked={props.checked}
        onChange={props.onChange}
      />
      <span className="real-radio">
        <div className="real-radio-tick" />
      </span>
      <ItemText>{props.value.text}</ItemText>
    </RadioCellDiv>
  )
}

RadioInput.defaultProps = {
  required: false
}
