import React ,{useState,useEffect } from 'react'
import axios from 'axios'
import Header from './Header'
import Apply from './Apply'
import List from './List'


export function Dashboard () {
  const [PFA,setPFA] = useState(false);
  const [apply,setApply] =useState(false);
  const [employee,setEmployee] = useState('');

  useEffect(()=>{
    getemployees()
  },[apply])

  const getemployees = async () => {
    try {
      const { data } = await axios.get("/api/v1/employees" );
      console.log(data.Info)
      setEmployee(data.Info);
      
    } catch (error) {
      console.log(error);
    }

  }
  const handleView=(id)=>{
     console.log('id',id)
  }

  return (
    <div className='container'>
         {!PFA  && !apply && (
                <>
                    <Header
                        setApply={setApply}
                    />
                    <List
                        employee={employee}
                        setPFA={setPFA}
                      
                    />
                </>
            )}
           
              {apply && (
                <Apply
                      setApply={setApply}
                />
            )}
               {PFA && (
                <PFA />
            )}

      </div>
  )
}

