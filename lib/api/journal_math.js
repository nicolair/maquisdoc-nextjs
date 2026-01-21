import  fs  from 'fs';

const path = process.cwd() + '/mdx-pages/journal_math';

function compare(a,b){
  if (a.date <= b.date) {
    return +1;
  } else {
    return -1;
  }
}

export function getArticle(file){
    const filePath = path + '/' + file;
    var slug = '/journal_math/' + file;
    //slug = slug.slice(0,-3);
    try {
      var fileStats = fs.statSync(filePath);
    } catch (err) {
      throw err;
    }
    try {
      var fileContent = fs.readFileSync(filePath, {encoding: 'utf8'});
      var lines = fileContent.split('\n',6);
      //console.log(lines);
    } catch (err) {
      throw err;
    }
    return {
      id: "id_" + file,
      slug: slug,
      titre: lines[2].split('"')[1],
      date: lines[3].split('"')[1],
      excerpt: lines[5].slice(0,50) + ' ...'   };
};

export async function getArticlesData(){
    const files = fs.readdirSync(path);
    const articles = files.map( getArticle);
    articles.sort(compare);
    //const TotalCount = articles.length;
    return articles;
}
