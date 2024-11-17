

import React from 'react'

type Props = {
    params : {
        id : string}

}

function AdminRecipeDetails({params}:Props) {
  return (
    <h1>{params.id}</h1>
  )
}

export default AdminRecipeDetails