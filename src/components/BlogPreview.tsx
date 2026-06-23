import { Calendar, ArrowUpRight } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import AnimatedSection from './ui/AnimatedSection';
import TiltCard from './ui/TiltCard';

const posts = [
  {
    title: 'Optimizing Re-Renders in Large React Dashboards',
    excerpt: 'Deep dive into rendering performance metrics, context isolation, useMemo hooks, and memory leak mitigation.',
    date: 'Jun 12, 2026',
    category: 'React Perf',
    readTime: '6 min read'
  },
  {
    title: 'Type-Safe End-to-End API Integration with TypeScript',
    excerpt: 'Building schema checkers, mapping API responses directly to typed model layers, and generating dynamic Axios calls.',
    date: 'May 28, 2026',
    category: 'TypeScript',
    readTime: '8 min read'
  },
  {
    title: 'Securing State Management in Hybrid Platforms',
    excerpt: 'How to manage persistence securely, handle authentication tokens inside Redux caching, and optimize mobile memory leaks.',
    date: 'May 04, 2026',
    category: 'Architecture',
    readTime: '5 min read'
  }
];

export default function BlogPreview() {

  return (
    <div>
      <AnimatedSection>
        <SectionHeading
          label="07 / Written Work"
          title="Recent Articles"
          subtitle="Engineering journals covering UI design patterns, site auditing, and code standards"
        />
      </AnimatedSection>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {posts.map((post, i) => (
          <AnimatedSection key={i} delay={i * 100}>
            <TiltCard maxTilt={6} className="h-full">
              <div className="group glass-card rounded-3xl p-6 lg:p-8 h-full flex flex-col justify-between relative overflow-hidden group cursor-default">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#7C3AED]/5 to-transparent rounded-full blur-xl pointer-events-none" />

                <div>
                  {/* Meta details */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] text-[#7C3AED] bg-white/5 border border-white/10
                      px-2.5 py-1 rounded-lg uppercase tracking-wider font-semibold">
                      {post.category}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400 flex items-center gap-1.5">
                      <Calendar size={11} className="text-slate-500" />
                      {post.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-display font-bold text-slate-100 mb-3 group-hover:text-[#7C3AED] transition-colors duration-300 leading-snug">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-slate-350 text-sm leading-relaxed mb-6 font-sans">
                    {post.excerpt}
                  </p>
                </div>

                {/* Bottom footer row */}
                <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                  <span className="font-mono text-[10px] text-slate-400">{post.readTime}</span>
                  <span className="flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-wider text-slate-400 group-hover:text-[#7C3AED] transition-colors">
                    Read article
                    <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </TiltCard>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
