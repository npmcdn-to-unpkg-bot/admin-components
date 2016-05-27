import React from 'react'
import BaseFormInput from './base'
import { makePropsSubset } from '../utils'


export class BaseTextInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
      updateTimeout: null
    }
  }

  componentWillUnmount() {
    if (this.state.updateTimeout != null) {
      clearTimeout(this.state.updateTimeout)
    }
  }

  changeValue(val) {
    if (this.state.updateTimeout != null) {
      clearTimeout(this.state.updateTimeout)
    }

    let newState = { value: val, updateTimeout: null }

    if (this.props.updateDelay == 0) {
      this.setState(newState)

      if (this.props.onUpdate != null) {
        this.props.onUpdate(newState.value)
      }

      if (this.props.onUpdateInstant != null) {
        this.props.onUpdateInstant(newState.value)
      }

      return
    }

    if (this.props.onUpdate != null) {
      newState.updateTimeout = setTimeout(() => this.props.onUpdate(newState.value), this.props.updateDelay)
    }

    this.setState(newState)

    if (this.props.onUpdateInstant != null) {
      this.props.onUpdateInstant(newState.value)
    }
  }

  focus() {
    this.inputRef.focus()
  }

  render() {
    return (
      <input ref={el => this.inputRef = el}
             type="text"
             value={this.state.value}
             placeholder={this.props.placeholder}
             onChange={ev => this.changeValue(ev.target.value)} />
    )
  }
}

BaseTextInput.defaultProps = {
  value: '',
  updateDelay: 200
}

BaseTextInput.propTypes = {
  value: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  updateDelay: React.PropTypes.number,
  onUpdate: React.PropTypes.func,
  onUpdateInstant: React.PropTypes.func
}


export default class TextInput extends React.Component {
  render() {
    return (
      <BaseFormInput {...makePropsSubset(this.props, BaseFormInput.propTypes)}>
        <BaseTextInput {...makePropsSubset(this.props, [ 'value', 'placeholder', 'updateDelay', 'onUpdate' ])} />
      </BaseFormInput>
    )
  }
}
