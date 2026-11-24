// MADA SOCIAL — interface mobile inspirée des réseaux sociaux.
const SUPABASE_URL = "https://srijxnznzxpaykwepjqq.supabase.co";
const SUPABASE_KEY = "sb_publishable_Tn1f7cPtiXGw4dRuLZq5dg_SX-4nRqW";
let db = null;
if (window.supabase?.createClient) db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const $ = id => document.getElementById(id);
const toast = msg => { const el=$("toast"); el.textContent=msg; el.classList.add("show"); setTimeout(()=>el.classList.remove("show"),2600); };
function openComposer(){ $("composerExpanded").classList.remove("hidden"); $("postText").focus(); }
$("openComposer").addEventListener("click",openComposer);
$("newPostTop").addEventListener("click",()=>{openComposer();window.scrollTo({top:0,behavior:"smooth"});});
$("publishBtn").addEventListener("click",openComposer);
$("photoBtn").addEventListener("click",()=>{openComposer();$("imageUrl").focus();});
$("feelingBtn").addEventListener("click",()=>toast("Ajoutez votre humeur dans le texte de la publication."));
document.querySelectorAll("[data-tab]").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll("[data-tab]").forEach(b=>b.classList.remove("active"));document.querySelectorAll(`[data-tab="${btn.dataset.tab}"]`).forEach(b=>b.classList.add("active"));if(btn.dataset.tab!=="home")toast("Cette rubrique sera activée dans la prochaine mise à jour.");}));
document.querySelectorAll(".like-btn").forEach(btn=>btn.addEventListener("click",()=>{btn.classList.toggle("liked");btn.textContent=btn.classList.contains("liked")?"♥ J’aime":"♡ J’aime";}));
$("submitPost").addEventListener("click",async()=>{
  const content=$("postText").value.trim(), image_url=$("imageUrl").value.trim();
  if(!content && !image_url){toast("Écrivez un message ou ajoutez un lien d’image.");return;}
  if(!db){toast("Connexion Supabase indisponible.");return;}
  const {data:{user},error:authError}=await db.auth.getUser();
  if(authError||!user){toast("Connectez-vous pour publier. L’espace de connexion doit être configuré.");return;}
  const {error}=await db.from("posts").insert({user_id:user.id,content,image_url});
  if(error){toast("Publication non envoyée : vérifiez les colonnes de la table posts.");console.error(error);return;}
  $("postText").value="";$("imageUrl").value="";$("composerExpanded").classList.add("hidden");toast("Publication envoyée !");
});
async function loadPosts(){
  if(!db)return;
  const {data,error}=await db.from("posts").select("*").order("created_at",{ascending:false}).limit(20);
  if(error){console.warn("Lecture du fil impossible",error);return;}
  if(!data?.length)return;
  const feed=$("feed");feed.innerHTML="";
  data.forEach(p=>{
    const article=document.createElement("article");article.className="post card";
    const head=document.createElement("div");head.className="post-head";
    const avatar=document.createElement("div");avatar.className="avatar gradient";avatar.textContent="M";
    const author=document.createElement("div");author.className="post-author";
    const name=document.createElement("b");name.textContent="Membre MADA SOCIAL";
    const small=document.createElement("small");small.textContent=p.created_at?new Date(p.created_at).toLocaleString("fr-FR"):"Publication";
    author.append(name,small);head.append(avatar,author);
    const body=document.createElement("p");body.textContent=p.content||"";
    article.append(head,body);
    if(p.image_url){const img=document.createElement("img");img.src=p.image_url;img.alt="Image publiée";img.loading="lazy";img.style.cssText="width:100%;max-height:420px;object-fit:cover;border-radius:9px";article.append(img);}
    const actions=document.createElement("div");actions.className="post-actions";
    ["♡ J’aime","▢ Commenter","↗ Partager"].forEach(t=>{const b=document.createElement("button");b.textContent=t;b.addEventListener("click",()=>toast("Cette action sera connectée dans la prochaine mise à jour."));actions.append(b);});
    article.append(actions);feed.append(article);
  });
}
loadPosts();
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(()=>{}));
