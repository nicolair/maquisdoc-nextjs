import DefaultCloseView from "@/components/defaultcloseview";
import DocumentCloseView from "@/components/documentcloseview";
import ConceptCloseView from "@/components/conceptcloseview";
import EvenementCloseView from "@/components/evenementcloseview";
import LocalRelationsView from "@/components/localrelationsview";

function SpecView({context}){
        //console.log(context)
    switch (context.typenoeud){ 
      case "Document":
        return (
          <DocumentCloseView context={context}/>
        );
      case "Concept":
        return (
          <ConceptCloseView context={context}/>
        );
      case "Evenement":
        return (
          <EvenementCloseView context={context}/>
        );
      default:
        return(
          <DefaultCloseView context={context} />  
        );  
    }
};

function NodeCloseView({context}){
  const typenoeud = context['typenoeud'];
  const props = context['props'];
  return(
    <div>
          <SpecView context={context}/>
          <LocalRelationsView context={context}/>
    </div>
  )  
};

export default NodeCloseView 
