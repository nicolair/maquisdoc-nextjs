import { getArticle } from "@/lib/api/journal_dev";
import Link from "@mui/material/Link";

async function RenderArticlePage({ params,}: { params: Promise<{ slug: string }>})
{
  const { slug } = await params;
  const articleData = await getArticle(slug);
  const articlePath = "@/mdx-pages/journal_dev/" + slug;
  const { default: articleText } = await import(articlePath);
  //console.log(articleData);
  return ( 
    <div> 
      <Link href="/journal_dev"> Retour journal</Link>
      <h3> 
        {articleData["titre"]} 
        <span className="pluspetit"> - {articleData["date"]}</span>
      </h3>
      {articleText()} 
    </div> )   
};


export default RenderArticlePage
