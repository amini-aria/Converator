// Aria File Studio - script.js

const body=document.body;
const themeBtn=document.getElementById('themeButton');
const langBtn=document.getElementById('langButton');
const dropZone=document.getElementById('dropZone');
const fileInput=document.getElementById('fileInput');
const selectBtn=document.getElementById('selectFiles');
const fileList=document.getElementById('fileList');
const progress=document.getElementById('progressBar');
const progressText=document.getElementById('progressText');
const startBtn=document.getElementById('startConvert');

let files=[];

themeBtn?.addEventListener('click',()=>{
 body.classList.toggle('dark');
 localStorage.setItem('theme',body.classList.contains('dark')?'dark':'light');
});

if(localStorage.getItem('theme')==='dark') body.classList.add('dark');

langBtn?.addEventListener('click',()=>{
 const fa=document.documentElement.lang==='fa';
 document.documentElement.lang=fa?'en':'fa';
 document.documentElement.dir=fa?'ltr':'rtl';
 langBtn.textContent=fa?'🇬🇧 EN':'🇮🇷 فارسی';
});

selectBtn?.addEventListener('click',()=>fileInput.click());
dropZone?.addEventListener('click',()=>fileInput.click());

fileInput?.addEventListener('change',e=>handleFiles([...e.target.files]));

['dragenter','dragover'].forEach(ev=>{
 dropZone?.addEventListener(ev,e=>{
  e.preventDefault();
  dropZone.classList.add('dragging');
 });
});
['dragleave','drop'].forEach(ev=>{
 dropZone?.addEventListener(ev,e=>{
  e.preventDefault();
  dropZone.classList.remove('dragging');
 });
});
dropZone?.addEventListener('drop',e=>{
 handleFiles([...e.dataTransfer.files]);
});

function handleFiles(newFiles){
 files.push(...newFiles);
 renderFiles();
}

function renderFiles(){
 if(!fileList) return;
 fileList.innerHTML='';
 files.forEach((f,i)=>{
  const li=document.createElement('li');
  li.textContent=`${i+1}. ${f.name} (${Math.round(f.size/1024)} KB)`;
  fileList.appendChild(li);
 });
}

startBtn?.addEventListener('click',async()=>{
 if(!files.length){
  alert('ابتدا فایل انتخاب کنید.');
  return;
 }
 for(let i=0;i<=100;i+=5){
  progress.style.width=i+'%';
  progressText.textContent=i+'%';
  await new Promise(r=>setTimeout(r,40));
 }
 progressText.textContent='آماده برای اتصال به ماژول‌های تبدیل';
});

console.log('Aria File Studio Ready');
