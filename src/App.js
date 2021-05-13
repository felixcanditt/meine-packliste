import styled from 'styled-components/macro';
import { useState } from 'react';

export default function App() {
  const [packingListItems, updatePackingListItems] = useState([]);
  // Variable, Methode zum Aktualisieren der Variable
  // leeres Array am Anfang
  console.log(packingListItems);

  return (
    <main>
      <Headline>Meine Packliste</Headline>
      <form
        onSubmit={addNewItemToPackingList}
        /* kurz für:
         {(event) => {
            onSubmitForm(event);
          }}
          */
      >
        <input type="text" name="eingabefeld" />
        <button>zur Liste hinzufügen</button>
      </form>
      <ul>{showPackingListOnScreen(packingListItems)}</ul>
    </main>
  );

  function addNewItemToPackingList(event) {
    event.preventDefault(); // automatisches Neuladen der Seite verhindern
    const myForm = event.target; // Standard Befehl zum Auswählen des Formulars
    const inputField = myForm.eingabefeld;
    const newItem = {
      name: inputField.value,
      isPacked: false
    };
    updatePackingListItems([newItem, ...packingListItems]); // neues item auf die Liste setzen

    myForm.reset(); // Eingabezeile leeren
    inputField.focus(); // Cursor landet automatisch in Eingabezeile
  }

  function showPackingListOnScreen(itemsList) {
    // warum hier normale Klammer () ?
    return itemsList.map((item) => (
      <li>
        <label>
          <input
            type="checkbox"
            checked={item.isPacked}
            onChange={(event) => changePackedStatusOfItem(item)}
          />
          {item.name}
        </label>
      </li>
    ));
  }

  function changePackedStatusOfItem(itemWithNewPackedStatus) {
    // warum hier geschweifte Klammer {} ?
    const packingListWithNewPackedStatus = packingListItems.map((item) => {
      if (item.name === itemWithNewPackedStatus.name) {
        item.isPacked = !item.isPacked;
      }
      return item;
    });
    updatePackingListItems(packingListWithNewPackedStatus);
  }
}

const Headline = styled.h1`
  xcolor: hotpink;
`;

//    liste auf bildschirm malen
