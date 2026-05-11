
function DefaultCloseView({context}){
  const typenoeud = context['typenoeud'];
  const props = context['props'];
  return (
    <div> 
      <h3> 
        Vue de près par défaut du noeud 
      </h3>
      uuid: {props['uuid']} <br/>
      type: {typenoeud}
    </div>
  )
};

export default DefaultCloseView 
