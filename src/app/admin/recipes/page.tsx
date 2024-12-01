import RecipesAdminSection from '@/presentation/components/(ADMIN)/section/recipesAdminSection';

export default  function RecipesAdminPage() {

  return (
    <div className="container mx-auto p-4">
      <div>
        <h1 className="text-3xl font-bold mb-6">Gestione delle Ricette</h1>
      </div>

      <RecipesAdminSection/>


    </div>
  );
}