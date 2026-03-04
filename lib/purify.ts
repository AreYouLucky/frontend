import DOMPurify from "dompurify";
export function purifyDom(text:string){
  return DOMPurify.sanitize(text);
}