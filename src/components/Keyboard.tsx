const KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

type KeyboardProps={
    activeLetters: string [],
    inactiveLetters: string [],
    addGuessedLetter: (letter: string)=>void,
    disabled?: boolean 
}
export const Keyboard = ({activeLetters,inactiveLetters,addGuessedLetter,disabled} : KeyboardProps) => {
  return(
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(75px,1fr)",gap:"0.5rem"}}>
    {KEYS.map(key=>{
        const isActive = activeLetters.includes(key)
        const isInactive = inactiveLetters.includes(key);

        return <button onClick={()=>addGuessedLetter(key)} style={{border: "3px solid black", padding: "0.5 rem", cursor:'pointer',aspectRatio:1/1,fontSize:"2.5rem",textTransform:"uppercase"}} 
        disabled={isInactive || isActive || disabled}
        key={key}>{key}</button>
    })}
  </div>

  )
};
