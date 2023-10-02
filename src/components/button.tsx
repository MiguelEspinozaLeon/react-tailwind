export default function Button({children, twdclass, onclickevent}: {children: string, twdclass: string, onclickevent: () => void}){
    return (
        <>
            <button onClick={onclickevent} className={twdclass}>{children}</button>
        </>
    )
}