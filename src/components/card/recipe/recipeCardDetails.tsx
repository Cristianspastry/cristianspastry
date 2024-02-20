

type Props = {
  preparationTime : string;
  difficulty : string;
}

const recipeCardDetails = ({preparationTime,difficulty}:Props) => {
  
  const details = [
    { label: 'Preparazione', value: preparationTime },
    { label: 'Difficoltà', value: difficulty },
  ];

    return (
      <div className="flex items-center text-sm text-gray-600 mb-2">
      {details.map(({label,value,index}:any) => (
        <p key={index} className="mr-2 text-lg">
          {label}: {value}
        </p>
      ))}
     
    </div>
    )
  };

  export default recipeCardDetails;