import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Select, Button } from '@chakra-ui/react'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Quotes() {
  const MySwal = withReactContent(Swal)
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnSpin, setBtnSpin] = useState(false);

  let fetchQuotes = async () => {
    setLoading(true)
    try {
      const response = await axios.get('/quotes')
      const mdQuotes = response.data.filter((data, index) => {
        return index < 15;
      })
      setQuotes(mdQuotes)
    } catch (error) {
      showError('Something went wrong! Check your internet connection and try again');
    } finally {
      setLoading(false)
    }
  }

  const showError = (error) => {
    MySwal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error,
      customClass: 'bg-primary text-primary'
    });
  }

  useEffect(() => {
    fetchQuotes()
  }, [])

  return (
    <>
      <div>
        <h5 className='my-3'>Add Filters</h5>
        <form className='flex'>
          <Select placeholder='Select Author'>
            <option value='Abraham Lincoln'>Abraham Lincoln</option>
            <option value="Alan Watts">Alan Watts</option>
            <option value="Albert Einstein">Albert Einstein</option>
          </Select>
          <Button
          className='mx-3 bg-secondary border text-primary'
          loadingText='Searching'
          >
          Search
          </Button>
        </form>
      </div>
      <div className='mt-8'>
        <h4 className='mb-4'>Random Quotes</h4>
        <div className='grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 md:gap-y-6 gap-y-4 md:gap-x-6 gap-x-4'>
          {quotes.map((quotes, index) => (
            <div key={index} className=''>
              <div className="card bg-secondary p-3 rounded-lg w-full h-72 flex flex-col items-center overflow-hidden">
                <h2>{quotes.a}</h2>
                <div className='text-sm md:mt-10 mt-7'>
                  <p className='font-semibold'>{quotes.q}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Quotes