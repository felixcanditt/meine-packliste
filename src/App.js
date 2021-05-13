import styled from 'styled-components/macro';
import { useState } from 'react';

export default function App() {
  //const { listItems, setListItems } = useState([]);

  //test: geht was anderes?
  function onSubmitForm(event) {
    event.preventDefault(); // automatisches Neuladen der Seite verhindern
    const myForm = event.target; // Standard Befehl zum Auswählen des Formulars
    const inputField = myForm.eingabefeld;
    console.log(inputField.value);
    myForm.reset(); // Eingabezeile leeren
    inputField.focus(); // Cursor landet automatisch in Eingabezeile
  }

  return (
    <main>
      <Headline>Meine Packliste</Headline>
      <form
        onSubmit={onSubmitForm}
        /* kurz für:
         {(event) => {
            onSubmitForm(event);
          }}
          */
      >
        <input type="text" name="eingabefeld" />
        <button>zur Liste hinzufügen</button>
      </form>
      <ul>
        <li>Zahnbürste</li>
      </ul>
    </main>
  );
}

const Headline = styled.h1`
  xcolor: hotpink;
`;

//    inputField.value muss in Liste: virtuell und auf Bildschirm
