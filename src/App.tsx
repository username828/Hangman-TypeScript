import { useCallback, useEffect, useState } from "react"
import words from "./wordList.json"
import { HangmanDrawing } from "./components/HangmanDrawing";
import { HangmanWord } from "./components/HangmanWord";
import { Keyboard } from "./components/Keyboard";

function App() {
  const [wordToGuess]= useState(()=>{
    return words[Math.floor(Math.random()*words.length)]; //random word from list
  });

  const [guessedLetters,setGuessedLetters]=useState<string[]>(['']);
  const incorrectLetters = guessedLetters.filter(letter=>!wordToGuess.includes(letter))
  const isLoser=incorrectLetters.length>=6;
  const isWinner=wordToGuess.split("").every(letter=>guessedLetters.includes(letter));

  const addGuessedLetter = useCallback((letter: string)=>{
    if(guessedLetters.includes(letter) || isLoser || isWinner)return
    setGuessedLetters(currentLetters => [...currentLetters, letter])
  },[guessedLetters,isLoser,isWinner])

  useEffect(()=>{
    const handler=(e:KeyboardEvent)=>{
      const key=e.key
      if(!key.match(/^[a-z]$/)) return
      e.preventDefault()
      addGuessedLetter(key);
    }
    document.addEventListener("keypress",handler)

    return ()=>{
      document.removeEventListener("keypress",handler)
    }
  },[guessedLetters])
  
  return (
    <div style={{
      maxWidth: "800px", display: "flex", flexDirection: "column", gap: "2rem", margin: "0 auto", alignItems:"center"
    }}>

      <div style={{fontSize:"2rem",textAlign:"center"}}>
        {isWinner && "Winner! - Refresh to try again"}
        {isLoser && "Loser! - You Lost"}
      </div>      
      <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
      <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div style={{alignSelf:'stretch'}}>
        <Keyboard activeLetters={guessedLetters.filter(letter=>wordToGuess.includes(letter))}
          inactiveLetters={incorrectLetters} addGuessedLetter={addGuessedLetter}
          disabled={isWinner || isLoser}
        />
      </div>


    </div>
  )
}

export default App
