import type { MDXComponents } from 'mdx/types'
 
const components: MDXComponents = {
   // Allows customizing built-in components, e.g. to add styling.
  table: ({ children }) => (
    <table style={ { "table-layout": "fixed",
                     "margin-top": '10px',
                     "margin-bottom": '15px',
                     "margin-left": 'auto',
                     "margin-right": 'auto',
                     "border": '1px solid' } }>{children}</table>
  ),

  th: ({ children }) => (
    <th style={ { "padding": '10px',
                  "border": '1px solid' } }>{children}</th>
  ),
  td: ({ children }) => (
    <td style={ { "padding": '10px',
                  "border": '1px solid' } }>{children}</td>
  ),
  hr: ({ children }) => (
    <hr style={ { "margin": '10px'} }>{children}</hr>
  ),
  pre: ({ children }) => (
    <pre style={ { "margin-left": '10px',
                    "margin-bottom": '10px',
    } }>{children}</pre>
  ),
}
 
export function useMDXComponents(): MDXComponents {
  return components
}
