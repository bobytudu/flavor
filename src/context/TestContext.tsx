import React, { createContext, useContext, useMemo, useState } from 'react'
interface TestContextInterface {
  state: boolean
  setState: React.Dispatch<React.SetStateAction<boolean>>
  screenTitle?: string
  setScreenTitle?: React.Dispatch<React.SetStateAction<string>>
}

const initialState = {} as TestContextInterface

const TestContext = createContext<TestContextInterface>(initialState)

export const useTestData = () => useContext(TestContext)

const TestContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<boolean>(true)
  const [screenTitle, setScreenTitle] = useState<string>('Home')

  const contextValue = useMemo(() => ({ state, setState, screenTitle, setScreenTitle }), [state, setState, screenTitle, setScreenTitle])

  return <TestContext.Provider value={contextValue}>{children}</TestContext.Provider>
}

export default TestContextProvider
