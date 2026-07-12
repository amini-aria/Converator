// js/image-tools.js
export async function convertImage(file,{
  format="image/png",
  quality=0.9,
  maxWidth=null,
  maxHeight=null,
  rotate=0
}={}){
  const img=new Image();
  const url=URL.createObjectURL(file);
  await new Promise((res,rej)=>{
    img.onload=res; img.onerror=rej; img.src=url;
  });

  let w=img.width,h=img.height;
  if(maxWidth||maxHeight){
    const s=Math.min(
      maxWidth?maxWidth/w:1,
      maxHeight?maxHeight/h:1,
      1
    );
    w=Math.round(w*s); h=Math.round(h*s);
  }

  const c=document.createElement("canvas");
  const ctx=c.getContext("2d");

  if(rotate%180!==0){c.width=h;c.height=w;}
  else{c.width=w;c.height=h;}

  ctx.translate(c.width/2,c.height/2);
  ctx.rotate(rotate*Math.PI/180);
  ctx.drawImage(img,-w/2,-h/2,w,h);

  const blob=await new Promise(r=>c.toBlob(r,format,quality));
  URL.revokeObjectURL(url);
  return blob;
}

export function downloadBlob(blob,name){
  const a=document.createElement("a");
  const u=URL.createObjectURL(blob);
  a.href=u;
  a.download=name;
  a.click();
  setTimeout(()=>URL.revokeObjectURL(u),500);
}
