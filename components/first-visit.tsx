'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Check } from 'lucide-react';
import { clinic } from '@/lib/clinic';

const steps = [
  { title: 'Start with your story.', label: 'THE CONVERSATION', text: 'A routine checkup, a painful tooth, or a change to your smile? Share your dental concerns and the questions on your mind. You don’t need to have a treatment in mind to start.', prompt: 'What would you like to feel more confident about?' },
  { title: 'Explore your possibilities.', label: 'THE CLARITY', text: 'Your dentist will assess your teeth and gums, then discuss suitable treatments, appointment plans, costs, and aftercare. Ask what each option involves before deciding on your next step.', prompt: 'What are the options, and what can I expect?' },
  { title: 'Take your next step.', label: 'THE BEGINNING', text: 'Discuss a plan that fits your priorities and confirm the details with the clinic. From your first appointment to follow-up questions, keep the conversation going.', prompt: 'What happens next, and how should I prepare?' },
];

export function FirstVisit({ onBook }: { onBook: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 75%'] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-20, 100]);

  return <section ref={ref} id="first-visit" aria-labelledby="first-visit-title" className="bg-[#ede7df] px-6 py-20 md:px-12 md:py-24 lg:px-16">
    <div className="mx-auto max-w-[1312px]">
      <div className="mb-12 flex items-center justify-between border-b border-plum/20 pb-5 md:mb-16">
        <span className="flex items-center gap-3 text-[11px] uppercase tracking-[.2em] text-plum"><span className="h-1.5 w-1.5 rounded-full bg-olive"/> Your first visit</span>
        <span className="text-[11px] uppercase tracking-[.16em] text-ink/55">A little clarity goes a long way</span>
      </div>
      <div className="grid items-start gap-14 md:grid-cols-[.9fr_1.1fr] md:gap-16 lg:gap-24">
        <div className="md:sticky md:top-[124px]">
          <motion.h2 id="first-visit-title" initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .4 }} transition={{ duration: .8 }} className="font-serif text-[48px] leading-[1.06] tracking-[-1.8px] text-plum lg:text-[65px]">Good care begins<br/>with a little<br/><em className="font-normal text-olive">understanding.</em></motion.h2>
          <p className="mt-6 max-w-[290px] text-[13px] leading-[1.9] text-ink/70">Your first visit to {clinic.name}? Make space for your questions, get to know your options, and feel ready for the next step.</p>
          <button onClick={onBook} className="group mt-7 inline-flex items-center gap-7 rounded-full bg-plum px-6 py-4 text-[13px] text-cream shadow-[0_8px_24px_-12px_rgba(80,59,66,.45)] transition-colors hover:bg-olive">Let’s have a conversation <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"/></button>
          <div aria-hidden="true" className="mt-12 hidden items-center gap-5 text-plum/35 md:flex"><motion.span style={{ rotate: reduced ? 0 : rotate }} className="inline-block text-[83px] leading-none">✳</motion.span><span className="text-[11px] uppercase leading-[1.9] tracking-[.16em]">Your pace.<br/>Your questions.<br/>Your next chapter.</span></div>
        </div>
        <div className="relative pl-7 md:pl-10">
          <div aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-plum/15"><motion.div style={{ scaleY: reduced ? 1 : scrollYProgress }} className="h-full origin-top bg-olive"/></div>
          <ol>{steps.map((step, index) => <motion.li key={step.title} initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .75, ease: [.22, 1, .36, 1] }} className="relative border-b border-plum/15 py-8 first:pt-0 last:border-0 last:pb-0 md:py-10">
            <span aria-hidden="true" className={`absolute -left-[32px] h-[9px] w-[9px] rounded-full border border-[#ede7df] bg-olive md:-left-[44px] ${index === 0 ? 'top-2' : 'top-10 md:top-12'}`}/>
            <div className="flex items-center justify-between gap-5"><span className="text-[11px] uppercase tracking-[.19em] text-olive">{step.label}</span><span className="font-serif text-[34px] leading-none text-plum/30">0{index + 1}</span></div>
            <h3 className="mt-3 font-serif text-[29px] leading-[1.1] tracking-[-.6px] text-plum lg:text-[36px]">{step.title}</h3>
            <p className="mt-4 max-w-[480px] text-[13px] leading-[1.9] text-ink/70">{step.text}</p>
            <p className="mt-5 font-serif text-[17px] italic text-olive">“{step.prompt}”</p>
          </motion.li>)}</ol>
        </div>
      </div>
      <motion.div initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7 }} className="mt-14 grid gap-5 rounded-[3px] border border-plum/15 px-6 py-6 md:mt-20 md:grid-cols-[1fr_2fr] md:items-center md:px-8">
        <p className="font-serif text-[23px] text-plum">A little preparation, more peace of mind.</p>
        <ul className="flex flex-wrap gap-x-7 gap-y-3 text-[12px] text-ink/70">{['Note down your questions', 'Bring previous dental records', 'Call to confirm your visit'].map(item => <li key={item} className="flex items-center gap-2"><Check size={13} strokeWidth={1.5} className="shrink-0 text-olive"/>{item}</li>)}</ul>
      </motion.div>
    </div>
  </section>;
}
