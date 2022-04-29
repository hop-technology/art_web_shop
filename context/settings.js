import {
  useEffect,
  useState,
  useReducer,
  createContext,
  useContext,
} from 'react'
import { currencies } from '../graphcms.config'
import useLocalStorage from '../hooks/use-local-storage'

const SettingsContext = createContext()

function reducer(state, action) {
  switch (action.type) {
    case 'SWITCH_CURRENCY':
      return { ...state, activeCurrency: action.payload }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

function SettingsProvider({ children }) {
  const [savedSettings, saveSettings] = useLocalStorage(
    'graphcms-commerce-reference',
    {
      activeCurrency: currencies.find((currency) => Boolean(currency.default)),
    }
  )
  const [state, dispatch] = useReducer(reducer, savedSettings)
  const [hasMounted, setHasMounted] = useState(false)

  const switchCurrency = (currency) =>
    dispatch({ type: 'SWITCH_CURRENCY', payload: currency })

  useEffect(() => {
    saveSettings(state)
  }, [state, saveSettings])

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null

  return (
    <SettingsContext.Provider
      value={{
        ...state,
        switchCurrency,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

const useSettingsContext = () => {
  const context = useContext(SettingsContext)

  if (!context)
    throw new Error('useSettingsContext must be used within a SettingsProvider')

  return context
}

export { SettingsProvider, useSettingsContext }
