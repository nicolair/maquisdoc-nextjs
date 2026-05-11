import Container from "@mui/material/Container";

function DetailsSpec({context}){
    //const typenoeud = context['typenoeud'];
    const props = context['props'];
    const typeEvt = props['typeEvt'];

    return (
      <Container maxWidth="md" sx={{mt: 3, mb:3}}>
           uuid: {props['uuid']} <br/>
           typeEvt: {typeEvt}
      </Container>      
    )
};

function EvenementCloseView({context}){
  //const typenoeud = context['typenoeud'];
  const props = context['props'];
  return (
    <div> 
      <h3> 
        Vue de près de l'événement "{props['nom']}"
      </h3>
      <DetailsSpec context={context}/>
    </div>
  )
};

export default EvenementCloseView 
