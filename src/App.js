import styled from 'styled-components/macro';

export default function App() {
  return (
    <main>
      <Headline>Meine Packliste</Headline>
      <form onSubmit="">
        <input type="text" name="inputFieldForNewItem" />
        <button>zur Liste hinzufügen</button>
      </form>
    </main>
  );
}

const Headline = styled.h1`
  xcolor: hotpink;
`;
