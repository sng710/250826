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


/* PATCH 68 - unified media stage + compact two-column story */
.unified-media-section{
  --media-stage-height:290px;
  max-width:980px;
  margin-inline:auto;
  padding:22px clamp(18px,3.2vw,34px) 24px;
}
.unified-media-section h2{
  margin:0 0 12px;
  text-align:right;
  font-size:clamp(1.72rem,1.54rem + .42vw,2rem);
  line-height:1.16;
}
.unified-media-section .media-stage{
  --media-card-max-height:calc(var(--media-stage-height) - 28px);
  height:var(--media-stage-height);
  display:grid;
  grid-template-columns:repeat(var(--media-count,1),minmax(0,1fr));
  gap:clamp(10px,1.6vw,18px);
  align-items:center;
  padding:14px;
  border:1px solid rgba(85,184,212,.18);
  border-radius:14px;
  background:rgba(13,29,50,.20);
}
.unified-media-section .media-stage[data-media-count="1"]{--media-count:1;}
.unified-media-section .media-stage[data-media-count="2"]{--media-count:2;}
.unified-media-section .media-stage[data-media-count="3"]{--media-count:3;}
.unified-media-section .media-stage[data-media-count="1"]{
  grid-template-columns:minmax(0,820px);
  max-width:860px;
  margin-inline:auto;
  padding:10px;
}
.unified-media-section .media-stage[data-media-count="1"] .media-stage-item{
  width:100%;
  justify-self:center;
}
.media-stage-item{
  min-width:0;
  min-height:0;
  height:100%;
  display:grid;
  place-items:center;
}
.media-stage-item .video-embed{
  width:min(100%,480px);
  max-width:100%;
  height:min(100%,var(--media-card-max-height));
  aspect-ratio:16/9;
  border-radius:10px;
  box-shadow:0 10px 24px rgba(7,18,34,.18);
}
.media-stage[data-media-count="1"] .media-stage-item .video-embed{
  width:min(100%,820px);
  max-width:100%;
}
.media-stage[data-media-count="1"] .media-stage-item .instagram-embed{
  width:100%;
  max-width:460px;
}
.media-stage[data-media-count="1"] .media-stage-item .media-image-link{
  max-width:320px;
}
.media-stage[data-media-count="3"] .media-stage-item .video-embed{
  max-width:none;
}
.media-stage-item .media-image-link{
  width:100%;
  max-width:240px;
  max-height:100%;
  padding:8px;
  gap:6px;
  border-radius:12px;
}
.media-stage-item .media-image-link img{
  width:100%;
  height:min(205px,calc(var(--media-stage-height) - 58px));
  max-height:none;
  object-fit:contain;
}
.media-stage-item .media-image-label{
  font-size:.88rem;
  line-height:1.35;
}
.unified-media-section .media-actions{
  justify-content:center;
  margin-top:12px;
}

.story-section{
  max-width:1180px;
}
.story-copy{
  max-width:none;
}
.story-main-grid{
  display:grid;
  grid-template-columns:minmax(0,1.12fr) minmax(0,.88fr);
  gap:clamp(26px,4vw,48px);
  align-items:start;
}
.story-main-grid.single-column{
  grid-template-columns:minmax(0,1fr);
}
.story-main-grid .story-chapter{
  min-width:0;
  margin:0;
  padding:0;
  border-top:0;
}
.story-main-grid .story-chapter.event{
  padding-inline-start:clamp(18px,2.4vw,30px);
  border-inline-start:1px solid rgba(85,184,212,.25);
}
.story-main-grid.single-column .story-chapter.event{
  padding-inline-start:0;
  border-inline-start:0;
}
.story-main-grid .story-text{
  max-width:none;
}
.story-main-grid .story-text p{
  font-size:clamp(1.12rem,1.08rem + .16vw,1.22rem);
  line-height:1.84;
}
.story-main-grid .story-chapter.event>h3{
  margin-bottom:1.25rem;
}
.story-chapter.legacy{
  max-width:88ch;
  margin:clamp(2.5rem,4.5vw,3.8rem) auto 0;
  padding-top:clamp(1.6rem,3vw,2.2rem);
  border-top:1px solid rgba(85,184,212,.30);
}

