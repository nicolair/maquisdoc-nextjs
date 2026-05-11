async function RenderFeuilleRapidexo({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
})
{
  const props = (await searchParams);
  //console.log(props);
  return(
    <div>
      <h3>
        Vue d'une feuille Rapidexo
      </h3>
      {JSON.stringify(props, null, 2)}
    </div>
  )
};

export default RenderFeuilleRapidexo;
