async function RenderSemainePage({ params,}: { params: Promise<{ slug: string }>})
{
  const { slug } = await params;

  const query = ``;
  
  const next = index === semaines.length - 1 ? semaines[0] :semaines[index + 1];
  const prev = index === 0 ? semaines[semaines.length - 1] : semaines[index - 1];

  return(
    <div>
      Année 2019-2020 en MPSI B<br/>
      Semaine: {slug}
    </div>
  )
};

export default RenderSemainePage;