/* All in-story images use the same editorial frame. */
.story-media-break,
.story-media-break.side-left,
.story-media-break.side-right,
.story-media-break.media-landscape,
.story-media-break.media-square,
.story-media-break.media-portrait{
  width:100%;
  max-width:100%;
  margin:1.35rem auto 1.8rem;
}
.story-media-break figure{
  display:flex;
  width:100%;
  height:280px;
  padding:7px;
  align-items:center;
  justify-content:center;
  border-radius:14px;
  background:rgba(18,38,65,.35);
}
.story-media-break img{
  width:100%;
  height:100%;
  max-width:100%;
  max-height:100%;
  object-fit:contain;
  border-radius:9px;
}
.story-chapter.legacy .story-media-break{
  max-width:580px;
}

@media(max-width:900px){
  .story-main-grid{
    grid-template-columns:1fr;
    gap:2.4rem;
  }
  .story-main-grid .story-chapter.event{
    padding-inline-start:0;
    padding-top:1.7rem;
    border-inline-start:0;
    border-top:1px solid rgba(85,184,212,.30);
  }
}

@media(max-width:820px){
  .unified-media-section{
    --media-stage-height:auto;
    padding:18px 14px 20px;
  }
  .unified-media-section h2{
    margin-bottom:10px;
    font-size:1.62rem;
  }
  .unified-media-section .media-stage,
  .unified-media-section .media-stage[data-media-count="1"],
  .unified-media-section .media-stage[data-media-count="2"],
  .unified-media-section .media-stage[data-media-count="3"]{
    --media-card-max-height:none;
    height:auto;
    grid-template-columns:1fr;
    gap:12px;
    padding:10px;
  }
  .media-stage-item{
    height:auto;
  }
  .media-stage-item .video-embed{
    width:min(100%,560px);
    max-width:560px;
  }
  .media-stage-item .media-image-link{
    width:min(100%,300px);
    max-width:300px;
  }
  .media-stage-item .media-image-link img{
    height:auto;
    max-height:260px;
  }
  .story-media-break figure{
    height:clamp(230px,64vw,340px);
  }
}

@media(max-width:520px){
  .story-main-grid .story-text p{
    font-size:1.10rem;
    line-height:1.82;
  }
  .story-media-break figure{
    height:250px;
  }
}

