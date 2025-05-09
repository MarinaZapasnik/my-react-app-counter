import { ChangeEvent } from "react"

export type InputProps = {
    label: string
    placeholder: string
    className: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    onClick?: () => void
}


export const Input = ({label, placeholder, className, onChange, onClick}: InputProps) => {
    return (
        <div style={{display: 'flex', gap: '20px'}}>
            <label className="label">{label}</label>
            <input className={className} type='number' placeholder={placeholder} onChange={onChange} onClick={onClick}/>
        </div>
        
    )
}