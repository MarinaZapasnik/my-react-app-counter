export type ButtonProps = {
    title: string
    disabled?: boolean
    onClick: () => void
}

export const Button = ({title, onClick, disabled}: ButtonProps) => {
    return(
        <button className="btn" onClick={onClick} disabled={disabled}>{title}</button>
    )
}