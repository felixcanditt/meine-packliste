import styled from 'styled-components/macro';
import { useState } from 'react';

export default function App() {
  /*
  _____________________
  VARIABLEN
  _____________________
  */

  const [packingList, updatePackingList] = useState([]); // öfter: setPackingList
  const [packingListOpen, updatePackingListOpen] = useState([]);
  // 1. Variable, 2. Methode zum Aktualisieren der Variable
  // leeres Array am Anfang
  console.log(packingList);
  console.log(packingListOpen);

  const [openOnly, changeViewToOpenOnly] = useState(false);
  // Klick auf Buttons verändert Zustand der Seite auf openOnly und zurück
  // Startwert: false, also nicht openOnly

  /*
  _____________________
  RETURN >>> das erscheint in der App
  _____________________
  */

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
      <button onClick={showAllItems}>alle Gegenstände anzeigen</button>
      <button onClick={showOnlyOpenItems}>
        nur fehlende Gegenstände anzeigen
      </button>
      <ul>{packingListOnScreen(openOnly ? packingListOpen : packingList)}</ul>
      {/* Abfrage: bist du openOnly? wenn ja, dann übergebe packingListOpen, sonst packingList */}
    </main>
  );

  /*
  _____________________
  FUNKTIONEN
  _____________________
  */

  function addNewItemToPackingList(event) {
    event.preventDefault(); // automatisches Neuladen der Seite verhindern
    const myForm = event.target; // Standard Befehl zum Auswählen des Formulars
    const inputField = myForm.eingabefeld;
    const newItem = {
      name: inputField.value,
      isPacked: false
    };
    updatePackingList([newItem, ...packingList]);
    updatePackingListOpen([newItem, ...packingListOpen]);
    // neues item auf die Listen setzen

    myForm.reset(); // Eingabezeile leeren
    inputField.focus(); // Cursor landet automatisch in Eingabezeile
  }

  //_____________________

  function packingListOnScreen(list) {
    return list.map((item, index) => (
      <li key={index}>
        <label>
          <input
            type="checkbox"
            checked={item.isPacked}
            onChange={(event) => changePackedStatusOfItem(item)}
          />
          {item.name}
        </label>
        <button
          onClick={(event) => {
            deleteItem(event, item);
          }}
        >
          löschen
        </button>
      </li>
    ));
  }

  //_____________________

  function changePackedStatusOfItem(itemWithNewPackedStatus) {
    // 1. Schritt: Ändern von packingList
    const packingListWithNewPackedStatus = packingList.map((item) => {
      // warum hier geschweifte Klammer {} ?
      if (item.name === itemWithNewPackedStatus.name) {
        item.isPacked = !item.isPacked;
      }
      return item;
      // was passiert hier? Abgleich des geänderten Items mit der Liste
      // >>> bei Übereinstimmung wird Packstatus geändert
      // >>> alle Items werden zurück in die Liste gegeben
    });
    updatePackingList(packingListWithNewPackedStatus);

    // 2. Schritt: Ändern von packingListOpen >>> Filtern von der aktualisierten packingList nach fehlenden Gegenständen (openItems)
    const openItems = packingList.filter((item) => item.isPacked === false);
    // console.log(openItems)
    updatePackingListOpen(openItems);
  }

  //_____________________

  function showOnlyOpenItems(event) {
    changeViewToOpenOnly(true);
    // Button ändert Status auf openOnly
  }

  //_____________________

  function showAllItems(event) {
    changeViewToOpenOnly(false);
    // Button ändert Status NICHT auf openOnly, also zurück auf alle Items
  }

  //_____________________

  function deleteItem(event, itemToBeDeleted) {
    const indexDeleteMe = packingList.findIndex(
      (item) => item.name === itemToBeDeleted.name
    );
    const packingListWithoutDeletedItem = packingList.slice();
    packingListWithoutDeletedItem.splice(indexDeleteMe, 1);

    updatePackingList(packingListWithoutDeletedItem);

    const openItems = packingListWithoutDeletedItem.filter(
      (item) => item.isPacked === false
    );
    updatePackingListOpen(openItems);

    // Alternative: packingList.splice(indexDeleteMe, 1)
    // >>> dadurch evtl direkte Veränderung von packingList, mir zu heikel
    // >>> dann wäre es "openItems = packingList.filter..."
  }
}

/*
  _____________________
  STYLED COMPONENTS
  _____________________
  */

const Headline = styled.h1`
  xcolor: hotpink;
`;
