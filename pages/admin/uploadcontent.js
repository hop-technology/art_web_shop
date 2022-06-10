import Papa from 'papaparse'
import createProduct from '../../lib/data/createProduct'

const uploadContent = () => {
  const handleFileUpload = (event) => {
    const files = event.target.files
    if (files) {
      console.log(files[0])
      Papa.parse(files[0], {
        header: true,
        complete: async function (results) {
          await Promise.all(
            results.data.map(async (product) => {
              createProduct(product)
            })
          )
        },
      })
    }
  }

  return (
    <input
      type='file'
      accept='.csv'
      onChange={(event) => handleFileUpload(event)}
    ></input>
  )
}

export default uploadContent
