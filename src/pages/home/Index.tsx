import { useState } from 'react'
import logo from '../../logo.svg'
import styled from '@emotion/styled';

const Link = styled.a`
  color: #61dafb;
  text-decoration: none;
`

export {
  Link,
  Flex
}

// styled component that uses flex
const Flex = styled.div`
  display: flex;

  & > * {
    margin: 0 10px;
  }
`

function HomePage() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Home Page</p>
          <p>
            <h2>Count is: {count}</h2>
            <button type="button" onClick={() => setCount((count) => count + 1)}>
              Count
            </button>
          </p>
            <Flex>
              <Link href="/">Go to index page</Link>
            </Flex>
        </header>
      </div>
    </div>
  )
}

export default HomePage
