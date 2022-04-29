import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, FlexBox } from "components";
import React, { useEffect, useState } from "react";
import './UpDownInput.scss'

export const UpDownInput = ({required, initialValue, onChange}: {required?: boolean; initialValue: number; onChange: (val: number) => void}) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    onChange(value)
  }, [value, onChange])

  const handleDecrease = () => {
    setValue(prevVal => {
      if (prevVal <= 1) return 1
      return prevVal - 1
    })
  }

  const handleIncrease = () => {
    setValue(prevVal => prevVal + 1)
  }

  return (
    <div className="UpDownInput">
      <FlexBox flexDirection="column" gap="0.5rem">
        <FlexBox gap="1rem" alignItems="center">
          <Button isDisabled={value <= 1} onClick={handleDecrease} kind="secondary" isRounded><FontAwesomeIcon icon={faMinus as IconProp} /></Button>
          <span>{value}</span>
          <Button onClick={handleIncrease} kind="secondary" isRounded><FontAwesomeIcon icon={faPlus as IconProp} /></Button>
        </FlexBox>
      </FlexBox>
    </div>
  )
}