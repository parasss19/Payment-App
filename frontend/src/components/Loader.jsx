import {ClipLoader} from 'react-spinners'

const Loader = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <ClipLoader size={16} color="#ffffff" />
    </div>
  )
}

export default Loader