
import { ChangeEvent, useState } from 'react'
import './App.css'
import { Frame } from './Frame'
import { Button } from './Button'
import { Input } from './Input'


function App() {

  type ValueProps = {
    values: {minValue: number, maxValue: number}
    inputValues: {minValue: number, maxValue: number}
  }

  type ViewProps = number | "incorrect value!" | "enter values and press 'set'";
  
  const initialState: ValueProps = {
    values: { minValue: 0, maxValue: 10 },
    inputValues: { minValue: 0, maxValue: 10 },
  }

  const minLimitValue:number = 0
  const maxLimitValue:number = 100

  const [state, setState] = useState<ValueProps>(initialState);

  const [view, setView] = useState<ViewProps>(0)

  const [className, setClassName] = useState<string>('count')

  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  const incrementHandler = () => {
    if (state.values.minValue <= state.values.maxValue) {
      setState({ ...state,values:{...state.values,minValue: state.values.minValue + 1}});
      setView(state.values.minValue+1)
      setIsDisabled(true)
      setClassName('count')
      if (state.values.minValue + 1 === state.values.maxValue) {
        setClassName('bigredcount');
      } 
    }
    
  }

  const resetHandler = () => {
    setView(state.inputValues.minValue)
    setState({...state, values: state.inputValues})
    setIsDisabled(false)
    setClassName('count')
  }

  const getValueHandler = (event: ChangeEvent<HTMLInputElement>, value: string) => {
    
    let newValue = Number(event.target.value) 
    let udatedInputValues = {...state.inputValues, [value]:newValue}
    
    if (udatedInputValues.minValue >= udatedInputValues.maxValue || udatedInputValues.minValue < minLimitValue || udatedInputValues.maxValue <= minLimitValue || newValue > maxLimitValue) {
      setView('incorrect value!')
      setIsDisabled(true)
      setClassName('redtext')
    } else {
      setView("enter values and press 'set'")
      setIsDisabled(false)
      setClassName('text')
    }
    setState({...state, inputValues: udatedInputValues})
  }

  const setValuesHandler = () => {

    if (state.inputValues.minValue >= minLimitValue && state.inputValues.minValue < state.inputValues.maxValue) {
        setState({...state, values:state.inputValues})
        setView(state.inputValues.minValue)
        setIsDisabled(true)
        setClassName('count')
    } else {
      setView("incorrect value!"); 
      setIsDisabled(true); 
      setClassName("redtext");
      }
  }

  const getViewHandler = () => { 
    
    if (state.inputValues.minValue >= state.inputValues.maxValue || state.inputValues.minValue < minLimitValue || state.inputValues.maxValue <= minLimitValue || state.inputValues.maxValue > maxLimitValue) {
      setView('incorrect value!')
      setClassName("redtext");
    } else {
      setView("enter values and press 'set'")
      setIsDisabled(false)
      setClassName('text')
    }
    
  }

  // // у локал сторадж есть свойства
  // //сет айтем записывает текущее значение value по ключу counterValue-сами его называем, как хотим
  // // value у нас типа number, но нужно привести к string
  // //JSON.stringify(value) метод в JavaScript, 
  // //который преобразует переданное значение в строку в формате JSON
  // const setToLocalHandler = () => {
  //   localStorage.setItem("counterValue", JSON.stringify(value))
  // }


  // //
  // const getFromLocalHandler = () => {
  //   let valueString = localStorage.getItem('counterValue')

  //   if (valueString) {
  //     let newValue = JSON.parse(valueString)
  //     setValue(newValue)
  //   }
    
  // }
  // const clearLocalHandler = () => {
  //   localStorage.clear
  //   setValue(0)
    
  // }
  

  return (
  
      <div className='App'>
        {/* <div className='localStorage'>
          <h1>LocalStorage</h1>
          <h2>{value}</h2>
          <button onClick={incrementHandler}>Increment</button>
          <button onClick={setToLocalHandler}>setToLocalStorage</button>
          <button onClick={getFromLocalHandler}>getFromLocalStorage</button>
          <button onClick={clearLocalHandler}>clearLocalStorage</button>
        </div> */}
        <div className='Counter'>
        <Frame width='400px' height='210px'>
            <Frame width='380px' height='120px'>
              <Input 
                  className={(state.inputValues.minValue >= state.inputValues.maxValue || state.inputValues.minValue < minLimitValue) ? 'inputerror' : 'input'}
                  label='max value:' 
                  placeholder={`<= ${maxLimitValue}`} 
                  onChange={(event: ChangeEvent<HTMLInputElement>) => getValueHandler(event,'maxValue')}
                  onClick={getViewHandler}/>
              
              <Input 
                  className={(state.inputValues.minValue >= state.inputValues.maxValue || state.inputValues.minValue < minLimitValue) ? 'inputerror' : 'input'}
                  label='start value:' 
                  placeholder={`>= ${minLimitValue}`} 
                  onChange={(event: ChangeEvent<HTMLInputElement>) => getValueHandler(event,'minValue')}
                  onClick={getViewHandler}/>

                  
            </Frame>
            <Frame width='380px' height='50px'>
              <div style={{display:'flex', gap:'20px'}}>
                <Button title='set' onClick={setValuesHandler} disabled={isDisabled || state.inputValues.minValue < minLimitValue || state.inputValues.minValue >= state.inputValues.maxValue}></Button>
                
              </div>
              
            </Frame>
          </Frame>
          <Frame width='400px' height='210px'>
            <Frame width='380px' height='120px'>
              <h2 className={className}>{view}</h2>
              
              
            </Frame>
            <Frame width='380px' height='50px'>
              <div style={{display:'flex', gap:'20px'}}>
                <Button title='inc' onClick={incrementHandler} disabled={state.values.minValue >= state.values.maxValue || view==="enter values and press 'set'" || view==="incorrect value!"}></Button>
                <Button title='reset' onClick={resetHandler} disabled={!isDisabled || view==="enter values and press 'set'" || view==="incorrect value!"}></Button>
              </div>
              
            </Frame>
          </Frame>
          
        </div>
        
        
      </div>
  )
}

export default App
