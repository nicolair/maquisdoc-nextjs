import Container from "@mui/material/Container";

function DetailsSpec({props, typenoeud}){
    return (
        <div>
        <Container maxWidth="md" sx={{mt: 3, mb:3}}>
           type du noeud : {typenoeud} <br/>
           typedoc: {props['typeDoc']}
        </Container>
        </div>
    )
};

function DocumentCloseView({props, typenoeud}){
  return (
    <div> 
      <h3> 
        Vue de près du document {props['uuid']}
      </h3>
      <DetailsSpec typenoeud={typenoeud} props={props}/>
    </div>
  )
};

export default DocumentCloseView 
