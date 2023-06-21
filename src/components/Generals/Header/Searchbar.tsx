import { FormEvent, useRef } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

function SearchBar() {
  const searchTerm = useRef(null)
  const navigate = useNavigate()

  const handleStartSearch = (e: FormEvent) => {
    e.preventDefault()
    if (searchTerm.current) {
      const { value } = searchTerm.current
      if (value) {
        navigate(`/san-pham?q=${value}`)
      }
    }
  }

  return (
    <div className='tw-border-t-0 tw-border-l-0 tw-border-b-0 tw-border-r tw-border-solid tw-border-[#ddd]'>
      <form
        onSubmit={(e) => handleStartSearch(e)}
        className='tw-border-0 tw-w-full tw-relative tw-flex tw-items-center tw-rounded-[50px]'
      >
        <input
          className='tw-w-full tw-h-[35px] tw-leading-[35px] tw-bg-transparent tw-text-formInput tw-pl-5 tw-pr-[70px] tw-border-0 tw-outline-none'
          placeholder='Nhập tên sản phẩm...'
          type='text'
          ref={searchTerm}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleStartSearch(e)
            }
          }}
        />
        <button
          title='Search'
          type='submit'
          className='tw-leading-[38px] tw-text-formInput tw-cursor-pointer tw-bg-inherit tw-absolute tw-h-full tw-right-0 tw-top-0 tw-border-0 tw-text-xl tw-w-[50px]'
        >
          <FontAwesomeIcon icon={faSearch} className='tw-text-xl' />
        </button>
      </form>
    </div>
  )
}

export default SearchBar
