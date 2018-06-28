// @flow

import * as React from 'react'
import styled from 'styled-components'
import RCSlider, { createSliderWithTooltip, Range as RCRange } from 'rc-slider'
import { colors } from 'styles'
import 'rc-slider/assets/index.css'

// View docs for the Slider/Range component at https://github.com/react-component/slider
const SliderWrapper = styled.div`
  padding: 25px 0;
`

const SliderLabel = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
`

type ValueType = ?number | Array<number>

type PropsType<T> = {
  allowCross?: boolean,
  formatter?: (?number) => string,
  marks?: { [string]: string },
  max: number,
  min: number,
  noneLabel: string,
  onChange?: T => void,
  showLabel?: boolean,
  showTooltip?: boolean,
  step?: number,
  value: T
}

export default function SliderComponent<W: ValueType>(props: PropsType<W>): React.Element<*> {
  let Slider = Array.isArray(props.value) ? RCRange : RCSlider
  if (props.showTooltip) {
    Slider = createSliderWithTooltip(Slider)
  }

  const formatter = props.formatter || (a => a)
  const getLabelText = (): string => {
    if (!props.value) {
      return props.noneLabel
    } else if (Array.isArray(props.value)) {
      return props.value.length === 2 ? props.value.map(formatter).join(' - ') : props.noneLabel
    } else {
      return String(formatter(props.value))
    }
  }

  const getRenderValue = (): W => {
    // Handle the case of sliders with 2+ handles that need to have preset values
    if (Array.isArray(props.value) && props.value.length < 2) {
      // flow-disable-next-line
      return [props.min, props.max]
    } else {
      return props.value
    }
  }

  return (
    <SliderWrapper>
      {props.showLabel && <SliderLabel>{getLabelText()}</SliderLabel>}
      <Slider
        {...props}
        value={getRenderValue()}
        allowCross={props.allowCross}
        dots={false}
        tipFormatter={props.formatter}
        railStyle={{ backgroundColor: colors.lightGrey }}
        trackStyle={[{ backgroundColor: colors.lightBlue }]}
        dotStyle={{ borderColor: colors.lightGrey }}
        activeDotStyle={{ borderColor: colors.lightBlue }}
        handleStyle={[{ borderColor: colors.blue }, { borderColor: colors.blue }]}
      />
    </SliderWrapper>
  )
}

SliderComponent.defaultProps = {
  allowCross: false,
  noneLabel: 'Not set'
}
