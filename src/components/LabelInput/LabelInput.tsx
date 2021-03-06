import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'components';
import  './LabelInput.scss';

type LabelInputType = {
  value: string | number;
  name?: string;
  onSubmit: (val: string | number) => string | void;
  onChange?: (val: string) => string;
  isDisabled?: boolean;
  children: ReactNode
}

export const LabelInput: React.FC<LabelInputType> = ({
  value,
  name,
  onSubmit,
  onChange,
  isDisabled = false,
  children
}) => {
  const [input, setInput] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const [displayHeight, setDisplayHeight] = useState<number>();
  const displayRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // if input changes externally after render
  useEffect(() => {
    setInput(value)
  }, [value])

  // set display height so page doesn't adjust if input height is smaller than the display height
  useEffect(() => {
    setDisplayHeight(displayRef.current?.clientHeight);
  }, []);

  // when the user clicks to edit, input should immediately focus
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleCancel = () => {
    setIsEditing(false);
    setInput(value);
  };

  const handleSubmit = () => {
    setInput(onSubmit(input) || input);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
    if (e.key === 'Escape') {
      handleCancel()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      setInput(onChange(e.target.value));
    } else {
      setInput(e.target.value);
    }
  };

  return (
    <div className="LabelInput">
      {isEditing ? (
        <div className={`LabelInput__container`} style={{height: displayHeight}}>
          <input
            ref={inputRef}
            className={`LabelInput__input`}
            name={name}
            value={input}
            onChange={handleChange}
            type={typeof value === 'number' ? 'number' : 'text'}
            step={0.01}
            onKeyDown={handleKeyPress}
          />
          <Button onClick={handleCancel} isRounded>
            <FontAwesomeIcon icon={['fas', 'times']} />
          </Button>
          <Button
            kind="primary"
            isRounded
            onClick={handleSubmit}>
            <FontAwesomeIcon icon={['fas', 'check']} />
          </Button>
        </div>
      ) : (
        <button ref={displayRef} className={`LabelInput__button`} onClick={() => setIsEditing(true)}>
          {children}
        </button>
      )}
    </div>
  );
};
