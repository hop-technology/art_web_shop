import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useSettingsContext } from '../context/settings'
import { currencies, locales } from '../graphcms.config'
import { Select } from './form/form'

const Footer = ({ categories = [] }) => {
  const router = useRouter()
  const { activeCurrency, switchCurrency } = useSettingsContext()

  const activeLocale = locales.find((locale) => locale.value === router.locale)

  const updateLocale = (event) => {
    const path = ['/cart'].includes(router.asPath) ? router.asPath : '/'

    router.push(path, path, { locale: event.target.value })
  }

  const updateCurrency = (event) => {
    const currency = currencies.find(
      (currency) => currency.code === event.target.value
    )

    switchCurrency(currency)
  }

  return (
    <footer className='footer'>
      <div className='content'>
        <div className='content__image'>
          <Image
            src='/Walborg_logo_Center_BLACK.png'
            height={100}
            width={120}
            alt='Walborg logo'
            priority
          />
        </div>
        <div className='content__categories'>
          {categories.map((category) => (
            <ol>
              <li key={category.id}>
                <Link href={`/${category.type.toLowerCase()}/${category.slug}`}>
                  <a>{category.name}</a>
                </Link>
              </li>
            </ol>
          ))}
        </div>
        <div className='content__selection'>
          <form>
            <Select
              className=''
              defaultValue={activeLocale.value}
              field='language'
              label='Language'
              onChange={updateLocale}
              options={locales}
            />
            <Select
              className=''
              defaultValue={activeCurrency.code}
              field='currency'
              label='Currency'
              onChange={updateCurrency}
              options={currencies.map((currency) => ({
                label: currency.code,
                value: currency.code,
              }))}
            />
          </form>
        </div>
      </div>
    </footer>
  )
}

export default Footer
