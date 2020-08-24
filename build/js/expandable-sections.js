import{useState as r}from"../web_modules/react.js";import c from"../web_modules/react-dom.js";import{html as s}from"../web_modules/htm/react.js";const l=[{title:"Introduction",body:"In this section, we are taking a first look at the ideas are covered by this document."},{title:"The details",body:"In this section, we examine the ideas in more details."},{title:"Conclusion",body:"In this section, we’ll look at what we have learned and next steps you can take."}];function m(n){return n.map(e=>({...e,expanded:!1}))}function u(n,e){return n.map((t,o)=>({...t,expanded:o===e}))}function h({sections:n}){const[e,t]=r(n);return e.map((o,i)=>s`
    <${p} key=${i} sections=${e} setSections=${t} section=${o} sectionIndex=${i} />
  `)}function p({sections:n,setSections:e,section:t,sectionIndex:o}){return s`
    <div style=${{marginBottom:"1em"}}>
      <h3>
        <a href="" style=${{textDecoration:"none"}} onClick=${i.bind(void 0,o)}>
          ${t.expanded?"▼ ":"▶︎ "}
          ${t.title}
        </a>
      </h3>
      ${t.expanded?s`
          <div>
            ${t.body}
          </div>
        `:null}
    </div>
  `;function i(d,a){a.preventDefault(),e(u(n,d))}}c.render(s`<${h} sections=${m(l)} />`,document.getElementById("root"));
