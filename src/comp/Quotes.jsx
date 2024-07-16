import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Select, Button,  Skeleton } from '@chakra-ui/react'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Quotes() {
  const MySwal = withReactContent(Swal)
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [author,setAuthor] = useState('')

  const skStart = getComputedStyle(document.documentElement).getPropertyValue('--skeleton-start');
  const skEnd = getComputedStyle(document.documentElement).getPropertyValue('--skeleton-end');
    
  let fetchQuotes = async () => {
    setLoading(true)
    
  try {
      
      const response = await axios.get('/quotes');
      const filterQuotes = response.data.filter((quote) => 
        !author || quote.a === author
      ).slice(0, 15);
      setQuotes(filterQuotes);
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
          <Select
           onChange={(e) => setAuthor(e.target.value)}
           placeholder='Select Author'>
            <option value='Abraham Lincoln'>Abraham Lincoln</option>
            <option value="Alan Watts">Alan Watts</option>
            <option value="Albert Einstein">Albert Einstein</option>
          </Select>
          <Button
        className='mx-3 bg-secondary border text-primary'
        isLoading={loading}
        onClick={fetchQuotes}
        colorScheme='teal'>
          Search
        </Button>
        </form>
      </div>
      <div className='mt-8'>
        <h4 className='mb-4'>Random Quotes</h4>
        <div className='grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 md:gap-y-6 gap-y-4 md:gap-x-6 gap-x-4'>
        {loading ? (
            [...Array(15)].map((_, index) => (
              <Skeleton key={index} height="18rem" startColor={skStart} endColor={skEnd} rounded={'10px'} className='p-3 rounded-lg w-full h-72' />
            ))
          ) : (
            quotes.map((quote, index) => {
              return <div key={index} isloading={!loading} className=''>
              <div className="card bg-secondary p-3 rounded-lg w-full h-72 flex flex-col items-center overflow-hidden">
                <h2>{quote.a}</h2>
                <div className='text-sm md:mt-10 mt-7'>
                  <p className='font-semibold'>{quote.q}</p>
                </div>
              </div>
            </div>
            })
          )}

        </div>
      </div>
    </>
  )
}

export default Quotes