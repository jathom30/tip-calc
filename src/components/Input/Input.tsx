import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent, ReactNode, useState, FocusEvent, useRef } from 'react';
import './Input.scss'

export const Input: React.FC<{
  label?: ReactNode;
  value?: string;
  onChange: (val: string) => void;
  name: string;
  step?: number
  required?: boolean
  placeholder?: string
}> = ({label, value, onChange, name, step, required = false, placeholder}) => {
  const [displayValue, setDisplayValue] = useState(value)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const numbersOnly = value.replace(/[^0-9]+/g, '')
    // remove last two numbers from string to get dollars
    const dollars = numbersOnly.substring(0, numbersOnly.length - 2)
    // only get last two numbers to get cents
    const cents = numbersOnly.substring(numbersOnly.length - 2)

    const splitOnThree = (str: string) => str.match(/.{1,3}/g)
    // remove start of dollars if not multiple of three
    const setsOfThree = Math.floor(dollars.length / 3)
    const splitRemainder = dollars.length - setsOfThree * 3
    // remove remainder from dollars for proper comma placement
    const dollarsRemainder = dollars.substring(0, splitRemainder)
    const perfectSets = dollars.substring(splitRemainder)
    console.log({dollarsRemainder, perfectSets})
    let displayDollars = ''
    if (dollars.length < 3) {
      // removes starting zeros
      displayDollars = dollars.split('').filter(char => char !== '0').join('')
    } else {
      displayDollars = `${dollarsRemainder !== '' ? `${dollarsRemainder},` : ''}${splitOnThree(perfectSets)?.join(',') || ''}`
    }
    const display = `${displayDollars || '0'}.${cents || '00'}`
    onChange(display.split(',').join(''))
    setDisplayValue(display)
  }

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    const end = e.target.value.length
    e.target.setSelectionRange(end, end)
    setIsFocused(true)
  }

  const handleClick = () => {
    const end = displayValue?.length || 0
    inputRef.current?.setSelectionRange(end, end)
  }

  return (
    <label className='Input' htmlFor={name}>
      {label && <span className='Input__label'>{label}</span>}
      <div className={`Input__container ${isFocused ? 'Input__container--is-focused' : ''}`}>
        <FontAwesomeIcon icon={faDollarSign as IconProp} />
        <input
          ref={inputRef}
          className='Input__input'
          type="text"
          name={name}
          value={displayValue}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={() => setIsFocused(false)}
          onClick={handleClick}
          step={step}
          pattern="[0-9]*"
        />
        {required && <div className="Input__dot" />}
      </div>
    </label>
  )
}