import { getArticle } from "@/lib/api/journal_math";
import Link from "@mui/material/Link";

async function RenderArticlePage({ params,}: { params: Promise<{ slug: string }>})
{
  const { slug } = await params;
  const articleData = await getArticle(slug);
  const articlePath = "@/mdx-pages/journal_math/" + slug;
  const { default: articleText } = await import(articlePath);
  return ( 
    <div> 
      <Link href="/vues/journal_math"> Retour journal</Link>
      {articleText()} 
    </div> )   
};


export default RenderArticlePage
