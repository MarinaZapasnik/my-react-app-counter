import { ChangeEvent, useState } from "react";
import "./App.css";


export const Counter = () => {

    type MessageProps = "enter values and press 'set'" | "incorrect value!" | null

    type ValuesProps = {
        minValue: number | undefined
        maxValue: number | undefined
    }
    

    const [values, setValues] = useState<ValuesProps>({
        minValue: 0,
        maxValue: 5
    })

    const [count, setCount] = useState<number | undefined | null>(0);
    const [message, setMessage] = useState<MessageProps>(null);
    const [isSetDisabled, setSetDisabled] = useState<boolean>(true)
    const [isIncDisabled, setIncDisabled] = useState<boolean>(false)
    const [isResetDisabled, setResetDisabled] = useState<boolean>(false)

    const  MIN_LIMIT_VALUE:number = 0 
    const  MAX_LIMIT_VALUE:number = 100 

    // const isCorrectInputValue = (value: number) => {
    //     return value >= MIN_LIMIT_VALUE && value <= MAX_LIMIT_VALUE 
    // }

    const getValuesHandler = (event: ChangeEvent<HTMLInputElement>, value: 'minValue' | 'maxValue') => {
        setMessage("enter values and press 'set'")
        setCount(null)
        const newValue = Number(event.target.value)
        const newValues = {...values, [value]: newValue}
        setValues(newValues)
        
        if (typeof(newValues.minValue) === "number" && typeof(newValues.maxValue) === "number") {
            if (newValues.minValue < MIN_LIMIT_VALUE || newValues.maxValue > MAX_LIMIT_VALUE || newValues.minValue >= newValues.maxValue) {
                setMessage('incorrect value!')
                setSetDisabled(true)
            } else {
                setMessage('enter values and press \'set\'')
                setSetDisabled(false)
            }
        }
    }    

    const setCountHandler = () => {

        if (typeof(values.minValue) === 'number' && typeof(values.maxValue) === 'number' &&  values.minValue >= MIN_LIMIT_VALUE && values.maxValue <= MAX_LIMIT_VALUE && values.minValue <= values.maxValue) {
            setMessage(null)
            setCount(values.minValue)
            setSetDisabled(true)
            setIncDisabled(false)
            setResetDisabled(false)
        } 
    }

    const incrementHahdler = () => {
        
        if (typeof(count) === 'number' && typeof(values.maxValue) === 'number') {
            setCount(count + 1)
            if (count >= values.maxValue - 1) {
                setIncDisabled(true)
            }
        }
    }

    const resetHandler = () => {
        setIncDisabled(false)
        setCount(values.minValue)
    }

    const setSettingsHandler = () => {
        setSetDisabled(message === 'incorrect value!')
        setIncDisabled(true)
        setResetDisabled(true)
    }
    

    return (
        <div className="Counter">

            <div className="container">

                <div className="block" style={{gap: '15px'}}>

                    <div style={{display: 'flex', gap: '20px'}}>
                        <label className="label">max value:</label>
                        <input 
                            value={values.maxValue}
                            className={
                                (values.maxValue !== undefined 
                                    && (values.maxValue > MAX_LIMIT_VALUE 
                                        || values.maxValue <= values.minValue!))
                                        ? 'inputerror' : 'input'} 
                            type="number"
                            step={1}
                            onClick={setSettingsHandler}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => getValuesHandler(event, 'maxValue')}
                        />    
                    </div>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <label className="label">start value:</label>
                        <input 
                            value={values.minValue}
                            className={
                                (values.minValue !== undefined 
                                    && (values.minValue < MIN_LIMIT_VALUE 
                                        || values.minValue >= values.maxValue!))
                                        ? 'inputerror' : 'input'}  
                            type="number"
                            step={1}                          
                            onChange={(event: ChangeEvent<HTMLInputElement>) => getValuesHandler(event, 'minValue')}
                            onClick={setSettingsHandler}    
                        />    
                    </div>    
                    
                </div>

                <div className='buttonFrame' >
                    <button 
                        disabled={isSetDisabled}
                        className="btn"
                        onClick={setCountHandler}>
                            set
                    </button>
                </div>

            </div>
        

            <div className="container">

                <div className="block">
                    <h2 className={count === values.maxValue ? 'bigredcount' : 'count'}>
                        {count}
                    </h2>
                    <h2 className={message === "incorrect value!" ? 'redtext' : 'text'}>
                        {message}
                    </h2>
                </div>

                <div className='buttonFrame'>
                    <button 
                        disabled={isIncDisabled}
                        className="btn"
                        onClick={incrementHahdler}>
                            inc
                    </button>
                    <button 
                        disabled={isResetDisabled}
                        className="btn"
                        onClick={resetHandler}>
                            reset
                    </button> 
                </div>

            </div>

        </div>
    
    );
};
