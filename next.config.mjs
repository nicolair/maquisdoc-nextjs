import createMDX from '@next/mdx'
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
}
 
const withMDX = createMDX({
  // Add markdown plugins here, as desired
    extension: /\.(md|mdx)$/,
    options: {
      remarkPlugins: ['remark-gfm', 'remark-math', 'remark-frontmatter'],
      rehypePlugins: [['rehype-katex', {strict: true, throwOnError: true}]],
    },
})
 
// Merge MDX config with Next.js config
export default withMDX(nextConfig)
