import React from 'react'

const Dropdown = ({title, options, setFunction}) => {
  return (
    <div className='select'>
        <select defaultValue="0" name="format" id="format" onChange={(e)=>setFunction(e.target.value.toLowerCase().replace(/\s/g, "_"))}>
            <option value="0" disabled>{title}</option>
            {
                options.map(opt=><option key={opt} value={opt}>{opt.toUpperCase()}</option>)
            }
        </select>
    </div>
  )
}

export default Dropdown