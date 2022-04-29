import * as React from 'react';
import './Button.scss'

export const Button = ({children, onClick, isRounded = false, kind = 'default', isDisabled = false, width}: {
  children: React.ReactNode,
  onClick: () => void,
  isRounded?: boolean,
  isDisabled?: boolean
  kind?: 'default' | 'primary' | 'danger' | 'text' | 'secondary'
  width?: string
}) => {
  const buttonKindClass = `Button__${kind}`
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      style={{width}}
      className={`Button ${isRounded ? 'Button--rounded' : ''} ${isDisabled ? 'Button--disabled' : ''} ${buttonKindClass}`}
    >
      {children}
    </button>
  )
}