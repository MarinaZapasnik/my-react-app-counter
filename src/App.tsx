
import { ChangeEvent, useState } from 'react'
import './App.css'
import { Frame } from './Frame'
import { Button } from './Button'
import { Input } from './Input'


function App() {

  type ValueProps = {
    minValue: any
    maxValue: number
  }

  const [values, setValues] = useState<ValueProps>(
    {
      minValue: 0,
      maxValue: 10,
    }
  )

  const [inputValues, setInputValues] = useState<ValueProps>(
    {
      minValue: 0,
      maxValue: 10,
    }
  )

  const [view, setView] = useState(values.minValue)

  const [className, setClassName] = useState('count')

  

  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  const incrementHandler = () => {
    if (values.minValue <= values.maxValue) {
      setValues({ ...values, minValue: values.minValue + 1 });
      setView(values.minValue+1)
      setIsDisabled(true)
      setClassName('count')
      if (values.minValue + 1 === values.maxValue) {
        setClassName('bigredcount');
      } 
    }
    
  }

  const resetHandler = () => {
    setView(inputValues.minValue)
    setValues(inputValues)
    setIsDisabled(false)
    setClassName('count')
  }

  const getValueHandler = (event: ChangeEvent<HTMLInputElement>, value: string) => {
    
    let newValue = Number(event.target.value) 
    let udatedInputValues = {...inputValues, [value]:newValue}
    
    if (udatedInputValues.minValue >= udatedInputValues.maxValue || udatedInputValues.minValue < 0 || udatedInputValues.maxValue<=0 || newValue > 100) {
      setView('incorrect value!')
      setIsDisabled(true)
      setClassName('redtext')
    } else {
      setView("enter values and press 'set'")
      setIsDisabled(false)
      setClassName('text')
    }
    setInputValues (udatedInputValues)
  }

  const setValuesHandler = () => {

    if (inputValues.minValue >= 0 && inputValues.minValue < inputValues.maxValue) {
        setValues(inputValues)
        setView(inputValues.minValue)
        setIsDisabled(true)
        setClassName('count')
    } else {
      setView("incorrect value!"); // ✅ Показываем ошибку
      setIsDisabled(true); // ✅ Дизейблим кнопку set
      setClassName("redtext"); // ✅ Красный стиль
  }

    
  }

  const getViewHandler = () => {  
    
    
    if (inputValues.minValue >= inputValues.maxValue || inputValues.minValue < 0 || inputValues.maxValue <= 0 || inputValues.maxValue > 100) {
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
                  className={(inputValues.minValue >= inputValues.maxValue || inputValues.minValue < 0) ? 'inputerror' : 'input'}
                  label='max value:' 
                  placeholder={inputValues.maxValue.toString()} 
                  onChange={(event: ChangeEvent<HTMLInputElement>) => getValueHandler(event,'maxValue')}
                  onClick={getViewHandler}/>
              
              <Input 
                  className={(inputValues.minValue >= inputValues.maxValue || inputValues.minValue < 0) ? 'inputerror' : 'input'}
                  label='start value:' 
                  placeholder={inputValues.minValue.toString()} 
                  onChange={(event: ChangeEvent<HTMLInputElement>) => getValueHandler(event,'minValue')}
                  onClick={getViewHandler}/>

                  
            </Frame>
            <Frame width='380px' height='50px'>
              <div style={{display:'flex', gap:'20px'}}>
                <Button title='set' onClick={setValuesHandler} disabled={isDisabled || inputValues.minValue < 0 || inputValues.minValue >= inputValues.maxValue}></Button>
                
              </div>
              
            </Frame>
          </Frame>
          <Frame width='400px' height='210px'>
            <Frame width='380px' height='120px'>
              <h2 className={className}>{view}</h2>
              
              
            </Frame>
            <Frame width='380px' height='50px'>
              <div style={{display:'flex', gap:'20px'}}>
                <Button title='inc' onClick={incrementHandler} disabled={values.minValue >= values.maxValue || view==="enter values and press 'set'" || view==="incorrect value!"}></Button>
                <Button title='reset' onClick={resetHandler} disabled={!isDisabled || view==="enter values and press 'set'" || view==="incorrect value!"}></Button>
              </div>
              
            </Frame>
          </Frame>
          
        </div>
        
        
      </div>
  )
}

export default App
