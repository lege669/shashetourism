import { motion } from 'motion/react';
import { ShieldCheck, Compass, School, Database, Globe } from 'lucide-react';

export default function AboutSection() {
  const stats = [
    { label: 'Elevation', value: '1,930 m', sub: 'Sub-tropical highlands' },
    { label: 'Founded Hub', value: '1948', sub: 'Imperial Land Grant' },
    { label: 'Diaspora Citizens', value: '40+', sub: 'Representing peak nations' },
    { label: 'ICT fiber mesh link', value: '100%', sub: 'Managed by City ICT Dept' }
  ];

  return (
    <section 
      id="about"
      className="py-20 bg-neutral-900 border-t border-b border-neutral-800 text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Scroll entry transition */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-orange-500 font-mono text-xs uppercase tracking-widest bg-orange-500/10 px-3 py-1.5 rounded-full border border-orange-500/20">
            A Journey of Repatriation & Nature
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-4 text-white">
            Discover historic Shashemene
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto mt-4 rounded-full" />
          <p className="text-neutral-400 mt-6 text-sm sm:text-base leading-relaxed">
            Nestled in the central lush meadows of Ethiopia’s Great Rift Valley, Shashemene is a legendary historical crossroad. It serves as a meeting point for ancient civil tribes, Oromo cultural structures, and a vibrant global Rastafari Diaspora community.
          </p>
        </motion.div>

        {/* Dual Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column Description Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-amber-50">
              Where Ancient Heritage Meets Global Unity
            </h3>
            <p className="text-neutral-300 text-sm leading-relaxed">
              For centuries, the area thrived under the democratic Gadaa values of assembly, centering around Sacred Trees (Oda) such as Melka Oda. In 1948, Emperor Haile Selassie I of Ethiopia designated key parcels of land here to welcome Black families repatriating from Europe, the West, and Jamaican shores.
            </p>
            <p className="text-neutral-300 text-sm leading-relaxed">
              This global covenant blossomed into a singular neighborhood of shared enterprise, organic vegan "ital" agricultural gardens, and spiritual roots-reggae vibrations. Under our smart-municipal expansion scheme, we are preserving this culture while setting up world-class ecotourism models.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div id="card-eco" className="flex items-start gap-3 bg-neutral-950/40 p-4 rounded-xl border border-neutral-800">
                <Compass className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-neutral-200">Sustainable Ecotourism</h4>
                  <p className="text-xs text-neutral-400 mt-1">Sponsoring zero-impact tours around highlands.</p>
                </div>
              </div>

              <div id="card-ict" className="flex items-start gap-3 bg-neutral-950/40 p-4 rounded-xl border border-neutral-800">
                <Database className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-neutral-200">Smart Digital Services</h4>
                  <p className="text-xs text-neutral-400 mt-1">Digital advisory, cyber centers, and mapping portals.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column Interactive Stats Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative bg-neutral-950 p-8 rounded-2xl border border-neutral-800"
          >
            {/* Background design elements */}
            <div className="absolute top-0 right-0 h-40 w-40 bg-orange-600/10 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 h-32 w-32 bg-amber-600/5 blur-3xl rounded-full" />

            <h3 className="text-lg uppercase tracking-wider font-mono text-neutral-400 font-bold mb-6 flex items-center gap-2">
              <Globe className="h-4 w-4 text-orange-500" /> Key Regional Statistics
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
              {stats.map((stat, i) => (
                <div 
                  key={i} 
                  className="bg-neutral-900/60 p-5 rounded-xl border border-neutral-800 hover:border-orange-500/30 hover:bg-neutral-900/90 transition-all group"
                  id={`stat-box-${i}`}
                >
                  <p className="text-xs text-neutral-400 font-mono font-bold group-hover:text-orange-400 transition-colors uppercase">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold font-sans mt-2 text-white">
                    {stat.value}
                  </p>
                  <p className="text-[11px] text-neutral-500 mt-1">
                    {stat.sub}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl mt-6 flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-orange-400 flex-shrink-0" />
              <p className="text-[11px] text-neutral-300 leading-relaxed font-sans">
                Notice: All services in Shashemene (public hotspots, mapping routes, hotel databases) are certified secure and integrated under Legese’s city infrastructure development policy.
              </p>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
