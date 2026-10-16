'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, MotionConfig, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { clinic } from '@/lib/clinic';
import { Services } from '@/components/services';
import { FirstVisit } from '@/components/first-visit';
import { ScrollStatement, ClosingHeading } from '@/components/scroll-statement';
import { ArrowUpRight, ArrowRight, ArrowDown, X, Menu, Phone, MapPin, Mail, Sparkles } from 'lucide-react';

const maps = clinic.maps;
const careNotes = [
  { label: 'EXAMINATION & EVALUATION', title: 'Begin with a clear picture.', text: 'Examination and x-ray evaluation help you understand your dental health before deciding on the next step.' },
  { label: 'TREATMENT PLANNING', title: 'Know what comes next.', text: 'Discuss treatment planning, pain management, medication, and the questions that matter to you.' },
  { label: 'ORAL CARE EDUCATION', title: 'Keep your progress going.', text: 'Leave with practical guidance for caring for your teeth and protecting your smile between visits.' },
];

function Reveal({children, className = ''}:{children:React.ReactNode;className?:string}) {
  const reduced = useReducedMotion();
  return <motion.div initial={{opacity:reduced ? 1 : 0,y:reduced ? 0 : 55}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-40px'}} transition={{duration:.9,ease:[.22,1,.36,1]}} className={className}>{children}</motion.div>;
}
function Eyebrow({children,light=false}:{children:React.ReactNode;light?:boolean}) { return <div className={`flex items-center gap-3 text-[11px] font-medium uppercase tracking-[.2em] ${light?'text-cream/70':'text-ink/60'}`}><span className={`h-1.5 w-1.5 rounded-full ${light?'bg-cream/70':'bg-olive'}`}/>{children}</div>; }
function BrandMark({light=false}:{light?:boolean}) {return <span aria-hidden="true" className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-[15px_15px_19px_19px] border shadow-[4px_5px_0_rgba(80,59,66,.14)] ${light?'border-cream/30 bg-cream/10 text-cream':'border-plum bg-plum text-cream'}`}><svg viewBox="0 0 44 44" className="h-9 w-9" fill="none"><path d="M13.2 7.8c-2.4 2.3-3 6.2-2.4 10.3.6 4 2.5 6.2 2.5 10.7 0 4.6 1.5 7.3 3.6 7.3 1.7 0 2.1-2.8 4.9-2.8s3.2 2.8 4.9 2.8c2.1 0 3.6-2.7 3.6-7.3 0-4.5 1.9-6.7 2.5-10.7.6-4.1 0-8-2.4-10.3-2.1-2-4.9-2.1-6.7-.6-1.6 1.2-2.2 1.2-3.8 0-1.8-1.5-4.6-1.4-6.7.6Z" stroke="currentColor" strokeWidth="1.5"/><path d="M22 15.2v9.6M17.2 20h9.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg><span className={`absolute -right-2 -top-2 text-[15px] ${light?'text-[#d3d1b9]':'text-plum'}`}>✦</span></span>;}
function Brand({light=false}:{light?:boolean}) {return <a href="#home" aria-label="Yahya Dental home" className={`group flex shrink-0 items-center gap-3 ${light?'text-cream':'text-plum'}`}><BrandMark light={light}/><span className="min-w-0"><span className="block whitespace-nowrap font-serif text-[23px] leading-[.95] tracking-[-.8px] transition-colors group-hover:text-olive sm:text-[26px]">Yahya <em className={`font-normal ${light?'text-[#d3d1b9]':'text-plum'}`}>Dental</em></span></span></a>;}

export default function Home() {
  const [menuOpen,setMenuOpen] = useState(false);
  const [booking,setBooking] = useState(false);
  const [careNote,setCareNote] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const hero = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const {scrollY, scrollYProgress} = useScroll();
  const heroY = useTransform(scrollY,[0,1000],[0,-65]);
  const heroScale = useTransform(scrollY,[0,1000],[1,1.12]);
  const heroShade = useTransform(scrollY,[0,850],[0,.4]);
  const openBooking = () => {setMenuOpen(false);setBooking(true);};
  useEffect(()=>{
    if(booking){dialog.current?.showModal();document.body.style.overflow='hidden';}
    else {dialog.current?.close();document.body.style.overflow='';}
    return ()=>{document.body.style.overflow='';};
  },[booking]);
  return <MotionConfig reducedMotion="user">
    <motion.div aria-hidden="true" style={{scaleX:scrollYProgress}} className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-[#afad8e]"/>
    <a href="#services" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-cream focus:p-4">Skip to content</a>
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/95 shadow-[0_4px_24px_-14px_rgba(48,42,42,.25)] backdrop-blur-xl">
      <div className="mx-auto flex h-[88px] max-w-[1600px] items-center justify-between px-6 md:px-12 lg:px-16">
        <Brand/>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 text-[12px] lg:flex">
          <a className="transition-colors hover:text-olive" href="#philosophy">Our approach</a><a className="transition-colors hover:text-olive" href="#services">Services</a><a className="transition-colors hover:text-olive" href="#first-visit">Your first visit</a><a className="transition-colors hover:text-olive" href="#care">Your care</a><a className="transition-colors hover:text-olive" href="#visit">Find us</a>
        </nav>
        <button onClick={openBooking} className="group hidden items-center gap-7 rounded-full bg-plum px-6 py-3.5 text-[13px] text-cream transition-colors hover:bg-olive sm:flex">Book a consultation <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45"/></button>
        <button aria-label={menuOpen?'Close navigation':'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={()=>setMenuOpen(!menuOpen)} className="p-2 lg:hidden">{menuOpen?<X size={23}/>:<Menu size={23}/>}</button>
      </div>
      <AnimatePresence>{menuOpen&&<motion.nav id="mobile-nav" aria-label="Mobile navigation" initial={{height:0,opacity:1}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="absolute top-full max-h-[calc(100dvh-88px)] w-full overflow-y-auto border-b border-ink/10 bg-cream shadow-lg lg:hidden"><div className="flex flex-col gap-6 px-7 py-8">{[['Our approach','philosophy'],['Services','services'],['Your first visit','first-visit'],['Your care','care'],['Find us','visit']].map(([name,id])=><a key={id} href={`#${id}`} onClick={()=>setMenuOpen(false)} className="text-xl">{name}</a>)}<button onClick={openBooking} className="rounded-full bg-plum p-4 text-cream">Book a consultation</button></div></motion.nav>}</AnimatePresence>
    </header>

    <main id="home">
      <section ref={hero} className="sticky top-[88px] z-0 isolate min-h-[740px] overflow-hidden bg-[#e8e4df] md:h-[calc(100svh-88px)] md:min-h-[710px] md:max-h-[1000px]">
        <motion.div style={{y:reduced?0:heroY,scale:reduced?1:heroScale}} className="absolute inset-0 -z-10"><img src="/images/hero-dental-checkup.webp" alt="Dentist gently examining a patient during a routine dental checkup" fetchPriority="high" className="h-full w-full object-cover object-[48%_50%] md:object-center"/></motion.div>
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-[#e8e4df]/60 via-transparent to-[#e8e4df]/45"/>
        <div className="absolute inset-y-0 left-0 -z-10 w-[82%] bg-linear-to-r from-[#e8e4df]/95 via-[#e8e4df]/65 to-transparent md:w-[58%]"/>
        <div className="relative mx-auto h-full min-h-[740px] max-w-[1600px] px-6 pt-8 md:min-h-0 md:px-12 lg:px-16">
          <div className="flex items-center justify-between"><Eyebrow>Care that comes full circle</Eyebrow><span className="hidden text-[11px] uppercase tracking-[.17em] text-ink/60 sm:block">Faisalabad · Pakistan</span></div>
          <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.9,delay:.15}} className="relative mt-14 max-w-[270px] md:mt-14 lg:mt-20">
            <h1 className="font-serif text-[39px] leading-[1.08] tracking-[-1.5px] md:text-[45px]">A little care.<br/>A healthier <em className="font-normal">smile.</em></h1>
            <p className="mt-5 max-w-[215px] text-[13px] leading-[1.8] text-ink/70">Thoughtful dentistry in Faisalabad.<br/>For the comfort to smile freely.</p>
            <button onClick={openBooking} className="group mt-7 flex items-center gap-7 rounded-full bg-plum px-6 py-4 text-[13px] text-cream shadow-[0_8px_24px_-12px_rgba(80,59,66,.55)] transition-colors hover:bg-olive">Start your journey <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/></button>
          </motion.div>
          <a href="#services" className="absolute right-10 top-28 hidden h-28 w-28 items-center justify-center lg:flex" aria-label="Explore our dental services"><svg className="orbit absolute inset-0 h-full w-full" viewBox="0 0 120 120" aria-hidden="true"><defs><path id="circle" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0"/></defs><text fill="currentColor" fontSize="9.3" letterSpacing="3.3"><textPath href="#circle">CARE • SMILE • CONFIDENCE • </textPath></text></svg><Sparkles size={25} strokeWidth={1}/></a>
          <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:1.1,delay:.3,ease:[.22,1,.36,1]}} className="absolute inset-x-5 bottom-[120px] text-center md:inset-x-10 md:bottom-[84px]">
            <p className="whitespace-nowrap font-serif text-[clamp(48px,14.5vw,224px)] leading-[.77] tracking-[-.065em] text-plum">Smile freely.<span aria-hidden="true" className="relative -top-[.47em] ml-[.05em] inline-block text-[.26em] font-normal tracking-normal">✳</span></p>
          </motion.div>
          <div className="absolute inset-x-6 bottom-6 flex items-end justify-between border-t border-ink/20 pt-5 md:inset-x-12 md:bottom-6 lg:inset-x-16">
            <p className="text-[11px] uppercase leading-[1.8] tracking-[.22em]">Healthy teeth.<br className="sm:hidden"/> Confident smiles.</p>
            <a href={clinic.reviews} target="_blank" rel="noreferrer" className="flex items-center gap-3"><span className="font-serif text-[28px]">{clinic.reviewCount}</span><span className="text-[11px] leading-[1.8]">Google reviews<br/><span className="inline-flex items-center gap-1 text-olive">Read patient feedback <ArrowUpRight size={11}/></span></span></a>
            <a href="#philosophy" className="hidden items-center gap-4 text-[11px] uppercase tracking-[.2em] md:flex">A little more about us <ArrowDown size={16}/></a>
          </div>
        </div>
        <motion.div aria-hidden="true" style={{opacity:reduced?0:heroShade}} className="pointer-events-none absolute inset-0 z-20 bg-[#241f21]"/>
      </section>

      <div className="relative z-10 rounded-t-[28px] bg-cream shadow-[0_-24px_65px_-25px_rgba(48,42,42,.25)] md:rounded-t-[48px]">
      <section id="philosophy" className="mx-auto grid max-w-[1440px] gap-9 px-6 py-20 md:grid-cols-[1fr_2fr] md:px-12 md:py-24 lg:px-16">
        <Reveal><Eyebrow>The Yahya Dental Clinic approach</Eyebrow><span className="mt-8 hidden font-serif text-7xl text-olive/35 md:block">✳</span></Reveal>
        <Reveal><ScrollStatement/><div className="mt-7 grid gap-5 text-[12px] leading-[1.9] text-ink/60 sm:grid-cols-2"><p>From an examination and x-ray evaluation to a complete treatment plan, you deserve dental care that feels comfortable, considered, and easy to understand.</p><p>At {clinic.name} in Samanabad, Faisalabad, we bring together clear explanations, practical oral care education, and a personal approach to your care.</p></div></Reveal>
      </section>

      <Services onBook={openBooking}/>

      <FirstVisit onBook={openBooking}/>

      <section id="care" className="mx-auto grid max-w-[1440px] gap-10 px-6 py-20 md:grid-cols-[1fr_1.7fr] md:gap-20 md:px-12 md:py-24 lg:px-16">
        <Reveal className="relative"><span aria-hidden="true" className="absolute -top-8 right-0 font-serif text-[120px] leading-none text-olive/15">✳</span><Eyebrow>Your care, clearly</Eyebrow><h2 className="mt-7 max-w-[430px] font-serif text-[42px] leading-[1.08] tracking-[-1.5px] md:text-[55px]">A calm plan for your <em className="font-normal text-olive">next step.</em></h2><p className="mt-6 max-w-[330px] text-[13px] leading-[1.9] text-ink/65">Have questions about your teeth, pain, or smile? Start a conversation with {clinic.name} and take it one step at a time.</p><a href={clinic.reviews} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-3 border-b border-ink/25 pb-1 text-[12px]">Read {clinic.reviewCount} Google reviews <ArrowUpRight size={13}/></a></Reveal>
        <Reveal><div className="divide-y divide-ink/15 border-y border-ink/15">{careNotes.map((note,index)=><button key={note.label} onClick={()=>setCareNote(index)} aria-pressed={careNote===index} className="group grid w-full gap-4 py-7 text-left transition-colors hover:text-olive md:grid-cols-[.7fr_1fr_1.4fr] md:items-center md:gap-8"><span className="text-[11px] uppercase tracking-[.17em] text-olive">0{index+1} · {note.label}</span><span className="font-serif text-[26px] leading-[1.1] text-plum">{note.title}</span><span className={`text-[13px] leading-[1.8] transition-colors ${careNote===index?'text-ink/75':'text-ink/55'}`}>{note.text}</span></button>)}</div></Reveal>
      </section>

      <section id="visit" className="overflow-hidden bg-plum px-6 pb-8 pt-16 text-cream md:px-12 md:pt-20 lg:px-16">
        <div className="mx-auto max-w-[1312px]"><Reveal><div className="flex flex-col justify-between gap-10 border-b border-cream/20 pb-12 md:flex-row md:items-end"><div><Eyebrow light>Your next chapter</Eyebrow><ClosingHeading/></div><div className="max-w-[300px]"><p className="text-[13px] leading-[1.9] text-cream/75">A question, a concern, or a little curiosity.<br/>We’re here for your first step.</p><button onClick={openBooking} className="group mt-6 flex w-full items-center justify-between gap-12 rounded-full bg-cream px-6 py-4 text-[13px] text-plum shadow-[0_8px_24px_-12px_rgba(255,255,255,.35)] transition-colors hover:bg-[#d3d1b9]">Book a consultation <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45"/></button></div></div></Reveal>
          <div className="grid gap-8 py-10 md:grid-cols-[1.1fr_1fr_1fr]"><Brand light/><div><span className="text-[11px] uppercase tracking-[.18em] text-cream/55">Come say hello</span><p className="mt-3 max-w-[290px] text-[13px] leading-[1.8] text-cream/85"><bdi>{clinic.address}</bdi></p><a href={maps} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-3 border-b border-cream/40 pb-1 text-[11px]">Get directions <ArrowUpRight size={12}/></a><a href={clinic.emailHref} className="mt-4 flex w-fit items-center gap-3 text-[11px] text-cream/75"><Mail size={13}/> {clinic.email}</a></div><div><span className="text-[11px] uppercase tracking-[.18em] text-cream/55">A conversation away</span><a href={clinic.phoneHref} className="mt-3 block font-serif text-[25px]">{clinic.phone}</a><p className="mt-3 text-[12px] leading-[1.8] text-cream/75">{clinic.hours}<br/>{clinic.closedDay}<br/>{clinic.hoursNote}</p></div></div>
          <footer className="flex flex-col justify-between gap-3 border-t border-cream/15 pt-6 text-[11px] text-cream/50 sm:flex-row"><span>© {new Date().getFullYear()} {clinic.name}</span><span>Examination · restorative care · alignment · smile confidence</span><a href="#home" className="inline-flex items-center gap-2 text-cream/75">Back to top <ArrowUpRight size={12}/></a></footer>
        </div>
      </section>
      </div>
    </main>

    <dialog aria-labelledby="booking-title" ref={dialog} onCancel={()=>setBooking(false)} onClick={e=>{if(e.target===dialog.current)setBooking(false);}} className="fixed inset-0 m-auto w-[calc(100%-32px)] max-w-[490px] rounded-[3px] border-0 bg-cream p-0 text-ink shadow-2xl backdrop:bg-ink/50 backdrop:backdrop-blur-sm">
      <div className="relative p-8 md:p-11"><button autoFocus aria-label="Close booking options" onClick={()=>setBooking(false)} className="absolute right-4 top-4 rounded-full p-2 hover:bg-ink/5"><X size={19}/></button><Eyebrow>We’re here for you</Eyebrow><h2 id="booking-title" className="mt-7 font-serif text-[43px] leading-[1.1]">Your first step<br/>to a healthier <em className="font-normal text-olive">smile.</em></h2><p className="mt-5 text-[13px] leading-[1.8] text-ink/70">Contact {clinic.name} to discuss your visit and find a convenient time. Your appointment is confirmed directly by the clinic.</p><a href={clinic.phoneHref} className="mt-7 flex items-center justify-between rounded-full bg-plum px-5 py-4 text-[13px] text-cream"><span className="flex items-center gap-3"><Phone size={15}/> Call {clinic.phone}</span><ArrowUpRight size={16}/></a><a href={clinic.emailHref} className="mt-3 flex items-center justify-between rounded-full border border-ink/20 px-5 py-4 text-[13px]"><span className="flex items-center gap-3"><Mail size={15}/> Email the clinic</span><ArrowUpRight size={16}/></a><a href={maps} target="_blank" rel="noreferrer" className="mt-6 flex items-center justify-center gap-2 text-[12px] text-ink/70"><MapPin size={13}/> Find us in Samanabad, Faisalabad <ArrowRight size={13}/></a></div>
    </dialog>
  </MotionConfig>;
}
