import { FlexBox, GridBox, Input, Label } from 'components';
import { Button } from 'components/Button';
import { UpDownInput } from 'components/UpDownInput';
import React, { useState } from 'react';
import './App.scss';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

const toCurrency = (val: number) => {
  return formatter.format(val);
};

const roundToHundredth = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100

function App() {
  const [bill, setBill] = useState<number | undefined>(undefined)
  const [perc, setPerc] = useState(.25)
  const [split, setSplit] = useState(1)

  const splitBill = roundToHundredth((bill || 0) / split)
  const splitTip = roundToHundredth(splitBill * perc)
  const total = splitBill + splitTip
  return (
    <div className="App">
      <h1 style={{color: 'grey'}}>Tip Calculator</h1>
      <div className="App__wrapper">
        <FlexBox flexDirection='column' gap=".5rem">
          <span className="App__label">Enter bill total</span>
          <Input
            name="bill"
            value={bill}
            placeholder="Enter bill total"
            onChange={val => {
              if (isNaN(parseFloat(val))) {
                setBill(undefined)
              } else {
                setBill(parseFloat(val))
              }
            }}
            step={.01}
          />
        </FlexBox>
      </div>

      <div className="App__wrapper">
        <FlexBox flexDirection='column' gap=".5rem">
          <span className="App__label">Choose tip</span>
          <GridBox gridTemplateColumns="repeat(3, 1fr)" gap="1rem">
            <Button isRounded kind={perc === .2 ? 'primary' : 'default'} onClick={() => setPerc(.2)}>20%</Button>
            <Button isRounded kind={perc === .25 ? 'primary' : 'default'} onClick={() => setPerc(.25)}>25%</Button>
            <Button isRounded kind={perc === .3 ? 'primary' : 'default'} onClick={() => setPerc(.3)}>30%</Button>
          </GridBox>
        </FlexBox>
      </div>

      <div className="App__wrapper">
        <FlexBox flexDirection='column' gap=".5rem">
          <span className="App__label">Split</span>
          <FlexBox justifyContent="center">
            <UpDownInput initialValue={split} onChange={(val) => setSplit(val)} />
          </FlexBox>
        </FlexBox>
      </div>

      <div className="App__wrapper">
        <FlexBox flexDirection='column' gap=".5rem">
          <span className="App__label">Total per person</span>
          <h1 className="App__total">{toCurrency(total)}</h1>
          <GridBox gridTemplateColumns="1fr 1fr" justifyItems="center">
            <FlexBox flexDirection='column'>
              <Label>Bill</Label>
              <h3>{toCurrency(splitBill)}</h3>
            </FlexBox>
            <FlexBox flexDirection='column'>
              <Label>Tip</Label>
              <h3>{toCurrency(splitTip)}</h3>
            </FlexBox>
          </GridBox>
        </FlexBox>
      </div>
    </div>
  );
}

export default App;
