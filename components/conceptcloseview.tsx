import Container from "@mui/material/Container";

function DetailsSpec({context}){
    const typenoeud = context['typenoeud'];
    const props = context['props'];
    return (
      <Container maxWidth="md" sx={{mt: 3, mb:3}}>
           uuid: {props['uuid']}
      </Container>      
    )
};

function ConceptCloseView({context}){
  const typenoeud = context['typenoeud'];
  const props = context['props'];
  return (
    <div> 
      <h3> 
        Vue de près du concept "{props['litteral']}"
      </h3>
      <DetailsSpec context={context}/>
    </div>
  )
};

export default ConceptCloseView 
