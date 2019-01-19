// @flow
type FormItemPropsType = {
  name: string,
  children: React.Node
}

// Item Options Types
type FormTextInputItemOptionsType = {
  itemName: string,
  placeholder?: string
}

type FormSliderItemOptionsType = {
  itemName: string,
  min: number,
  max: number,
  marks?: { [string]: string },
  formatter?: (?number) => string,
  showLabel?: boolean
}

type FormRadioGroupItemOptionsType = {
  itemName: string,
  options: Array<OptionType>
}

type FormCheckboxItemOptionsType = {
  itemName: string,
  anyable?: boolean,
  options: Array<OptionType>
}

type FormDropdownItemOptionsType = {
  itemName: string,
  items: Array<DropdownItem<*>>,
  placeholder: string
}

type FormTextareaItemOptionsType = {
  itemName: string
}

// Item Argument Types
type FormTextInputItemArgumentType = {
  input: InputProps,
  options: FormTextInputItemOptionsType
}

type FormSliderItemArgumentType = {
  input: InputProps,
  options: FormSliderItemOptionsType
}

type FormRadioGroupItemArgumentType = {
  input: InputProps,
  options: FormRadioGroupItemOptionsType
}

type FormCheckboxItemArgumentType = FieldArrayProps & { options: FormCheckboxItemOptionsType, formProps: FormProps }

type FormDropdownItemArgumentType = {
  input: InputProps,
  options: FormDropdownItemOptionsType
}

type FormTextareaItemArgumentType = FieldProps & { options: FormTextareaItemOptionsType }

// Field Types
type FormTextInputFieldType = {
  fieldName: string,
  component: FormTextInputItemArgumentType => React.Element<*>,
  options: FormTextInputItemOptionsType,
  validate?: string => string | null
}

type FormSliderFieldType = {
  fieldName: string,
  component: FormSliderItemArgumentType => React.Element<*>,
  options: FormSliderItemOptionsType,
  validate?: string => string | null
}

type FormRadioGroupFieldType = {
  fieldName: string,
  component: FormRadioGroupItemArgumentType => React.Element<*>,
  options: FormRadioGroupItemOptionsType,
  validate?: string => string | null
}

type FormDropdownFieldType = {
  fieldName: string,
  component: FormDropdownItemArgumentType => React.Element<*>,
  options: FormDropdownItemOptionsType,
  validate?: string => string | null
}

type FormCheckboxFieldType = {
  fieldName: string,
  component: FormCheckboxItemArgumentType => React.Element<*>,
  options: FormCheckboxItemOptionsType,
  // eslint-disable-next-line flowtype/no-weak-types
  validate?: ([any]) => ?string
}
