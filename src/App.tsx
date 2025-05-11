
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
    inputValues: { minValue: 0, maxValue: 10 }
  }

  const minLimitValue:number = 0
  const maxLimitValue:number = 100

  const [state, setState] = useState<ValueProps>(initialState);

  

  const [view, setView] = useState<ViewProps>(JSON.parse(localStorage.getItem("viewValue") ?? "0"))


  const [className, setClassName] = useState<string>('count')

  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  ///работа с localStorage

  // функция, которая сетает изменения во вью и сразу же передает значение в localStorage
  const updateView = (newView: ViewProps) => {
    setView(newView); 
    localStorage.setItem("viewValue", JSON.stringify(newView)); // Сохраняем `view` в LocalStorage
};

// функция, которая сетает изменения в inputValues и сразу же передает значение в localStorage
const updateState = (newState: ValueProps) => {
  setState(newState); 
  localStorage.setItem("minInputValue", JSON.stringify(newState.inputValues.minValue))
  localStorage.setItem("maxInputValue", JSON.stringify(newState.inputValues.maxValue))
  localStorage.setItem("minViewValue", JSON.stringify(newState.values.minValue))
  localStorage.setItem("maxViewValue", JSON.stringify(newState.values.maxValue))
 
};

  ////////////////////

  const incrementHandler = () => {
    if (state.values.minValue <= state.values.maxValue) {
      updateState({ ...state,values:{...state.values,minValue: state.values.minValue + 1}});
      updateView(state.values.minValue+1)
      setIsDisabled(true)
      setClassName('count')
      if (state.values.minValue + 1 === state.values.maxValue) {
        setClassName('bigredcount');
      } 
    }
          
  }

  const resetHandler = () => {
    updateView(state.inputValues.minValue)
    updateState({...state, values: state.inputValues})
    setIsDisabled(false)
    setClassName('count')
  }

  const getValueHandler = (event: ChangeEvent<HTMLInputElement>, value: string) => {
    
    let newValue = Number(event.target.value) 
    let udatedInputValues = {...state.inputValues, [value]:newValue}
    
    if (udatedInputValues.minValue >= udatedInputValues.maxValue || udatedInputValues.minValue < minLimitValue || udatedInputValues.maxValue <= minLimitValue || newValue > maxLimitValue) {
      updateView('incorrect value!')
      setIsDisabled(true)
      setClassName('redtext')
    } else {
      updateView("enter values and press 'set'")
      setIsDisabled(false)
      setClassName('text')
    }
    updateState({...state, inputValues: udatedInputValues})
 
    
  }

  const setValuesHandler = () => {

    if (state.inputValues.minValue >= minLimitValue && state.inputValues.minValue < state.inputValues.maxValue) {
        updateState({...state, values:state.inputValues})
        updateView(state.inputValues.minValue)
        setIsDisabled(true)
        setClassName('count')
    } else {
      updateView("incorrect value!"); 
      setIsDisabled(true); 
      setClassName("redtext");
      }
      
  }

  const getViewHandler = () => { 
    
    if (state.inputValues.minValue >= state.inputValues.maxValue || state.inputValues.minValue < minLimitValue || state.inputValues.maxValue <= minLimitValue || state.inputValues.maxValue > maxLimitValue) {
      updateView('incorrect value!')
      setClassName("redtext");
    } else {
      updateView("enter values and press 'set'")
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


  
  

  return (
  
      <div className='App'>
        
        <div className='Counter'>
        <Frame width='400px' height='210px'>
            <Frame width='380px' height='120px'>
              <Input 
                  className={(state.inputValues.minValue >= state.inputValues.maxValue || state.inputValues.minValue < minLimitValue) ? 'inputerror' : 'input'}
                  label='max value:' 
                  placeholder={`<= ${maxLimitValue}`} 
                  value = {state.inputValues.maxValue}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => getValueHandler(event,'maxValue')}
                  onClick={getViewHandler}/>
              
              <Input 
                  className={(state.inputValues.minValue >= state.inputValues.maxValue || state.inputValues.minValue < minLimitValue) ? 'inputerror' : 'input'}
                  label='start value:' 
                  placeholder={`>= ${minLimitValue}`} 
                  value = {state.inputValues.minValue}
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
