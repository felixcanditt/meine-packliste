import styled from 'styled-components/macro';

export default function App() {
  return (
    <main>
      <Headline>Hello World</Headline>
    </main>
  );
}

//export default App;

const Headline = styled.h1`
  color: hotpink;
`;
