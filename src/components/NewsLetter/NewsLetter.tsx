


import React from 'react'

type Props = {}

const NewsLetter = (props: Props) => {
  return (
    <>
    <form className=" m-4 flex flex-col items-center justify-center pt-4 border rounded-lg p-4 bg-gray-100">
        <h1 className="text-2xl font-semibold mb-4">Iscriviti alla newsletter</h1>
        <div className="flex items-center">
          <input
            type="email"
            className=" mr-1 border border-gray-300 px-4 py-2 rounded-l-md focus:outline-none focus:ring  focus:border-b-lime-400"
            placeholder="inserisci l'indirizzo Email"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Iscriviti
          </button>
        </div>
      </form>
    </>
  )
}
export default NewsLetter;