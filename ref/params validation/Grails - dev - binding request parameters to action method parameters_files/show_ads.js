(function(){var g=!0,h=null,i=!1,aa=function(a,b,c){return a.call.apply(a.bind,arguments)},ba=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var e=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,e);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},j=function(a,b,c){j=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?aa:ba;return j.apply(h,arguments)};var k=(new Date).getTime();var ca=/&/g,da=/</g,ea=/>/g,ga=/\"/g,m={"\x00":"\\0","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\x0B",'"':'\\"',"\\":"\\\\"},r={"'":"\\'"};var u=window,x,ha=h,y=document.getElementsByTagName("script");y&&y.length&&(ha=y[y.length-1].parentNode);x=ha;var ia=function(a){a=parseFloat(a);return isNaN(a)||1<a||0>a?0:a},ja=/^([\w-]+\.)*([\w-]{2,})(\:[0-9]+)?$/,ka=function(a){return!a?"pagead2.googlesyndication.com":(a=a.match(ja))?a[0]:"pagead2.googlesyndication.com"};var z=function(){return ka("")};z();var A=function(a){return!!a&&"function"==typeof a&&!!a.call},la=function(a,b){if(!(2>arguments.length))for(var c=1,e=arguments.length;c<e;++c)a.push(arguments[c])};function B(a){return"function"==typeof encodeURIComponent?encodeURIComponent(a):escape(a)}var ma=function(a,b){if(!(1E-4>Math.random())){var c=Math.random();if(c<b)return a[Math.floor(c/b*a.length)]}return h},C=function(a){try{return!!a.location.href||""===a.location.href}catch(b){return i}};var D=h,na=function(){if(!D){for(var a=window,b=a,c=0;a!=a.parent;)if(a=a.parent,c++,C(a))b=a;else break;D=b}return D};var G,H=function(a){this.c=[];this.a=a||window;this.b=0;this.d=h},oa=function(a,b){this.m=a;this.j=b};H.prototype.p=function(a,b){0==this.b&&0==this.c.length&&(!b||b==window)?(this.b=2,this.g(new oa(a,window))):this.i(a,b)};H.prototype.i=function(a,b){this.c.push(new oa(a,b||this.a));pa(this)};H.prototype.q=function(a){this.b=1;a&&(this.d=this.a.setTimeout(j(this.f,this),a))};H.prototype.f=function(){1==this.b&&(this.d!=h&&(this.a.clearTimeout(this.d),this.d=h),this.b=0);pa(this)};H.prototype.r=function(){return g};
H.prototype.nq=H.prototype.p;H.prototype.nqa=H.prototype.i;H.prototype.al=H.prototype.q;H.prototype.rl=H.prototype.f;H.prototype.sz=H.prototype.r;var pa=function(a){a.a.setTimeout(j(a.n,a),0)};H.prototype.n=function(){if(0==this.b&&this.c.length){var a=this.c.shift();this.b=2;a.j.setTimeout(j(this.g,this,a),0);pa(this)}};H.prototype.g=function(a){this.b=0;a.m()};
var qa=function(a){try{return a.sz()}catch(b){return i}},ra=function(a){return!!a&&("object"==typeof a||"function"==typeof a)&&qa(a)&&A(a.nq)&&A(a.nqa)&&A(a.al)&&A(a.rl)},sa=function(){if(G&&qa(G))return G;var a=na(),b=a.google_jobrunner;return ra(b)?G=b:a.google_jobrunner=G=new H(a)},ta=function(a,b){sa().nq(a,b)},ua=function(a,b){sa().nqa(a,b)};var va=/MSIE [2-7]|PlayStation|Gecko\/20090226/i,wa=/Android|Opera/,xa=function(){var a=I,b=J.google_ad_width,c=J.google_ad_height,e=["<iframe"],d;for(d in a)a.hasOwnProperty(d)&&la(e,d+"="+a[d]);e.push('style="left:0;position:absolute;top:0;"');e.push("></iframe>");b="border:none;height:"+c+"px;margin:0;padding:0;position:relative;visibility:visible;width:"+b+"px";return['<ins style="display:inline-table;',b,'"><ins id="',a.id+"_anchor",'" style="display:block;',b,'">',e.join(" "),"</ins></ins>"].join("")};var ya=/^true$/.test("false")?g:i;var za=function(a,b,c){c||(c=ya?"https":"http");return[c,"://",a,b].join("")};var Aa=function(){},Ca=function(a,b,c){switch(typeof b){case "string":Ba(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(b==h){c.push("null");break}if(b instanceof Array){var e=b.length;c.push("[");for(var d="",f=0;f<e;f++)c.push(d),Ca(a,b[f],c),d=",";c.push("]");break}c.push("{");e="";for(d in b)b.hasOwnProperty(d)&&(f=b[d],"function"!=typeof f&&(c.push(e),Ba(d,c),c.push(":"),Ca(a,f,c),e=
","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}},Da={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Ea=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g,Ba=function(a,b){b.push('"');b.push(a.replace(Ea,function(a){if(a in Da)return Da[a];var b=a.charCodeAt(0),d="\\u";16>b?d+="000":256>b?d+="00":4096>b&&(d+="0");return Da[a]=d+b.toString(16)}));b.push('"')};var K="google_ad_block google_ad_channel google_ad_client google_ad_format google_ad_height google_ad_host google_ad_host_channel google_ad_host_tier_id google_ad_output google_ad_override google_ad_region google_ad_section google_ad_slot google_ad_type google_ad_width google_adtest google_allow_expandable_ads google_alternate_ad_url google_alternate_color google_analytics_domain_name google_analytics_uacct google_bid google_city google_color_bg google_color_border google_color_line google_color_link google_color_text google_color_url google_container_id google_contents google_country google_cpm google_ctr_threshold google_cust_age google_cust_ch google_cust_gender google_cust_id google_cust_interests google_cust_job google_cust_l google_cust_lh google_cust_u_url google_disable_video_autoplay google_ed google_eids google_enable_ose google_encoding google_font_face google_font_size google_frame_id google_gl google_hints google_image_size google_kw google_kw_type google_language google_loeid google_max_num_ads google_max_radlink_len google_mtl google_num_radlinks google_num_radlinks_per_unit google_num_slots_to_rotate google_only_ads_with_video google_only_pyv_ads google_only_userchoice_ads google_override_format google_page_url google_previous_watch google_previous_searches google_referrer_url google_region google_reuse_colors google_rl_dest_url google_rl_filtering google_rl_mode google_rt google_safe google_scs google_skip google_tag_info google_targeting google_tdsma google_tfs google_tl google_ui_features google_ui_version google_video_doc_id google_video_product_type google_with_pyv_ads google_yt_pt google_yt_up".split(" ");var L=function(a){this.a=a;a.google_iframe_oncopy||(a.google_iframe_oncopy={handlers:{},log:[],shouldLog:0.01>Math.random()?g:i});this.e=a.google_iframe_oncopy;a.setTimeout(j(this.l,this),3E4)},Fa;var M="var i=this.id,s=window.google_iframe_oncopy,H=s&&s.handlers,h=H&&H[i],w=this.contentWindow,d;try{d=w.document}catch(e){}if(h&&d&&(!d.body||!d.body.firstChild)){if(h.call){i+='.call';setTimeout(h,0)}else if(h.match){i+='.nav';w.location.replace(h)}s.log&&s.log.push(i)}";
/[&<>\"]/.test(M)&&(-1!=M.indexOf("&")&&(M=M.replace(ca,"&amp;")),-1!=M.indexOf("<")&&(M=M.replace(da,"&lt;")),-1!=M.indexOf(">")&&(M=M.replace(ea,"&gt;")),-1!=M.indexOf('"')&&(M=M.replace(ga,"&quot;")));Fa=M;L.prototype.set=function(a,b){this.e.handlers[a]=b;this.a.addEventListener&&this.a.addEventListener("load",j(this.k,this,a),i)};L.prototype.k=function(a){var a=this.a.document.getElementById(a),b=a.contentWindow.document;if(a.onload&&b&&(!b.body||!b.body.firstChild))a.onload()};
L.prototype.l=function(){if(this.e.shouldLog){var a=this.e.log,b=this.a.document;if(a.length){b=["/pagead/gen_204?id=iframecopy&log=",B(a.join("-")),"&url=",B(b.URL.substring(0,512)),"&ref=",B(b.referrer.substring(0,512))].join("");a.length=0;a=this.a;b=za(ka(""),b);a.google_image_requests||(a.google_image_requests=[]);var c=a.document.createElement("img");c.src=b;a.google_image_requests.push(c)}}};var Ga=function(){var a="script";return["<",a,' src="',za(z(),"/pagead/js/r20121010/r20120730/show_ads_impl.js",""),'"></',a,">"].join("")},Ha=function(){var a="script";return["<",a,' src="',za(z(),"/pagead/expansion_embed.js"),'"></',a,">"].join("")},Ia=function(a){var b;if(!(b="expt"!=a.google_expand_experiment))a:{var c=a.document;try{var e;if(!(e=
a.google_allow_expandable_ads===i)){var d;if(!(d=!c.body)){var f;if(!(f=a.google_ad_output&&"html"!=a.google_ad_output)){var l;if(!(l=isNaN(a.google_ad_height))){var s;if(!(s=isNaN(a.google_ad_width))){var v;if(!(v=c.domain!=a.location.hostname)){var t;b:{var a=navigator,n=a.userAgent,E=a.platform;if(/Win|Mac|Linux/.test(E)&&!/^Opera/.test(n)){var R=(/WebKit\/(\d+)/.exec(n)||[0,0])[1],fa=(/rv\:(\d+\.\d+)/.exec(n)||[0,0])[1];if(/Win/.test(E)&&/MSIE.*Trident/.test(n)&&7<c.documentMode||!R&&"Gecko"==
a.product&&1.7<fa&&!/rv\:1\.8([^.]|\.0)/.test(n)||524<R){t=g;break b}}t=i}v=!t}s=v}l=s}f=l}d=f}e=d}if(e){b=g;break a}}catch(S){b=g;break a}b=i}return b?i:g},Ja=function(a,b,c,e){return function(){var d=i;e&&sa().al(3E4);try{if(C(a.document.getElementById(b).contentWindow)){var f=a.document.getElementById(b).contentWindow,l=f.document;if(!l.body||!l.body.firstChild)l.open(),f.google_async_iframe_close=g,l.write(c)}else{var s=a.document.getElementById(b).contentWindow,v;f=c;f=String(f);if(f.quote)v=
f.quote();else{for(var l=['"'],t=0;t<f.length;t++){var n=f.charAt(t),E=n.charCodeAt(0),R=l,fa=t+1,S;if(!(S=m[n])){var F;if(31<E&&127>E)F=n;else{var q=n;if(q in r)F=r[q];else if(q in m)F=r[q]=m[q];else{var p=q,w=q.charCodeAt(0);if(31<w&&127>w)p=q;else{if(256>w){if(p="\\x",16>w||256<w)p+="0"}else p="\\u",4096>w&&(p+="0");p+=w.toString(16).toUpperCase()}F=r[q]=p}}S=F}R[fa]=S}l.push('"');v=l.join("")}s.location.replace("javascript:"+v)}d=g}catch(wb){s=na().google_jobrunner,ra(s)&&s.rl()}d&&(new L(a)).set(b,
Ja(a,b,c,i))}},Ka=Math.floor(1E6*Math.random()),La=function(a){for(var a=a.data.split("\n"),b={},c=0;c<a.length;c++){var e=a[c].indexOf("=");-1!=e&&(b[a[c].substr(0,e)]=a[c].substr(e+1))}b[1]==Ka&&(window.google_top_url=b[3])};var Ma=ia("0.001"),Na=ia("0.001");window.google_loader_used=g;var N=window;if(!("google_onload_fired"in N)){N.google_onload_fired=i;var Oa=function(){N.google_onload_fired=g};N.addEventListener?N.addEventListener("load",Oa,i):N.attachEvent&&N.attachEvent("onload",Oa)}var Pa=window,Qa=2;try{Pa.top.document==Pa.document?Qa=0:C(Pa.top)&&(Qa=1)}catch(Ra){}
if(2===Qa&&top.postMessage&&!window.google_top_experiment&&(window.google_top_experiment=ma(["jp_e","jp_c"],Na),"jp_e"===window.google_top_experiment)){var O=window;O.addEventListener?O.addEventListener("message",La,i):O.attachEvent&&O.attachEvent("onmessage",La);var Sa={"0":"google_loc_request",1:Ka},Ta=[],Ua;for(Ua in Sa)Ta.push(Ua+"="+Sa[Ua]);top.postMessage(Ta.join("\n"),"*")}window.google_expand_experiment||(window.google_expand_experiment=ma(["expt","control"],Ma)||"none");var Va;
if(window.google_enable_async===i)Va=0;else{var Wa=navigator.userAgent;Va=(va.test(Wa)||wa.test(Wa)?i:g)&&!window.google_container_id&&(!window.google_ad_output||"html"==window.google_ad_output)}
if(Va){var Xa=window;Xa.google_unique_id?++Xa.google_unique_id:Xa.google_unique_id=1;for(var J=window,_script$$inline_82="script",P,I={allowtransparency:'"true"',frameborder:'"0"',height:'"'+J.google_ad_height+'"',hspace:'"0"',marginwidth:'"0"',marginheight:'"0"',onload:'"'+Fa+'"',scrolling:'"no"',vspace:'"0"',width:'"'+J.google_ad_width+'"'},Ya=J.document,Q=I.id,Za=0;!Q||J.document.getElementById(Q);)Q="aswift_"+Za++;I.id=Q;I.name=Q;Ya.write(xa());P=Q;var $a;J.google_page_url&&(J.google_page_url=
String(J.google_page_url));for(var ab=[],bb=0,cb=K.length;bb<cb;bb++){var db=K[bb];if(J[db]!=h){var eb;try{var fb=[];Ca(new Aa,J[db],fb);eb=fb.join("")}catch(gb){}eb&&la(ab,db,"=",eb,";")}}$a=ab.join("");var T=window,hb=T.google_ad_output,U=T.google_ad_format;if(!U&&("html"==hb||hb==h))U=T.google_ad_width+"x"+T.google_ad_height;U=U&&(!T.google_ad_slot||T.google_override_format)?U.toLowerCase():"";T.google_ad_format=U;var ib,jb=[u.google_ad_slot,u.google_ad_format,u.google_ad_type,u.google_ad_width,
u.google_ad_height];if(x){var V;if(x){for(var kb=[],lb=0,W=x;W&&25>lb;W=W.parentNode,++lb)kb.push(9!=W.nodeType&&W.id||"");V=kb.join()}else V="";V&&jb.push(V)}var mb=0;if(jb){var nb=jb.join(":"),ob=nb.length;if(0==ob)mb=0;else{for(var X=305419896,pb=0;pb<ob;pb++)X^=(X<<5)+(X>>2)+nb.charCodeAt(pb)&4294967295;mb=0<X?X:4294967296+X}}ib=mb.toString();a:{var Y=window,Z=Y.google_async_slots;Z||(Z=Y.google_async_slots={});var qb=Y.google_unique_id,$=String("number"==typeof qb?qb:0);if($ in Z&&($+="b",$ in
Z))break a;Z[$]={sent:i,w:Y.google_ad_width||"",h:Y.google_ad_height||"",adk:ib,type:Y.google_ad_type||"",slot:Y.google_ad_slot||"",fmt:Y.google_ad_format||"",cli:Y.google_ad_client||"",saw:[]}}for(var rb=0,sb=K.length;rb<sb;rb++)J[K[rb]]=h;var tb=(new Date).getTime(),ub=J.google_top_experiment,vb=J.google_expand_experiment,xb="";Ia(J)&&(xb=Ha());var yb=["<!doctype html><html><body><",_script$$inline_82,">",$a,"google_show_ads_impl=true;google_unique_id=",J.google_unique_id,';google_async_iframe_id="',
P,'";google_ad_unit_key="',ib,'";google_start_time=',k,";",ub?'google_top_experiment="'+ub+'";':"",vb?'google_expand_experiment="'+vb+'";':"","google_bpp=",tb>k?tb-k:1,";</",_script$$inline_82,">",xb,Ga(),"</body></html>"].join("");(J.document.getElementById(P)?ta:ua)(Ja(J,P,yb,g))}else window.google_start_time=k,!("object"==typeof window.o&&"function"==typeof window.o.createIframe)&&Ia(window)&&document.write(Ha()),document.write(Ga());})();