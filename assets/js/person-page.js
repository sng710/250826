(() => {
  'use strict';

  const STYLE_ID = 'sng-person-page-style';
  const CSS = String.raw`
:root{--bg:#243b63;--bg2:#304a7d;--cyan:#55b8d4;--white:#f8f7f3;--muted:#dce7ea;--card:rgba(36,59,99,.76);--line:rgba(85,184,212,.32);--serif:"Frank Ruhl Libre","Noto Serif Hebrew","David Libre",Georgia,serif;--sans:"Rubik","Heebo","Assistant",Arial,sans-serif}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;min-height:100vh;font-family:var(--sans);color:var(--white);line-height:1.65;background:linear-gradient(90deg,rgba(35,57,96,.92),rgba(48,74,125,.97)),var(--leaf-bg) 18% top/cover fixed no-repeat}button,input,a{font:inherit}img{max-width:100%}a{color:inherit}.skip-link{position:fixed;top:8px;right:8px;z-index:10000;transform:translateY(-160%);padding:10px 14px;border-radius:8px;background:#fff;color:#132d49;text-decoration:none}.skip-link:focus{transform:none}:where(a,button,[role="button"],[tabindex]):focus-visible{outline:3px solid #9bd5ff;outline-offset:4px}.council-corner{position:fixed;top:10px;left:10px;z-index:45;width:58px;height:58px;padding:7px;border:1px solid rgba(85,184,212,.34);border-radius:15px;background:rgba(20,38,65,.42);backdrop-filter:blur(6px);pointer-events:none}.council-corner img{display:block;width:100%;height:100%;object-fit:contain}.person-topbar{position:sticky;top:0;z-index:30;padding:12px 24px;background:rgba(31,51,86,.95);border-bottom:1px solid rgba(85,184,212,.38);backdrop-filter:blur(10px)}.person-topbar-inner{max-width:1180px;margin:auto;display:flex;align-items:center;justify-content:space-between;gap:18px}.person-topbar a{text-decoration:none}.person-brand{font-family:var(--serif);font-size:1.14rem}.back-link{display:inline-flex;align-items:center;min-height:44px;border-bottom:1px solid rgba(85,184,212,.55)}.person-main{width:min(1180px,calc(100% - 32px));margin:auto;padding:30px 0 72px}.person-intro{display:grid;grid-template-columns:190px minmax(0,1fr);gap:36px;align-items:center;padding:32px 36px 34px;border:1px solid rgba(248,247,243,.2);border-top-color:rgba(85,184,212,.72);border-radius:10px;background:linear-gradient(135deg,rgba(47,73,123,.78),rgba(35,58,99,.80));backdrop-filter:blur(3px)}.person-portrait{width:184px;height:184px;margin:0;padding:6px;border:2px solid rgba(248,247,243,.82);border-radius:50%;overflow:hidden;background:transparent}.person-portrait img,.portrait-placeholder{display:block;width:100%;height:100%;border-radius:50%;object-fit:var(--fit,cover);object-position:var(--pos,50% 38%);transform:scale(var(--scale,1))}.portrait-placeholder{display:grid;place-items:center;background:#c9d0d1;color:#17324a;text-align:center;padding:14px}.person-head{min-width:0}.place{margin:0 0 5px;color:#d8e6ea;font-size:1.04rem;font-weight:700}.person-head h1{margin:0 0 10px;font-family:var(--serif);font-size:clamp(2.7rem,4.6vw,4.15rem);font-weight:400;line-height:1.02;letter-spacing:-.018em}.service-line{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:0 0 7px;color:#f5f7f7;font-size:1.09rem;font-weight:700}.service-line .dot{opacity:.55}.role{max-width:70ch;margin:7px 0 0;color:#e2eaec;font-size:1.14rem;line-height:1.72}.facts-panel{margin-top:22px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 28px}.fact{min-height:47px;display:flex;align-items:center;padding:9px 0;border-top:1px solid var(--line);color:#edf2f2;font-size:1.07rem;line-height:1.6}.media-section,.story-section,.links-section{margin-top:24px;padding:clamp(28px,4vw,42px) clamp(20px,5vw,54px);border:1px solid rgba(248,247,243,.17);border-top-color:rgba(85,184,212,.52);border-radius:9px;background:var(--card);backdrop-filter:blur(3px)}.media-section h2,.story-section>h2,.links-section h2{margin:0 0 1.45rem;font-family:var(--serif);font-weight:400;font-size:clamp(1.9rem,1.72rem + .7vw,2.35rem);line-height:1.2}.story-section>h2::after{content:"";display:block;width:72px;height:2px;margin-top:.9rem;border-radius:999px;background:rgba(85,184,212,.78)}.media-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:16px}.media-image-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),300px));gap:16px;margin-top:18px}.media-image-link{display:grid;gap:9px;justify-items:center;width:100%;padding:10px;border:1px solid rgba(248,247,243,.24);border-radius:13px;background:rgba(16,32,55,.3);color:#fff;text-decoration:none}.media-image-link img{display:block;width:100%;height:auto;max-height:330px;object-fit:contain;border-radius:9px;background:#fff}.media-image-label{font-size:1rem;line-height:1.55;text-align:center}.video-embed{position:relative;width:100%;aspect-ratio:16/9;overflow:hidden;border-radius:9px;background:#101c31;border:1px solid rgba(248,247,243,.18)}.video-embed iframe{position:absolute;inset:0;width:100%;height:100%;border:0}.media-actions,.memorial-links{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px}.media-actions a,.memorial-links a,.family-contact-btn{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:9px 16px;border:1px solid rgba(248,247,243,.48);border-radius:999px;color:#fff;text-decoration:none}.story-copy{max-width:88ch;margin-inline:auto}.story-chapter+.story-chapter{margin-top:clamp(2.8rem,5vw,4.3rem);padding-top:clamp(1.55rem,3vw,2.15rem);border-top:1px solid rgba(85,184,212,.30)}.story-chapter>h3{width:fit-content;max-width:100%;margin:0 0 1.55rem;padding:.28rem .85rem .34rem 0;border-inline-start:3px solid rgba(85,184,212,.82);font-size:clamp(1.56rem,1.35rem + .65vw,1.98rem);font-weight:700;line-height:1.28}.story-chapter.event>h3{border-inline-start-color:rgba(229,169,60,.9)}.story-text{max-width:78ch;margin-inline:auto}.story-text p{margin:0 0 1.2em;color:#f3f5f4;font-size:clamp(1.20rem,1.13rem + .25vw,1.32rem);line-height:1.92;text-wrap:pretty}.story-text p:last-child{margin-bottom:0}.story-media-break{width:fit-content;max-width:min(680px,100%);margin:clamp(1.2rem,2.5vw,1.8rem) 0 clamp(2.3rem,4vw,3.35rem)}.story-media-break.side-right{margin-left:auto;margin-right:0}.story-media-break.side-left{margin-right:auto;margin-left:0}.story-media-break figure{display:inline-flex;width:auto;max-width:100%;margin:0;padding:8px;align-items:center;justify-content:center;border:1px solid rgba(85,184,212,.30);border-radius:16px;background:rgba(23,43,73,.36);box-shadow:0 12px 26px rgba(10,27,48,.14);overflow:hidden}.story-media-break img{display:block;width:auto;height:auto;max-width:100%;max-height:620px;object-fit:contain;border-radius:10px;cursor:zoom-in}.links-section{max-width:88ch;margin-inline:auto;margin-top:24px}.family-contact{max-width:880px;margin:28px auto 0;padding:22px 24px;border:1px solid rgba(85,184,212,.30);border-radius:9px;background:rgba(30,52,89,.62);text-align:center}.family-contact-text{margin:0 0 14px;font-size:1.08rem;line-height:1.78}.page-footer{max-width:820px;margin:36px auto 0;padding-top:22px;border-top:1px solid rgba(85,184,212,.34);font-family:var(--serif);font-size:1.14rem;text-align:center;color:#eef1f0}.image-zoom-target{cursor:zoom-in}.image-viewer{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;padding:clamp(12px,3vw,34px);opacity:0;transition:opacity .16s ease}.image-viewer[hidden]{display:none}.image-viewer.is-open{opacity:1}.image-viewer-backdrop{position:absolute;inset:0;background:rgba(7,17,31,.92);backdrop-filter:blur(7px)}.image-viewer-dialog{position:relative;z-index:1;width:min(1500px,96vw);height:min(900px,92vh);display:grid;grid-template-columns:52px minmax(0,1fr) 52px;align-items:center;gap:12px}.image-viewer-figure{min-width:0;min-height:0;max-height:92vh;margin:0;display:grid;grid-template-rows:minmax(0,1fr) auto;justify-items:center;gap:10px}.image-viewer-image{display:block;max-width:100%;max-height:84vh;width:auto;height:auto;object-fit:contain;border-radius:8px;background:#16263e;box-shadow:0 24px 70px rgba(0,0,0,.42)}.image-viewer-caption{max-width:70ch;color:#eef4f6;text-align:center;font-size:.96rem}.image-viewer-close,.image-viewer-nav{appearance:none;border:1px solid rgba(255,255,255,.25);background:rgba(38,63,107,.88);color:#fff;cursor:pointer}.image-viewer-close{position:absolute;top:0;inset-inline-end:0;width:46px;height:46px;border-radius:50%;font-size:1.8rem;z-index:2}.image-viewer-nav{width:48px;height:62px;border-radius:14px;font-size:2rem}.error-card{max-width:760px;margin:80px auto;padding:28px;border:1px solid rgba(255,255,255,.2);border-radius:10px;background:rgba(36,59,99,.76);text-align:center}.error-card a{display:inline-block;margin-top:15px}
@media(max-width:820px){body{background:linear-gradient(rgba(39,62,104,.94),rgba(48,74,125,.98)),var(--leaf-bg) 25% top/auto 820px no-repeat}.person-topbar{position:static}.person-main{width:min(100% - 24px,760px);padding:22px 0 52px}.person-intro{grid-template-columns:1fr;gap:20px;padding:26px 20px 28px;text-align:center}.person-portrait{width:min(190px,62vw);height:min(190px,62vw);margin:auto}.person-head h1{font-size:clamp(2.55rem,11vw,3.7rem)}.service-line{justify-content:center}.role{margin-inline:auto}.facts-panel{grid-template-columns:1fr;text-align:right}.story-copy,.story-text{max-width:100%}.story-media-break,.story-media-break.side-left,.story-media-break.side-right{margin-inline:auto}.story-media-break img{max-height:560px}.council-corner{width:48px;height:48px}.image-viewer-dialog{grid-template-columns:42px minmax(0,1fr) 42px;gap:6px}.image-viewer-nav{width:40px;height:54px}}
@media(max-width:560px){.person-topbar{padding-inline:14px}.person-topbar-inner{gap:10px}.person-brand{font-size:1rem}.back-link{font-size:.86rem}.media-section,.story-section,.links-section{padding:26px 18px 32px}.story-section>h2{font-size:1.9rem}.story-chapter>h3{font-size:1.5rem}.story-text p{font-size:1.12rem;line-height:1.88}.story-media-break img{max-height:500px}.family-contact{padding:20px 16px}.image-viewer{padding:8px}.image-viewer-dialog{width:98vw;grid-template-columns:1fr;height:94vh}.image-viewer-nav{position:absolute;bottom:10px;z-index:3}.image-viewer-prev{right:10px}.image-viewer-next{left:10px}.image-viewer-close{top:8px;left:8px;right:auto}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}

/* PATCH 62 - quiet visual polish + mobile-first person pages */
body{
  background:
    radial-gradient(circle at 82% 4%,rgba(85,184,212,.08),transparent 28rem),
    linear-gradient(90deg,rgba(35,57,96,.94),rgba(48,74,125,.98));
}
.person-topbar{
  padding:10px 22px;
  box-shadow:0 6px 22px rgba(10,26,47,.10);
}
.person-topbar-inner{max-width:1160px;}
.person-brand{font-size:1.16rem;}
.back-link{font-size:.98rem;}
.council-corner{
  top:68px;
  left:14px;
  width:52px;
  height:52px;
  padding:6px;
  border-radius:14px;
  background:rgba(20,38,65,.30);
}
.person-main{
  width:min(1160px,calc(100% - 32px));
  padding:28px 0 68px;
}
.person-intro{
  grid-template-columns:200px minmax(0,1fr);
  gap:38px;
  padding:34px 38px;
  border-radius:16px;
  background:linear-gradient(135deg,rgba(48,74,125,.72),rgba(35,58,99,.76));
  box-shadow:0 18px 46px rgba(10,27,48,.10);
}
.person-portrait{
  width:194px;
  height:194px;
  padding:6px;
  box-shadow:0 14px 34px rgba(12,29,51,.14);
}
.person-head h1{
  font-size:clamp(2.8rem,4.5vw,4.1rem);
  line-height:1.04;
}
.place{font-size:1.06rem;}
.role{font-size:1.16rem;line-height:1.72;}
.facts-panel{margin-top:24px;gap:0 32px;}
.fact{min-height:50px;font-size:1.08rem;line-height:1.58;}

.media-section,.story-section,.links-section{
  margin-top:22px;
  border-radius:16px;
  background:rgba(36,59,99,.68);
  box-shadow:0 18px 46px rgba(10,27,48,.08);
}
.media-section,.links-section{
  padding:clamp(26px,3.6vw,38px) clamp(20px,4.5vw,46px);
}
.story-section{
  padding:clamp(34px,4.2vw,50px) clamp(22px,5vw,58px) clamp(40px,4.5vw,54px);
}
.media-section h2,.story-section>h2,.links-section h2{
  margin-bottom:1.25rem;
  font-size:clamp(1.92rem,1.72rem + .65vw,2.3rem);
}
.story-section>h2::after{width:62px;}
.story-copy{max-width:82ch;}
.story-text{max-width:74ch;}
.story-text p{
  font-size:clamp(1.21rem,1.15rem + .23vw,1.32rem);
  line-height:1.96;
  margin-bottom:1.22em;
}
.story-chapter+.story-chapter{
  margin-top:clamp(2.65rem,4.5vw,3.9rem);
  padding-top:clamp(1.5rem,2.7vw,2rem);
}
.story-chapter>h3{
  margin-bottom:1.45rem;
  padding:.25rem .82rem .3rem 0;
  font-size:clamp(1.55rem,1.38rem + .55vw,1.9rem);
}

/* Story photographs become consistent editorial pauses.  Natural image
   orientation selects the appropriate maximum width in JS below. */
.story-media-break,
.story-media-break.side-left,
.story-media-break.side-right{
  width:100%;
  max-width:560px;
  margin:clamp(1.65rem,3vw,2.25rem) auto clamp(2.5rem,4.5vw,3.4rem);
}
.story-media-break.media-landscape{max-width:700px;}
.story-media-break.media-square{max-width:520px;}
.story-media-break.media-portrait{max-width:420px;}
.story-media-break figure{
  display:flex;
  width:100%;
  max-width:100%;
  padding:7px;
  border-radius:15px;
  background:rgba(19,39,67,.28);
  border-color:rgba(151,205,221,.30);
  box-shadow:0 16px 38px rgba(10,27,48,.13);
}
.story-media-break img{
  display:block;
  width:100%;
  height:auto;
  max-height:650px;
  object-fit:contain;
  border-radius:10px;
}

.media-grid{gap:14px;}
.media-grid:has(> :only-child){
  max-width:860px;
  margin-inline:auto;
}
.video-embed{
  border-radius:14px;
  box-shadow:0 12px 30px rgba(10,27,48,.12);
}
.media-image-grid{
  justify-content:center;
}
.media-image-link{
  border-radius:14px;
  background:rgba(15,31,54,.24);
}
.media-image-link img{border-radius:10px;}
.media-actions a,.memorial-links a,.family-contact-btn{
  min-height:46px;
  padding:10px 17px;
  transition:background .17s ease,border-color .17s ease,transform .17s ease;
}
.media-actions a:hover,.memorial-links a:hover,.family-contact-btn:hover,
.media-actions a:focus-visible,.memorial-links a:focus-visible,.family-contact-btn:focus-visible{
  background:rgba(255,255,255,.07);
  border-color:rgba(248,247,243,.76);
}
.family-contact{
  max-width:820px;
  margin-top:26px;
  padding:22px 24px;
  border-radius:14px;
  background:rgba(30,52,89,.52);
}
.family-contact-text{font-size:1.1rem;}
.page-footer{margin-top:34px;}

@media(max-width:820px){
  body{
    background:
      radial-gradient(circle at 80% 0,rgba(85,184,212,.07),transparent 22rem),
      linear-gradient(rgba(39,62,104,.97),rgba(48,74,125,.99));
    background-attachment:scroll;
  }
  .person-topbar{
    position:sticky;
    top:0;
    padding:8px 12px;
  }
  .person-topbar-inner{gap:12px;}
  .person-brand{font-size:1rem;}
  .back-link{font-size:.88rem;min-height:40px;}
  .council-corner{
    top:62px;
    left:10px;
    width:44px;
    height:44px;
    border-radius:12px;
    opacity:.9;
  }
  .person-main{
    width:min(100% - 20px,740px);
    padding:16px 0 46px;
  }
  .person-intro{
    gap:17px;
    padding:24px 17px 26px;
    border-radius:14px;
  }
  .person-portrait{
    width:min(166px,49vw);
    height:min(166px,49vw);
  }
  .person-head h1{
    font-size:clamp(2.35rem,10.7vw,3.35rem);
    line-height:1.04;
  }
  .place{font-size:1rem;}
  .service-line{font-size:1.02rem;}
  .role{font-size:1.08rem;line-height:1.68;}
  .facts-panel{margin-top:18px;}
  .fact{min-height:44px;padding:8px 0;font-size:1.02rem;}

  .media-section,.story-section,.links-section{
    margin-top:16px;
    border-radius:14px;
  }
  .media-section,.links-section{
    padding:22px 15px 26px;
  }
  .story-section{
    padding:26px 16px 32px;
  }
  .media-section h2,.story-section>h2,.links-section h2{
    font-size:1.85rem;
    margin-bottom:1.15rem;
  }
  .story-text p{
    font-size:1.14rem;
    line-height:1.9;
    margin-bottom:1.16em;
  }
  .story-chapter+.story-chapter{
    margin-top:2.5rem;
    padding-top:1.45rem;
  }
  .story-chapter>h3{
    font-size:1.43rem;
    margin-bottom:1.18rem;
  }
  .story-media-break,
  .story-media-break.side-left,
  .story-media-break.side-right,
  .story-media-break.media-landscape,
  .story-media-break.media-square{
    max-width:100%;
    margin:1.45rem auto 2.5rem;
  }
  .story-media-break.media-portrait{
    max-width:min(92%,420px);
  }
  .story-media-break figure{padding:5px;border-radius:13px;}
  .story-media-break img{max-height:none;border-radius:9px;}
  .media-grid{grid-template-columns:1fr;gap:12px;}
  .media-image-grid{
    grid-template-columns:minmax(0,280px);
    justify-content:center;
  }
  .media-actions,.memorial-links{
    display:grid;
    grid-template-columns:1fr;
    gap:8px;
  }
  .media-actions a,.memorial-links a,.family-contact-btn{
    width:100%;
    min-height:48px;
  }
  .family-contact{
    margin-top:18px;
    padding:20px 15px;
    border-radius:13px;
  }
  .family-contact-text{font-size:1.04rem;line-height:1.72;}
  .page-footer{margin-top:28px;padding-top:18px;}
}

@media(max-width:420px){
  .person-main{width:calc(100% - 16px);}
  .person-intro{padding-inline:14px;}
  .person-head h1{font-size:2.32rem;}
  .story-text p{font-size:1.11rem;line-height:1.88;}
  .media-section,.story-section,.links-section{padding-inline:14px;}
  .council-corner{width:40px;height:40px;}
}


/* PATCH 63 - CLEARER EDITORIAL STORY DESIGN */
.person-main{width:min(1120px,calc(100% - 34px));}
.person-intro{
  border-color:rgba(213,235,242,.17);
  border-top-color:rgba(85,184,212,.62);
  box-shadow:0 18px 48px rgba(8,25,46,.13);
}

.story-section{
  margin-top:26px;
  padding:clamp(38px,4.6vw,54px) clamp(24px,5.4vw,62px) clamp(44px,5vw,60px);
  border:0;
  border-top:1px solid rgba(85,184,212,.46);
  border-radius:20px;
  background:linear-gradient(180deg,rgba(32,55,94,.64),rgba(31,53,90,.50));
  box-shadow:0 18px 52px rgba(8,25,46,.10);
}
.story-section>h2{
  margin-bottom:2rem;
  font-size:clamp(2.05rem,1.84rem + .8vw,2.55rem);
}
.story-section>h2::after{
  width:82px;
  height:2px;
  margin-top:.85rem;
}
.story-copy{max-width:84ch;}
.story-text{
  max-width:70ch;
  margin-inline:auto;
}
.story-text p{
  margin-bottom:1.34em;
  font-size:clamp(1.25rem,1.18rem + .26vw,1.38rem);
  line-height:1.9;
}

/* Chapter transitions: no floating/pill heading, one clean editorial rule. */
.story-chapter+.story-chapter{
  margin-top:clamp(3.2rem,5vw,4.5rem);
  padding-top:0;
  border-top:0;
}
.story-chapter>h3{
  display:flex;
  align-items:center;
  gap:15px;
  width:100%;
  margin:0 0 1.8rem;
  padding:0;
  border:0;
  color:#f8f7f3;
  font-size:clamp(1.58rem,1.38rem + .72vw,2rem);
  font-weight:700;
  line-height:1.3;
}
.story-chapter>h3::after{
  content:"";
  flex:1 1 auto;
  height:1px;
  background:linear-gradient(90deg,rgba(85,184,212,.08),rgba(85,184,212,.55));
}
.story-chapter.event>h3{
  color:#fffaf0;
}
.story-chapter.event>h3::before{
  content:"";
  flex:0 0 8px;
  width:8px;
  height:8px;
  border-radius:50%;
  background:#e5a93c;
  box-shadow:0 0 0 4px rgba(229,169,60,.10);
}
.story-chapter.legacy>h3::before{
  content:"";
  flex:0 0 8px;
  width:8px;
  height:8px;
  border-radius:50%;
  background:#55b8d4;
  box-shadow:0 0 0 4px rgba(85,184,212,.10);
}

/* Photos are deliberate full editorial pauses, never awkward side floats. */
.story-media-break,
.story-media-break.side-left,
.story-media-break.side-right{
  width:100%;
  max-width:600px;
  margin:clamp(2rem,3.5vw,2.7rem) auto clamp(2.8rem,4.8vw,3.8rem);
}
.story-media-break.media-landscape{max-width:760px;}
.story-media-break.media-square{max-width:560px;}
.story-media-break.media-portrait{max-width:420px;}
.story-media-break figure{
  display:block;
  width:100%;
  padding:0;
  border:0;
  border-radius:16px;
  background:transparent;
  box-shadow:0 18px 44px rgba(5,20,39,.20);
  overflow:hidden;
}
.story-media-break img{
  display:block;
  width:100%;
  height:auto;
  max-height:680px;
  object-fit:contain;
  border-radius:16px;
  background:rgba(15,31,54,.28);
}

.media-section,.links-section{
  border-radius:18px;
  border-color:rgba(213,235,242,.16);
}
.family-contact{
  border-radius:16px;
  border-color:rgba(151,205,221,.28);
}

@media(max-width:820px){
  .person-main{width:min(100% - 18px,740px);}
  .person-intro{padding:24px 17px 27px;}
  .story-section{
    margin-top:17px;
    padding:30px 17px 38px;
    border-radius:16px;
  }
  .story-section>h2{
    margin-bottom:1.6rem;
    font-size:2rem;
  }
  .story-text p{
    font-size:1.17rem;
    line-height:1.88;
    margin-bottom:1.3em;
  }
  .story-chapter+.story-chapter{
    margin-top:2.9rem;
  }
  .story-chapter>h3{
    gap:11px;
    margin-bottom:1.45rem;
    font-size:1.5rem;
  }
  .story-media-break,
  .story-media-break.side-left,
  .story-media-break.side-right,
  .story-media-break.media-landscape,
  .story-media-break.media-square{
    width:100%;
    max-width:100%;
    margin:1.8rem auto 2.8rem;
  }
  .story-media-break.media-portrait{
    max-width:min(88%,420px);
  }
  .story-media-break figure,
  .story-media-break img{border-radius:13px;}
}

@media(max-width:440px){
  .person-main{width:calc(100% - 12px);}
  .person-intro{padding-inline:14px;}
  .story-section{padding:27px 14px 34px;}
  .story-text p{font-size:1.14rem;line-height:1.86;}
  .story-chapter>h3{font-size:1.42rem;}
}

`;

  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const people = Array.isArray(window.MEMORIAL_PEOPLE) ? window.MEMORIAL_PEOPLE : [];
  const id = document.body?.dataset?.personId || '';
  const person = people.find((item) => item.id === id);
  const root = document.getElementById('personApp');
  const siteRoot = new URL('../../', location.href);
  const assetRoot = new URL('assets/', siteRoot);
  const assetUrl = (path) => {
    const clean = String(path || '').replace(/^\.\.\/\.\.\//, '').replace(/^\//, '');
    if (/^https?:\/\//i.test(clean)) return clean;
    if (clean.startsWith('assets/')) return new URL(clean, siteRoot).href;
    return new URL(clean, assetRoot).href;
  };
  document.documentElement.style.setProperty('--leaf-bg', `url("${assetUrl('img/leaf-bg.webp')}")`);

  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  if (!root || !person) {
    if (root) root.innerHTML = `<main class="error-card"><h1>העמוד לא נמצא</h1><p>לא ניתן לטעון את דף ההנצחה המבוקש.</p><a href="${esc(new URL('index.html', siteRoot).href)}">חזרה לרשימת ההנצחה</a></main>`;
    return;
  }

  document.title = `${person.name || ''} | רקמה אנושית אחת`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta && person.summary) meta.setAttribute('content', person.summary);

  const portrait = person.image
    ? `<img data-viewer-image alt="${esc(person.portraitAlt || person.name || '')}" decoding="async" fetchpriority="high" loading="eager" src="${esc(assetUrl(person.image))}" style="--fit:${esc(person.portrait?.fit || 'cover')};--pos:${esc(person.portrait?.position || '50% 38%')};--scale:${esc(person.portrait?.scale || 1)}">`
    : `<span class="portrait-placeholder" role="img" aria-label="נר זיכרון לזכר ${esc(person.name || '')}">נר זיכרון</span>`;

  const service = person.serviceRecord || {};
  const serviceParts = [service.rank, service.unit].filter(Boolean);
  const serviceHtml = serviceParts.length ? `<div class="service-line">${serviceParts.map((x) => `<span>${esc(x)}</span>`).join('<span class="dot" aria-hidden="true">•</span>')}</div>` : '';
  const facts = (person.generalDetails || []).filter(Boolean).map((x) => `<div class="fact">${esc(x)}</div>`).join('');

  const renderTopMedia = () => (person.topMedia || []).map((group, groupIndex) => {
    const vids = (group.videos || []).map((video, i) => `<div class="video-embed"><iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin" src="${esc(video.src)}" title="${esc(video.title && video.title !== 'YouTube video player' ? video.title : `${group.heading || 'סרטון הנצחה'} — ${person.name || ''}${(group.videos || []).length > 1 ? ` ${i + 1}` : ''}`)}"></iframe></div>`).join('');
    const images = (group.images || []).map((image) => {
      const body = `<img alt="${esc(image.alt || '')}" decoding="async" loading="lazy" src="${esc(assetUrl(image.src))}">${image.label ? `<span class="media-image-label">${esc(image.label)}</span>` : ''}`;
      return image.href ? `<a class="media-image-link" href="${esc(image.href)}" rel="noopener noreferrer" target="_blank">${body}</a>` : `<div class="media-image-link">${body}</div>`;
    }).join('');
    const links = (group.links || []).map((link) => `<a href="${esc(link.href)}" rel="noopener noreferrer" target="_blank">${esc(link.label)}</a>`).join('');
    return `<section class="media-section" aria-labelledby="mediaHeading${groupIndex}"><h2 id="mediaHeading${groupIndex}">${esc(group.heading || 'סרטון לזכרו')}</h2>${vids ? `<div class="media-grid">${vids}</div>` : ''}${images ? `<div class="media-image-grid">${images}</div>` : ''}${links ? `<div class="media-actions">${links}</div>` : ''}</section>`;
  }).join('');

  const mediaBySection = new Map();
  (person.storyMedia || []).forEach((item) => {
    if (!mediaBySection.has(item.section)) mediaBySection.set(item.section, new Map());
    const sectionMap = mediaBySection.get(item.section);
    const key = Number(item.afterParagraph || 0);
    if (!sectionMap.has(key)) sectionMap.set(key, []);
    sectionMap.get(key).push(item);
  });

  const renderParagraphs = (paragraphs, sectionKey) => {
    const sectionMedia = mediaBySection.get(sectionKey) || new Map();
    let html = '<div class="story-text">';
    (paragraphs || []).forEach((paragraph, index) => {
      html += `<p>${esc(paragraph)}</p>`;
      const mediaItems = sectionMedia.get(index + 1) || [];
      mediaItems.forEach((item) => {
        html += `</div><div class="story-media-break side-${item.side === 'left' ? 'left' : 'right'}"><figure data-viewer-figure tabindex="0" role="button" aria-label="${esc((item.alt || 'תמונה') + ' - פתיחה בגודל מלא')}"><img data-viewer-image alt="${esc(item.alt || '')}" decoding="async" loading="lazy" src="${esc(assetUrl(item.src))}"></figure></div><div class="story-text">`;
      });
    });
    html += '</div>';
    return html;
  };

  const story = person.story || null;
  let storyHtml = '';
  if (story && ((story.personal || []).length || (story.event || []).length || (story.legacy || []).length)) {
    let chapters = '';
    if ((story.personal || []).length) chapters += `<div class="story-chapter personal">${renderParagraphs(story.personal, 'personal')}</div>`;
    if ((story.event || []).length) {
      const eventHeading = person.isPreviousYears ? 'יום הנפילה והנסיבות' : (story.eventHeading || 'שבת ה7.10.2023');
      chapters += `<section class="story-chapter event" aria-labelledby="eventHeading"><h3 id="eventHeading">${esc(eventHeading)}</h3>${renderParagraphs(story.event, 'event')}</section>`;
    }
    if ((story.legacy || []).length) chapters += `<section class="story-chapter legacy" aria-labelledby="legacyHeading"><h3 id="legacyHeading">${esc(story.legacyHeading || 'זיכרון, מורשת והנצחה')}</h3>${renderParagraphs(story.legacy, 'legacy')}</section>`;
    storyHtml = `<article class="story-section" aria-labelledby="lifeStoryHeading"><h2 id="lifeStoryHeading">סיפור חיים</h2><div class="story-copy">${chapters}</div></article>`;
  }

  const pageLinks = (person.pageLinks || []).length ? `<section class="links-section" aria-labelledby="pageLinksHeading"><h2 id="pageLinksHeading">קישורים</h2><div class="memorial-links">${person.pageLinks.map((link) => `<a href="${esc(link.href)}" rel="noopener noreferrer" target="_blank">${esc(link.label)}</a>`).join('')}</div></section>` : '';

  const family = person.familyContact ? `<section class="family-contact" aria-label="עדכון פרטי ההנצחה"><p class="family-contact-text">${esc(person.familyContact.text || '')}</p><a class="family-contact-btn" href="${esc(person.familyContact.href || '#')}" rel="noopener noreferrer" target="_blank"${person.familyContact.ariaLabel ? ` aria-label="${esc(person.familyContact.ariaLabel)}"` : ''}>${esc(person.familyContact.label || 'ליצירת קשר ב-WhatsApp')}</a></section>` : '';

  root.innerHTML = `
<a class="skip-link" href="#mainContent">דילוג לתוכן הראשי</a>
<div class="council-corner" aria-hidden="true"><img alt="" src="${esc(assetUrl('favicon-sng.svg'))}"></div>
<header class="person-topbar"><div class="person-topbar-inner"><a class="person-brand" href="${esc(new URL('index.html', siteRoot).href)}">רקמה אנושית אחת</a><a class="back-link" href="${esc(new URL('index.html', siteRoot).href)}">← חזרה לרשימת ההנצחה</a></div></header>
<main class="person-main" id="mainContent">
  <section class="person-intro" aria-labelledby="personName"><figure class="person-portrait">${portrait}</figure><div class="person-head"><p class="place">${esc(person.place || '')}</p><h1 id="personName">${esc(person.name || '')}</h1>${serviceHtml}${person.role ? `<p class="role">${esc(person.role)}</p>` : ''}${facts ? `<div class="facts-panel">${facts}</div>` : ''}</div></section>
  ${renderTopMedia()}
  ${storyHtml}
  ${pageLinks}
  ${family}
  <p class="page-footer">${esc(person.footerText || (person.gender === 'female' ? 'יהי זכרה ברוך' : 'יהי זכרו ברוך'))}</p>
</main>`;

  const classifyStoryMedia = () => {
    document.querySelectorAll('.story-media-break').forEach((block) => {
      const img = block.querySelector('img');
      if (!img) return;
      const apply = () => {
        const w = img.naturalWidth || 0;
        const h = img.naturalHeight || 0;
        if (!w || !h) return;
        block.classList.remove('media-landscape', 'media-portrait', 'media-square');
        const ratio = w / h;
        block.classList.add(ratio > 1.18 ? 'media-landscape' : ratio < .84 ? 'media-portrait' : 'media-square');
      };
      if (img.complete) apply();
      else img.addEventListener('load', apply, {once:true});
    });
  };
  classifyStoryMedia();

  const viewerImages = () => [...document.querySelectorAll('[data-viewer-image]')];
  const figures = [...document.querySelectorAll('[data-viewer-figure]')];
  const portraitFigure = document.querySelector('.person-portrait');
  if (portraitFigure?.querySelector('[data-viewer-image]')) {
    portraitFigure.setAttribute('tabindex', '0');
    portraitFigure.setAttribute('role', 'button');
    portraitFigure.setAttribute('aria-label', `${person.portraitAlt || person.name || 'תמונה'} - פתיחה בגודל מלא`);
    portraitFigure.classList.add('image-zoom-target');
  }
  figures.forEach((figure) => figure.classList.add('image-zoom-target'));

  const overlay = document.createElement('div');
  overlay.className = 'image-viewer';
  overlay.hidden = true;
  overlay.inert = true;
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = `<div class="image-viewer-backdrop" data-close="1"></div><div class="image-viewer-dialog" role="dialog" aria-modal="true" aria-label="תצוגת תמונה מלאה"><button class="image-viewer-close" type="button" aria-label="סגירת התמונה">×</button><button class="image-viewer-nav image-viewer-prev" type="button" aria-label="לתמונה הקודמת">‹</button><figure class="image-viewer-figure"><img class="image-viewer-image" alt=""><figcaption class="image-viewer-caption"></figcaption></figure><button class="image-viewer-nav image-viewer-next" type="button" aria-label="לתמונה הבאה">›</button></div>`;
  document.body.appendChild(overlay);
  const fullImg = overlay.querySelector('.image-viewer-image');
  const caption = overlay.querySelector('.image-viewer-caption');
  const closeBtn = overlay.querySelector('.image-viewer-close');
  const prevBtn = overlay.querySelector('.image-viewer-prev');
  const nextBtn = overlay.querySelector('.image-viewer-next');
  let current = 0;
  let lastFocus = null;
  const show = (index) => {
    const imgs = viewerImages();
    if (!imgs.length) return;
    current = (index + imgs.length) % imgs.length;
    const img = imgs[current];
    fullImg.src = img.currentSrc || img.src;
    fullImg.alt = img.alt || 'תמונה';
    caption.textContent = img.alt || '';
    caption.hidden = !caption.textContent;
    prevBtn.hidden = imgs.length < 2;
    nextBtn.hidden = imgs.length < 2;
  };
  const open = (img) => {
    const imgs = viewerImages();
    const index = imgs.indexOf(img);
    if (index < 0) return;
    lastFocus = document.activeElement;
    show(index);
    overlay.hidden = false;
    overlay.inert = false;
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => overlay.classList.add('is-open'));
    closeBtn.focus({preventScroll:true});
  };
  const close = () => {
    overlay.classList.remove('is-open');
    overlay.inert = true;
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => { overlay.hidden = true; }, 160);
    lastFocus?.focus?.({preventScroll:true});
  };
  const bindViewer = (target) => {
    const img = target.querySelector?.('[data-viewer-image]') || (target.matches?.('[data-viewer-image]') ? target : null);
    if (!img) return;
    target.addEventListener('click', () => open(img));
    target.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(img); }
    });
  };
  if (portraitFigure) bindViewer(portraitFigure);
  figures.forEach(bindViewer);
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (event) => { if (event.target?.dataset?.close === '1') close(); });
  prevBtn.addEventListener('click', () => show(current - 1));
  nextBtn.addEventListener('click', () => show(current + 1));
  document.addEventListener('keydown', (event) => {
    if (overlay.hidden) return;
    if (event.key === 'Escape') return close();
    if (event.key === 'ArrowLeft') return show(current + 1);
    if (event.key === 'ArrowRight') return show(current - 1);
    if (event.key === 'Tab') {
      const focusable = [...overlay.querySelectorAll('button:not([hidden])')].filter((el) => !el.disabled);
      if (!focusable.length) return;
      const first = focusable[0], last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
})();
