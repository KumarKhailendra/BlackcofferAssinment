import React from 'react'
import Select from 'react-select';

const SelectFild = ({value, setValue, data, title}) => {
  return (
        <div style={{width:"250px"}}>
            <p>{title}</p>
            <Select
                defaultValue={value}
                onChange={(e)=>{
                    if(e === null) return setValue('')
                    setValue(e.value)
                }}
                options={data}
                isClearable={true}
            />
        </div>
  )
}

export default SelectFild