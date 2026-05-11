import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

function PdfPaperView({url}){
  //console.log(url);
  return(
    <div>
    <Paper sx={{mt: 3, mb:3, pt:1, pl:1}}>
      <object
        data={url}
        type="application/pdf"
        width="99%"
        height="300px"
        css="border-style: none"
      >
        {url} le pdf manque ou le navigateur ne permet pas de l'afficher 
      </object>
    </Paper>
    </div>
  )
};

export default PdfPaperView

