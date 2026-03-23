import { getArticle } from "@/lib/api/journal_math";
import Link from "@mui/material/Link";

async function RenderArticlePage({ params,}: { params: Promise<{ slug: string }>})
{
  const { slug } = await params;
  const articleData = await getArticle(slug);
  const articlePath = "@/mdx-pages/journal_math/" + slug;
  const { default: articleText } = await import(articlePath);
  console.log(articleText);
  return ( 
    <div> 
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.40/dist/katex.min.css" integrity="sha384-mON/ih42JsLUsSfSt0ZgICEtv3P1FSm/qGKVl2cfuvShhc8Q91I7HhJFWtoKlq3k" crossorigin="anonymous"></link>
      <Link href="/vues/journal_math"> Retour journal math</Link>
      <h3> 
        {articleData["titre"]} 
        <span className="pluspetit"> - {articleData["date"]}</span>
      </h3>
      {articleText()} 
    </div> )   
};


export default RenderArticlePage
