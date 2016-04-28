import React from 'react'

export default class TextInput extends React.Component {
  render() {
    return (
      <div className={this.props.className}>
        <label for={this.props.elementId}>{this.props.label}</label>
        <input id={this.props.elementId} type="text" value="" placeholder={this.props.placeholder} />
        {this.props.helpText ? <small>{this.props.helpText}</small> : null}
      </div>
    )
  }
}