/* PATCH 71 - Instagram Reel media support */
.media-instagram-item{
  grid-template-rows:minmax(0,1fr) auto;
  gap:5px;
}
.instagram-embed{
  width:min(100%,340px);
  height:min(100%,var(--media-card-max-height));
  min-height:0;
  overflow:hidden;
  border:1px solid rgba(248,247,243,.18);
  border-radius:10px;
  background:#fff;
  box-shadow:0 10px 24px rgba(7,18,34,.18);
}
.instagram-embed iframe{
  display:block;
  width:100%;
  height:100%;
  border:0;
  background:#fff;
}
.instagram-open-link{
  color:#dcebf0;
  font-size:.78rem;
  line-height:1.2;
  text-decoration:none;
  border-bottom:1px solid rgba(151,205,221,.45);
}
.instagram-open-link:hover,.instagram-open-link:focus-visible{color:#fff;border-bottom-color:#fff;}

/* PATCH 74 - Facebook Reel media support */
.media-facebook-item{
  grid-template-rows:minmax(0,1fr) auto;
  gap:5px;
}
.facebook-embed{
  display:grid;
  place-items:center;
  width:100%;
  height:min(100%,var(--media-card-max-height));
  min-height:0;
}
.facebook-embed iframe{
  display:block;
  max-width:100%;
  max-height:100%;
  border:0;
  border-radius:10px;
  background:#101c31;
  box-shadow:0 10px 24px rgba(7,18,34,.18);
}
.media-facebook-item.is-landscape .facebook-embed iframe{
  width:100%;
  height:auto;
  aspect-ratio:var(--facebook-ratio,560/314);
}
.media-facebook-item.is-portrait .facebook-embed iframe{
  width:auto;
  height:100%;
  aspect-ratio:var(--facebook-ratio,267/476);
}
.facebook-open-link{
  color:#dcebf0;
  font-size:.78rem;
  line-height:1.2;
  text-decoration:none;
  border-bottom:1px solid rgba(151,205,221,.45);
}
.facebook-open-link:hover,.facebook-open-link:focus-visible{color:#fff;border-bottom-color:#fff;}

/* PATCH 70 - mobile-first personal pages + local video support */
.video-embed .local-video{
  position:absolute;
  inset:0;
  display:block;
  width:100%;
  height:100%;
  border:0;
  background:#0d1a2d;
  object-fit:contain;
}
.person-intro>.person-portrait{
  grid-row:1 / span 2;
}
.person-intro>.facts-panel{
  grid-column:2;
  margin-top:-7px;
}

@media(max-width:820px){
  .person-main{
    width:min(calc(100% - 16px),740px);
    padding:12px 0 34px;
  }
  .person-intro{
    padding:20px 16px 22px;
    gap:14px;
  }
  .person-intro>.person-portrait{
    grid-row:auto;
  }
  .person-intro>.facts-panel{
    grid-column:1;
    margin-top:0;
  }
  .person-portrait{
    width:min(138px,42vw);
    height:min(138px,42vw);
  }
  .person-head h1{
    margin-bottom:7px;
    font-size:clamp(2.08rem,9vw,3rem);
  }
  .facts-panel{
    margin-top:12px;
  }
  .fact{
    min-height:40px;
    padding:6px 0;
    font-size:.98rem;
    line-height:1.48;
  }
  .role{
    font-size:1.01rem;
    line-height:1.58;
  }

  .unified-media-section{
    --media-stage-height:188px;
    padding:16px 10px 18px;
  }
  .unified-media-section .media-stage,
  .unified-media-section .media-stage[data-media-count="1"],
  .unified-media-section .media-stage[data-media-count="2"],
  .unified-media-section .media-stage[data-media-count="3"]{
    --media-card-max-height:calc(var(--media-stage-height) - 22px);
    height:var(--media-stage-height);
    display:flex;
    align-items:center;
    gap:8px;
    overflow-x:auto;
    overflow-y:hidden;
    padding:7px;
    scroll-snap-type:x mandatory;
    scrollbar-width:none;
    overscroll-behavior-inline:contain;
  }
  .unified-media-section .media-stage::-webkit-scrollbar{display:none;}
  .media-stage-item{
    height:100%;
    flex:0 0 100%;
    scroll-snap-align:center;
  }
  .media-instagram-item,
  .media-facebook-item{
    grid-template-rows:minmax(0,1fr) auto;
  }
  .instagram-embed{
    width:min(100%,260px);
  }
  .instagram-open-link,.facebook-open-link{font-size:.72rem;}
  .media-facebook-item.is-landscape .facebook-embed iframe{
    width:100%;
    height:auto;
  }
  .media-facebook-item.is-portrait .facebook-embed iframe{
    width:auto;
    height:100%;
  }
  .media-stage[data-media-count="1"] .media-stage-item{
    flex-basis:100%;
  }
  .media-stage[data-media-count="2"] .media-stage-item{
    flex-basis:calc(50% - 4px);
  }
  .media-stage[data-media-count="3"] .media-stage-item{
    flex-basis:min(76vw,280px);
  }
  .media-stage-item .video-embed,
  .media-stage[data-media-count="3"] .media-stage-item .video-embed{
    width:100%;
    max-width:none;
    height:min(100%,var(--media-card-max-height));
    aspect-ratio:16/9;
  }
  .media-stage[data-media-count="1"] .media-stage-item .video-embed{
    width:min(100%,560px);
    max-width:560px;
  }
  .media-stage[data-media-count="1"] .media-stage-item .instagram-embed{
    width:min(100%,300px);
    max-width:300px;
  }
  .media-stage[data-media-count="1"] .media-stage-item .media-image-link{
    width:min(100%,220px);
    max-width:220px;
  }
  .media-stage-item .media-image-link{
    width:min(100%,210px);
    max-width:210px;
    max-height:100%;
  }
  .media-stage-item .media-image-link img{
    height:min(132px,calc(var(--media-stage-height) - 42px));
    max-height:none;
  }
  .unified-media-section .media-actions{
    margin-top:10px;
  }

  .story-section{
    padding:24px 15px 30px;
  }
  .story-section>h2{
    margin-bottom:1.25rem;
    font-size:1.78rem;
  }
  .story-main-grid{
    gap:2rem;
  }
  .story-main-grid .story-chapter.event{
    padding-top:1.35rem;
  }
  .story-chapter>h3{
    margin-bottom:1.15rem;
    font-size:1.38rem;
  }
  .story-main-grid .story-text p,
  .story-text p{
    margin-bottom:1em;
    font-size:1.07rem;
    line-height:1.74;
  }
  .story-chapter.legacy{
    margin-top:2rem;
    padding-top:1.35rem;
  }
  .story-media-break,
  .story-media-break.side-left,
  .story-media-break.side-right,
  .story-media-break.media-landscape,
  .story-media-break.media-square,
  .story-media-break.media-portrait{
    width:100%;
    max-width:100%;
    margin:1.05rem auto 1.55rem;
  }
  .story-media-break figure{
    height:220px;
    padding:5px;
    border-radius:12px;
  }
  .story-media-break img{
    border-radius:8px;
  }
  .family-contact{
    margin-top:14px;
    padding:16px 13px;
  }
  .family-contact-text{
    margin-bottom:10px;
    font-size:.98rem;
  }
}

@media(max-width:560px){
  .person-topbar{
    padding:6px 9px;
  }
  .person-topbar-inner{
    gap:8px;
  }
  .person-brand{
    font-size:.88rem;
    white-space:nowrap;
  }
  .back-link{
    min-height:36px;
    font-size:.80rem;
    white-space:nowrap;
  }
  .council-corner{
    top:52px;
    left:8px;
    width:38px;
    height:38px;
    padding:5px;
  }
  .person-main{
    width:calc(100% - 12px);
    padding-top:8px;
  }
  .person-intro{
    grid-template-columns:104px minmax(0,1fr);
    align-items:center;
    gap:12px;
    padding:14px 13px 16px;
    text-align:right;
  }
  .person-portrait{
    width:104px;
    height:104px;
    margin:0;
    padding:4px;
  }
  .person-head{
    align-self:center;
  }
  .person-head h1{
    margin-bottom:5px;
    font-size:clamp(1.82rem,8.3vw,2.25rem);
    line-height:1.04;
  }
  .place{
    margin-bottom:3px;
    font-size:.88rem;
  }
  .service-line{
    justify-content:flex-start;
    gap:5px;
    margin-bottom:3px;
    font-size:.91rem;
  }
  .role{
    margin:3px 0 0;
    font-size:.94rem;
    line-height:1.48;
  }
  .person-intro>.facts-panel{
    grid-column:1 / -1;
    width:100%;
    margin-top:3px;
  }
  .fact{
    min-height:36px;
    padding:5px 2px;
    font-size:.93rem;
  }
  .media-section,.story-section,.links-section{
    margin-top:10px;
    border-radius:13px;
  }
  .media-section h2,.story-section>h2,.links-section h2{
    font-size:1.62rem;
    margin-bottom:1rem;
  }
  .unified-media-section{
    --media-stage-height:174px;
    padding:14px 9px 16px;
  }
  .unified-media-section h2{
    margin-bottom:8px;
    font-size:1.5rem;
  }
  .story-section{
    padding:20px 13px 26px;
  }
  .story-main-grid .story-text p,
  .story-text p{
    font-size:1.02rem;
    line-height:1.68;
  }
  .story-chapter>h3{
    gap:9px;
    font-size:1.28rem;
  }
  .story-media-break figure{
    height:200px;
  }
  .media-actions a,.memorial-links a,.family-contact-btn{
    min-height:44px;
    padding:8px 13px;
    font-size:.94rem;
  }
  .page-footer{
    margin-top:22px;
  }
}

@media(max-width:380px){
  .person-brand{font-size:.82rem;}
  .back-link{font-size:.75rem;}
  .person-intro{
    grid-template-columns:94px minmax(0,1fr);
    gap:10px;
    padding-inline:11px;
  }
  .person-portrait{
    width:94px;
    height:94px;
  }
  .person-head h1{
    font-size:1.78rem;
  }
  .story-section{
    padding-inline:11px;
  }
}


/* PATCH 77 - final desktop top-media equalization */
@media(min-width:821px){
  .media-section.unified-media-section{
    position:relative;
    z-index:1;
    overflow:hidden;
  }
  .unified-media-section + .story-section{
    position:relative;
    z-index:0;
  }
  .unified-media-section .media-stage,
  .unified-media-section .media-stage[data-media-count="1"],
  .unified-media-section .media-stage[data-media-count="2"],
  .unified-media-section .media-stage[data-media-count="3"]{
    --media-card-max-height:min(250px,calc(var(--media-stage-height) - 30px));
    align-items:center;
    justify-items:center;
    overflow:hidden;
  }
  .unified-media-section .media-stage[data-media-count="1"]{
    grid-template-columns:minmax(0,620px);
    max-width:680px;
  }
  .unified-media-section .media-stage[data-media-count="1"] .media-stage-item,
  .unified-media-section .media-stage[data-media-count="2"] .media-stage-item,
  .unified-media-section .media-stage[data-media-count="3"] .media-stage-item{
    align-self:center;
    justify-self:center;
    overflow:hidden;
  }
  .unified-media-section .media-stage .media-video-item,
  .unified-media-section .media-stage .media-instagram-item,
  .unified-media-section .media-stage .media-facebook-item,
  .unified-media-section .media-stage .media-image-item{
    width:100%;
  }
  .unified-media-section .media-stage .video-embed,
  .unified-media-section .media-stage .instagram-embed,
  .unified-media-section .media-stage .facebook-embed{
    overflow:hidden;
  }
  .unified-media-section .media-stage[data-media-count="1"] .media-video-item .video-embed{
    width:min(100%,560px);
  }
  .unified-media-section .media-stage[data-media-count="2"] .media-video-item .video-embed{
    width:min(100%,390px);
  }
  .unified-media-section .media-stage[data-media-count="3"] .media-video-item .video-embed{
    width:min(100%,292px);
  }
  .unified-media-section .media-stage[data-media-count="2"] .media-instagram-item .instagram-embed,
  .unified-media-section .media-stage[data-media-count="2"] .media-facebook-item .facebook-embed{
    width:min(100%,292px);
  }
  .unified-media-section .media-stage[data-media-count="3"] .media-instagram-item .instagram-embed,
  .unified-media-section .media-stage[data-media-count="3"] .media-facebook-item .facebook-embed{
    width:min(100%,232px);
  }
  .unified-media-section .media-stage[data-media-count="2"] .media-facebook-item.is-landscape .facebook-embed iframe,
  .unified-media-section .media-stage[data-media-count="3"] .media-facebook-item.is-landscape .facebook-embed iframe{
    width:100%;
    height:auto;
  }
  .unified-media-section .media-stage[data-media-count="2"] .media-facebook-item.is-portrait .facebook-embed iframe,
  .unified-media-section .media-stage[data-media-count="3"] .media-facebook-item.is-portrait .facebook-embed iframe{
    width:auto;
    height:100%;
  }
  .unified-media-section .media-stage[data-media-count="2"] .media-image-item .media-image-link{
    max-width:220px;
  }
  .unified-media-section .media-stage[data-media-count="3"] .media-image-item .media-image-link{
    max-width:188px;
  }
}


/* PATCH 78 - strict media cell fit (Facebook/Instagram included) */
@media(min-width:821px){
  .unified-media-section .media-stage{
    overflow:hidden;
  }
  .unified-media-section .media-stage-item{
    box-sizing:border-box;
    width:100%;
    height:100%;
    min-width:0;
    min-height:0;
    overflow:hidden;
  }
  .unified-media-section .media-instagram-item,
  .unified-media-section .media-facebook-item{
    display:grid;
    grid-template-rows:minmax(0,1fr) 22px;
    align-items:stretch;
    justify-items:center;
    gap:4px;
  }
  .unified-media-section .instagram-embed,
  .unified-media-section .facebook-embed{
    box-sizing:border-box;
    width:100%;
    height:100%;
    min-width:0;
    min-height:0;
    max-width:100%;
    max-height:100%;
    overflow:hidden;
  }
  .unified-media-section .instagram-embed iframe,
  .unified-media-section .facebook-embed iframe,
  .unified-media-section .media-facebook-item.is-landscape .facebook-embed iframe,
  .unified-media-section .media-facebook-item.is-portrait .facebook-embed iframe{
    display:block;
    box-sizing:border-box;
    width:100% !important;
    height:100% !important;
    min-width:0 !important;
    min-height:0 !important;
    max-width:100% !important;
    max-height:100% !important;
    aspect-ratio:auto !important;
    border:0;
    overflow:hidden;
  }
  .unified-media-section .instagram-open-link,
  .unified-media-section .facebook-open-link{
    align-self:center;
    justify-self:center;
    max-width:100%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    line-height:18px;
  }
  .unified-media-section .media-stage[data-media-count="2"] .media-instagram-item,
  .unified-media-section .media-stage[data-media-count="2"] .media-facebook-item,
  .unified-media-section .media-stage[data-media-count="3"] .media-instagram-item,
  .unified-media-section .media-stage[data-media-count="3"] .media-facebook-item{
    height:100%;
  }
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

  const instagramEmbedUrl = (permalink) => {
    try {
      const url = new URL(String(permalink || ''));
      const cleanPath = url.pathname.replace(/\/+$/, '');
      return `https://www.instagram.com${cleanPath}/embed/captioned/`;
    } catch {
      return String(permalink || '');
    }
  };

  const facebookEmbedUrl = (permalink, width = 560, height = 314) => {
    const safeWidth = Number.isFinite(Number(width)) && Number(width) > 0 ? Math.round(Number(width)) : 560;
    const safeHeight = Number.isFinite(Number(height)) && Number(height) > 0 ? Math.round(Number(height)) : 314;
    const href = encodeURIComponent(String(permalink || ''));
    return `https://www.facebook.com/plugins/video.php?height=${safeHeight}&href=${href}&show_text=false&width=${safeWidth}&t=0`;
  };

  const renderTopMedia = () => (person.topMedia || []).map((group, groupIndex) => {
    const videoItems = (group.videos || []).map((video, i) => {
      const title = esc(video.title && video.title !== 'YouTube video player' ? video.title : `${group.heading || 'סרטון הנצחה'} — ${person.name || ''}${(group.videos || []).length > 1 ? ` ${i + 1}` : ''}`);
      const isLocalVideo = video.type === 'file' || /\.(?:mp4|webm|ogg)(?:[?#].*)?$/i.test(String(video.src || ''));
      const player = isLocalVideo
        ? `<video class="local-video" controls playsinline preload="metadata" src="${esc(assetUrl(video.src))}" aria-label="${title}"></video>`
        : `<iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin" src="${esc(video.src)}" title="${title}"></iframe>`;
      return `<div class="media-stage-item media-video-item"><div class="video-embed">${player}</div></div>`;
    });
    const instagramItems = (group.instagram || []).map((item, i) => {
      const permalink = String(item.permalink || item.href || '').trim();
      if (!permalink) return '';
      const title = esc(item.title || `Instagram Reel — ${person.name || ''}${(group.instagram || []).length > 1 ? ` ${i + 1}` : ''}`);
      const embedSrc = esc(instagramEmbedUrl(permalink));
      return `<div class="media-stage-item media-instagram-item"><div class="instagram-embed"><iframe allow="autoplay; encrypted-media; picture-in-picture; web-share" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin" src="${embedSrc}" title="${title}"></iframe></div><a class="instagram-open-link" href="${esc(permalink)}" rel="noopener noreferrer" target="_blank">פתיחה באינסטגרם</a></div>`;
    }).filter(Boolean);
    const facebookItems = (group.facebook || []).map((item, i) => {
      const permalink = String(item.permalink || item.href || '').trim();
      if (!permalink) return '';
      const width = Number(item.width) > 0 ? Number(item.width) : 560;
      const height = Number(item.height) > 0 ? Number(item.height) : 314;
      const portrait = height >= width;
      const title = esc(item.title || `Facebook Reel — ${person.name || ''}${(group.facebook || []).length > 1 ? ` ${i + 1}` : ''}`);
      const embedSrc = esc(facebookEmbedUrl(permalink, width, height));
      const ratio = `${Math.round(width)}/${Math.round(height)}`;
      return `<div class="media-stage-item media-facebook-item ${portrait ? 'is-portrait' : 'is-landscape'}" style="--facebook-ratio:${esc(ratio)}"><div class="facebook-embed"><iframe allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin" scrolling="no" src="${embedSrc}" title="${title}"></iframe></div><a class="facebook-open-link" href="${esc(permalink)}" rel="noopener noreferrer" target="_blank">פתיחה בפייסבוק</a></div>`;
    }).filter(Boolean);
    const imageItems = (group.images || []).map((image) => {
      const body = `<img alt="${esc(image.alt || '')}" decoding="async" loading="lazy" src="${esc(assetUrl(image.src))}">${image.label ? `<span class="media-image-label">${esc(image.label)}</span>` : ''}`;
      const card = image.href ? `<a class="media-image-link" href="${esc(image.href)}" rel="noopener noreferrer" target="_blank">${body}</a>` : `<div class="media-image-link">${body}</div>`;
      return `<div class="media-stage-item media-image-item">${card}</div>`;
    });
    const mediaItems = [...videoItems, ...instagramItems, ...facebookItems, ...imageItems];
    const links = (group.links || []).map((link) => `<a href="${esc(link.href)}" rel="noopener noreferrer" target="_blank">${esc(link.label)}</a>`).join('');
    return `<section class="media-section unified-media-section" aria-labelledby="mediaHeading${groupIndex}"><h2 id="mediaHeading${groupIndex}">${esc(group.heading || 'סרטון לזכרו')}</h2>${mediaItems.length ? `<div class="media-stage" data-media-count="${mediaItems.length}">${mediaItems.join('')}</div>` : ''}${links ? `<div class="media-actions">${links}</div>` : ''}</section>`;
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
    let personalChapter = '';
    let eventChapter = '';
    if ((story.personal || []).length) personalChapter = `<div class="story-chapter personal">${renderParagraphs(story.personal, 'personal')}</div>`;
    if ((story.event || []).length) {
      const eventHeading = person.isPreviousYears ? 'יום הנפילה והנסיבות' : (story.eventHeading || 'שבת ה7.10.2023');
      eventChapter = `<section class="story-chapter event" aria-labelledby="eventHeading"><h3 id="eventHeading">${esc(eventHeading)}</h3>${renderParagraphs(story.event, 'event')}</section>`;
    }
    const mainChapters = personalChapter || eventChapter ? `<div class="story-main-grid${personalChapter && eventChapter ? '' : ' single-column'}">${personalChapter}${eventChapter}</div>` : '';
    const legacyChapter = (story.legacy || []).length ? `<section class="story-chapter legacy" aria-labelledby="legacyHeading"><h3 id="legacyHeading">${esc(story.legacyHeading || 'זיכרון, מורשת והנצחה')}</h3>${renderParagraphs(story.legacy, 'legacy')}</section>` : '';
    storyHtml = `<article class="story-section" aria-labelledby="lifeStoryHeading"><h2 id="lifeStoryHeading">סיפור חיים</h2><div class="story-copy">${mainChapters}${legacyChapter}</div></article>`;
  }

  const pageLinks = (person.pageLinks || []).length ? `<section class="links-section" aria-labelledby="pageLinksHeading"><h2 id="pageLinksHeading">קישורים</h2><div class="memorial-links">${person.pageLinks.map((link) => `<a href="${esc(link.href)}" rel="noopener noreferrer" target="_blank">${esc(link.label)}</a>`).join('')}</div></section>` : '';

  const family = person.familyContact ? `<section class="family-contact" aria-label="עדכון פרטי ההנצחה"><p class="family-contact-text">${esc(person.familyContact.text || '')}</p><a class="family-contact-btn" href="${esc(person.familyContact.href || '#')}" rel="noopener noreferrer" target="_blank"${person.familyContact.ariaLabel ? ` aria-label="${esc(person.familyContact.ariaLabel)}"` : ''}>${esc(person.familyContact.label || 'ליצירת קשר ב-WhatsApp')}</a></section>` : '';

  root.innerHTML = `
<a class="skip-link" href="#mainContent">דילוג לתוכן הראשי</a>
<div class="council-corner" aria-hidden="true"><img alt="" src="${esc(assetUrl('favicon-sng.svg'))}"></div>
<header class="person-topbar"><div class="person-topbar-inner"><a class="person-brand" href="${esc(new URL('index.html', siteRoot).href)}">רקמה אנושית אחת</a><a class="back-link" href="${esc(new URL('index.html', siteRoot).href)}">← חזרה לרשימת ההנצחה</a></div></header>
<main class="person-main" id="mainContent">
  <section class="person-intro" aria-labelledby="personName"><figure class="person-portrait">${portrait}</figure><div class="person-head"><p class="place">${esc(person.place || '')}</p><h1 id="personName">${esc(person.name || '')}</h1>${serviceHtml}${person.role ? `<p class="role">${esc(person.role)}</p>` : ''}</div>${facts ? `<div class="facts-panel">${facts}</div>` : ''}</section>
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
