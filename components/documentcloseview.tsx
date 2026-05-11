import Container from "@mui/material/Container";

import PdfPaperView from "@/components/pdfpaperview";

function DetailsSpec({context}){
    const typenoeud = context['typenoeud'];
    const props = context['props'];
    const url = props['url']? props['url']: "url";
    //console.log(url);
    function affichepdf(props){
      if (url !== "url"){
        return (
          <div>
            <PdfPaperView url={url}/>
          </div>
        )
      }
    }
    return (
        <div>
        <Container maxWidth="md" sx={{mt: 3, mb:3}}>
           uuid: {props['uuid']} <br/>
           typedoc: {props['typeDoc']} <br/>
        </Container>
        {affichepdf(props)}
        </div>
    )
};

function DocumentCloseView({context}){
  const typenoeud = context['typenoeud'];
  const props = context['props'];
  return (
    <div> 
      <h3> 
        Vue de près du document "{props['titre']}"
      </h3>
      <DetailsSpec context={context}/>
    </div>
  )
};

export default DocumentCloseView 
