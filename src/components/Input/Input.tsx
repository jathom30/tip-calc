import React, { KeyboardEvent, ReactNode } from 'react';
import './Input.scss'

export const Input: React.FC<{
  label?: ReactNode;
  value?: string | number;
  onChange: (val: string) => void;
  name: string;
  step?: number
  required?: boolean
  placeholder?: string
}> = ({label, value, onChange, name, step, required = false, placeholder}) => {
  const type = typeof value === 'string' ? 'string' : 'number'

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (type !== 'number') return
    const numberValue = value as number
    if (e.key === '.' && isNaN(numberValue)) {
      onChange('0.')
    }
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (type !== 'number') return
    const numberValue = value as number
    if (isNaN(numberValue)) {
      onChange('0')
    }
  }

  return (
    <label className='Input' htmlFor={name}>
      {label && <span className='Input__label'>{label}</span>}
      <div className="Input__container">
        <input
          className='Input__input'
          type={type}
          name={name}
          value={value !== undefined ? value : ''}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          onBlur={handleBlur}
          step={step}
          inputMode={type === 'number' ? "decimal" : 'none'}
        />
        {required && <div className="Input__dot" />}
      </div>
    </label>
  )
}