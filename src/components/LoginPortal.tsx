import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, EyeOff, Terminal, Cpu, Database, Network, RefreshCw, 
  Star, Trash2, Check, ArrowRight, X, Upload, Image as ImageIcon, RotateCcw, Lock, FileImage, Sparkles, Layers
} from 'lucide-react';
import { Slide } from '../types';
import { HERO_SLIDES } from '../data';

interface LoginPortalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  isAdmin: boolean;
  slides: Slide[];
  onUpdateSlides: (newSlides: Slide[]) => void;
}

export default function LoginPortal({ isOpen, onClose, onLoginSuccess, isAdmin, slides = HERO_SLIDES, onUpdateSlides }: LoginPortalProps) {
  const safeSlides = Array.isArray(slides) ? slides : HERO_SLIDES;
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorText, setErrorText] = useState('');

  // Tab State
  const [activeTab, setActiveTab] = useState<'network' | 'slides'>('network');

  // New Slide Form State
  const [newSlideImage, setNewSlideImage] = useState<string | null>(null);
  const [newSlideTitle, setNewSlideTitle] = useState('');
  const [newSlideSubtitle, setNewSlideSubtitle] = useState('');
  const [newSlideCategory, setNewSlideCategory] = useState('');
  const [newSlideActionText, setNewSlideActionText] = useState('Explore');
  const [newSlideTag, setNewSlideTag] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [slideFormError, setSlideFormError] = useState('');

  // Admin ICT Hub States
  const [rebootingNode, setRebootingNode] = useState<string | null>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'SYSTEM BOOT SECTOR: OK',
    'FIBER ETHIO_TELECOM PEERING: HIGH SPEED (345 Mbps)',
    'LOCAL VISITOR PORTAL: LISTENING ON PORT 3000',
    'DATABASE: CLOUD FIRESTORE BLUEPRINT SYNCHRONISED',
    'Type /help or command below..'
  ]);
  const [cmdInput, setCmdInput] = useState('');
  
  // Simulated stats
  const [uptimePercent, setUptimePercent] = useState(99.98);
  const [activeNomads, setActiveNomads] = useState(142);

  // Auto increment stats slightly to look alive
  useEffect(() => {
    if (!isAdmin) return;
    const interval = setInterval(() => {
      setActiveNomads(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      setUptimePercent(prev => Math.min(100, Math.max(99.9, prev + (Math.random() > 0.5 ? 0.01 : -0.01))));
    }, 4000);
    return () => clearInterval(interval);
  }, [isAdmin]);

  const handleExecuteLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) {
      setErrorText('Please enter your admin username or email.');
      return;
    }
    if (!passwordInput.trim()) {
      setErrorText('Please enter your password.');
      return;
    }
    
    setIsLoggingIn(true);
    setErrorText('');

    // Simulate authentic standard 1.2s delay
    setTimeout(() => {
      setIsLoggingIn(false);
      const inputLower = emailInput.trim().toLowerCase();
      const passLower = passwordInput.trim().toLowerCase();
      
      const isUserMatch = 
        inputLower === 'admin' || 
        inputLower === 'legesetsegaye41@gmail.com' || 
        inputLower.includes('legese') || 
        inputLower.includes('tsegaye');
        
      const isPassMatch = 
        passLower === 'admin123' || 
        passLower === 'admin' ||
        passwordInput.trim() === 'admin123';

      if (isUserMatch || isPassMatch) {
        onLoginSuccess();
      } else {
        setErrorText('Invalid username or password. Please use default credentials.');
      }
    }, 1200);
  };

  const handleRunCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmdInput.trim()) return;
    
    const command = cmdInput.trim().toLowerCase();
    let response = '';

    switch (command) {
      case '/help':
        response = 'AVAILABLE COMMANDS: /clear, /diagnostics, /active_nodes, /speed_test, /flush_dns';
        break;
      case '/clear':
        setTerminalLogs([]);
        setCmdInput('');
        return;
      case '/diagnostics':
        response = 'DIAGNOSTICS: CPU load 12%, RSSI -45dBm, fiber optic link [OPTIMAL], core temp 41°C.';
        break;
      case '/active_nodes':
        response = 'NODES ONLINE: 1. Central Tourist Sq, 2. Zion Eco-Lodge, 3. Municipality Hall Sub-station.';
        break;
      case '/speed_test':
        response = `SPEED TEST RESULTS: Gateway Downstream: 382.4 Mbps, Upstream: 112.9 Mbps. Latency: 14ms (Central Oromia Node).`;
        break;
      case '/flush_dns':
        response = 'DNS FLUSHED: 412 entries cleared. Redundant browser assets optimized successfully!';
        break;
      default:
        response = `COMMAND NOT RECOGNIZED: "${command}". Type /help for assistance.`;
    }

    setTerminalLogs(prev => [...prev, `legesetsegaye@municipal_core:~$ ${cmdInput}`, response]);
    setCmdInput('');
  };

  const handleSimulateNodeReboot = (nodeName: string) => {
    setRebootingNode(nodeName);
    
    setTerminalLogs(prev => [
      ...prev, 
      `SYSTEM: Triggering remote soft reboot sequence on WAN endpoint [${nodeName}]`,
      `SYSTEM: Resetting local client tables and IP assignments...`
    ]);

    setTimeout(() => {
      setRebootingNode(null);
      setTerminalLogs(prev => [
        ...prev, 
        `SYSTEM: Reboot complete! Node [${nodeName}] has returned ONLINE. 100% bandwidth restored.`
      ]);
    }, 2500);
  };

  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setSlideFormError('File must be an image (PNG, JPG, WEBP, etc.)');
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setSlideFormError('Size exceeds 3MB. Please upload a smaller image.');
      return;
    }
    setSlideFormError('');
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setNewSlideImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0]);
    }
  };

  const handleCreateSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlideImage) {
      setSlideFormError('Please select or drag an image first.');
      return;
    }
    if (!newSlideTitle.trim()) {
      setSlideFormError('Please enter a heading title.');
      return;
    }
    if (!newSlideSubtitle.trim()) {
      setSlideFormError('Please enter a description subtitle.');
      return;
    }
    if (!newSlideCategory.trim()) {
      setSlideFormError('Please choose a category/department tag.');
      return;
    }

    const newSlide: Slide = {
      id: Date.now(),
      title: newSlideTitle.trim(),
      subtitle: newSlideSubtitle.trim(),
      category: newSlideCategory.trim(),
      image: newSlideImage,
      actionText: newSlideActionText.trim() || 'Explore',
      tag: newSlideTag.trim() || undefined
    };

    onUpdateSlides([...safeSlides, newSlide]);

    // Reset Form
    setNewSlideImage(null);
    setNewSlideTitle('');
    setNewSlideSubtitle('');
    setNewSlideCategory('');
    setNewSlideActionText('Explore');
    setNewSlideTag('');
    setSlideFormError('');
  };

  const handleDeleteSlide = (id: number) => {
    if (safeSlides.length <= 1) {
      setSlideFormError('You must keep at least one slide on your homepage!');
      return;
    }
    const updated = safeSlides.filter(s => s.id !== id);
    onUpdateSlides(updated);
  };

  const handleRestoreDefaults = () => {
    onUpdateSlides(HERO_SLIDES);
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto font-sans transition-all duration-300 ${
            isAdmin ? 'bg-black/80 backdrop-blur-md' : 'bg-[#f8fafc]'
          }`}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            className={
              isAdmin 
                ? "bg-neutral-950 border border-neutral-800 rounded-3xl w-full max-w-4xl min-h-[500px] overflow-hidden text-white shadow-2xl block relative"
                : "bg-white border border-slate-200/60 rounded-[32px] w-full max-w-[440px] p-8 md:p-10 text-slate-950 shadow-xl block relative"
            }
            onClick={(e) => e.stopPropagation()}
            id="login-dialog-container"
          >
            {isAdmin ? (
              <>
                {/* Close absolute top button */}
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-full transition-all cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Split Screen Panel Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
                  
                  {/* LEFT COLUMN: VISUAL INSTRUCTION */}
                  <div className="md:col-span-4 bg-gradient-to-b from-orange-950 to-neutral-950 p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-800 relative">
                    <div className="absolute top-0 left-0 h-40 w-40 bg-orange-600/5 blur-2xl rounded-full" />
                    
                    <div className="space-y-4 relative z-10">
                      <div className="h-10 w-10 bg-orange-500/10 border border-orange-500/20 text-orange-500 rounded-xl flex items-center justify-center font-bold">
                        🏛️
                      </div>
                      <h3 className="text-xl font-bold tracking-tight">ICT Admin Portal</h3>
                      <p className="text-neutral-400 text-xs leading-relaxed font-sans">
                        Welcome to the Shashemene Municipal Digital Gateway. Secure logging credentials grant access to network speed dials, DNS flush commands, and server cache statistics.
                      </p>
                    </div>

                    <div className="text-[10px] text-neutral-500 font-mono pt-4 leading-normal">
                      Authorized access only. Logging sessions are monitored at legumesetsegaye41@gmail.com and recorded.
                    </div>
                  </div>

                  {/* RIGHT COLUMN: DYNAMIC PANEL (LOGIN OR DASHBOARD) */}
                  <div className="md:col-span-8 p-6 md:p-8 flex flex-col justify-center bg-neutral-950">
                    {/* STATE 2: THE BREATHTAKING ICT MONITORING PANEL */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-4 w-full py-2 text-left"
                      id="ict-dashboard"
                    >
                      {/* Welcome Banner */}
                      <div className="flex items-center justify-between border-b border-neutral-800 pb-3 flex-wrap gap-3">
                        <div>
                          <h4 className="text-lg font-bold text-neutral-100 flex items-center gap-1.5 capitalize">
                            Hello, Legese Tsegaye
                          </h4>
                          <p className="text-[10px] text-orange-400 font-mono uppercase tracking-widest mt-0.5">Municipal ICT Core Operations Desk • Active Session</p>
                        </div>
                        <span className="flex items-center gap-1 bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                          <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-ping" />
                          Server Live
                        </span>
                      </div>

                      {/* Navigation Tabs */}
                      <div className="flex border-b border-neutral-900 gap-4" id="admin-tabs">
                        <button
                          type="button"
                          onClick={() => setActiveTab('network')}
                          className={`pb-2 text-xs font-bold uppercase tracking-wider transition-all font-mono cursor-pointer flex items-center gap-1.5 ${
                            activeTab === 'network'
                              ? 'text-orange-500 border-b-2 border-orange-500 font-bold'
                              : 'text-neutral-500 hover:text-neutral-300'
                          }`}
                          id="tab-network"
                        >
                          <Terminal className="h-3.5 w-3.5" /> Operations Terminal
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveTab('slides')}
                          className={`pb-2 text-xs font-bold uppercase tracking-wider transition-all font-mono cursor-pointer flex items-center gap-1.5 ${
                            activeTab === 'slides'
                              ? 'text-orange-500 border-b-2 border-orange-500 font-bold'
                              : 'text-neutral-500 hover:text-neutral-300'
                          }`}
                          id="tab-slides"
                        >
                          <Layers className="h-3.5 w-3.5" /> Slide Hero Manager
                        </button>
                      </div>

                      {activeTab === 'network' ? (
                        <div className="space-y-4" id="network-ops-panel">
                          {/* Stats Grid */}
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            <div className="bg-neutral-900 p-3.5 rounded-xl border border-neutral-850">
                              <span className="text-[9px] uppercase font-mono text-neutral-500 font-bold block">Gateway Uptime</span>
                              <span className="text-xl sm:text-2xl font-bold text-white mt-1 block font-mono">
                                {uptimePercent.toFixed(2)}%
                              </span>
                              <p className="text-[9px] text-green-400 font-sans mt-0.5 flex items-center gap-1">
                                <Cpu className="h-3 w-3" /> SLA certified
                              </p>
                            </div>

                            <div className="bg-neutral-900 p-3.5 rounded-xl border border-neutral-850">
                              <span className="text-[9px] uppercase font-mono text-neutral-500 font-bold block">Active Tourist Wi-Fi Logs</span>
                              <span className="text-xl sm:text-2xl font-bold text-orange-400 mt-1 block font-mono">
                                {activeNomads}
                              </span>
                              <p className="text-[9px] text-neutral-500 font-sans mt-0.5">Connected Nomads currently</p>
                            </div>

                            <div className="bg-neutral-900 p-3.5 rounded-xl border border-neutral-850 col-span-2 sm:col-span-1">
                              <span className="text-[9px] uppercase font-mono text-neutral-500 font-bold block">Fiber Optic backbone</span>
                              <span className="text-xl sm:text-2xl font-bold text-emerald-400 mt-1 block font-mono">
                                12 km
                              </span>
                              <p className="text-[9px] text-neutral-500 font-sans mt-0.5">Layed central ducts</p>
                            </div>
                          </div>

                          {/* Interactive Sub-systems Dashboard action */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Left Block: Wi-Fi routers soft reset list */}
                            <div className="bg-neutral-900/40 p-4 rounded-xl border border-neutral-850 space-y-3">
                              <span className="text-[10px] font-mono uppercase font-bold text-neutral-400 block pb-1 border-b border-neutral-900 flex items-center gap-1.5">
                                <Network className="h-4 w-4 text-orange-500" /> Fiber Hotspots Control Center
                              </span>

                              <div className="space-y-2">
                                {[
                                  { id: 'node-central', label: 'Central Sq Hotspot' },
                                  { id: 'node-zion', label: 'Zion Lodge Trunk' },
                                  { id: 'node-hall', label: 'Municipality Terminal' }
                                ].map((node) => (
                                  <div key={node.id} className="flex justify-between items-center bg-neutral-950 p-2.5 rounded-lg border border-neutral-900">
                                    <span className="text-xs font-sans text-neutral-300 font-semibold">{node.label}</span>
                                    <button
                                      type="button"
                                      onClick={() => handleSimulateNodeReboot(node.label)}
                                      disabled={rebootingNode !== null}
                                      className={`px-2.5 py-1 rounded text-[10px] font-bold font-mono transition-all cursor-pointer ${
                                        rebootingNode === node.label
                                          ? 'bg-amber-600 text-white'
                                          : 'bg-neutral-900 hover:bg-orange-600/20 text-orange-400 hover:text-white border border-orange-500/10'
                                      }`}
                                      id={`btn-reboot-${node.id}`}
                                    >
                                      {rebootingNode === node.label ? 'Resetting...' : 'Reboot Node'}
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Right Block: Live terminal logs executor */}
                            <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-850 flex flex-col justify-between min-h-[170px]">
                              <span className="text-[10px] font-mono uppercase font-bold text-neutral-400 block pb-1 border-b border-neutral-900 flex items-center gap-1.5">
                                <Terminal className="h-4 w-4 text-orange-500" /> Local shell terminal
                              </span>

                              {/* Terminal Display */}
                              <div className="h-28 overflow-y-auto text-[10px] font-mono text-emerald-400/95 space-y-1.5 my-2 p-2 bg-black rounded shadow-inner pr-1">
                                {terminalLogs.map((log, index) => (
                                  <div key={index} className="leading-relaxed font-mono whitespace-pre-wrap">{log}</div>
                                ))}
                              </div>

                              {/* Entry form */}
                              <form onSubmit={handleRunCommand} className="flex gap-1.5">
                                <span className="text-[10px] font-mono text-neutral-500 pt-1.5">$</span>
                                <input 
                                  type="text"
                                  placeholder="Type /help..."
                                  value={cmdInput}
                                  onChange={(e) => setCmdInput(e.target.value)}
                                  className="bg-neutral-900 text-[10px] text-emerald-400 font-mono flex-grow focus:outline-none focus:ring-1 focus:ring-orange-600 rounded px-2 py-1.5"
                                  id="terminal-input-field"
                                />
                                <button 
                                  type="submit"
                                  className="bg-neutral-900 border border-neutral-800 text-[9px] px-2 text-neutral-300 font-mono rounded cursor-pointer"
                                >
                                  RUN
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      ) : (
                        // THE NEW SLIDE HERO MANAGER CONTENT
                        <div className="space-y-4" id="slide-hero-panel">
                          <div className="flex md:items-center justify-between flex-col md:flex-row gap-2 pb-2 border-b border-neutral-900">
                            <div>
                              <h5 className="text-sm font-bold tracking-tight text-neutral-200">Active Homepage Slides: {safeSlides.length}</h5>
                              <p className="text-[10px] text-neutral-400 font-normal">Manage background banners, headings, descriptions, and call-to-actions.</p>
                            </div>
                            <button
                              type="button"
                              onClick={handleRestoreDefaults}
                              className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-orange-500/30 text-[10px] text-orange-400 hover:text-white font-mono px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer self-start"
                              id="btn-restore-defaults"
                            >
                              <RotateCcw className="h-3 w-3" /> Restore Original Defaults
                            </button>
                          </div>

                          {slideFormError && (
                            <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/20 text-xs text-red-400 font-medium animate-pulse">
                              ⚠️ {slideFormError}
                            </div>
                          )}

                          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                            {/* FORM COLUMN: ADDING SLIDES */}
                            <div className="md:col-span-7 bg-neutral-900/50 p-4 rounded-xl border border-neutral-850 space-y-4">
                              <span className="text-[10px] font-mono uppercase font-bold text-neutral-400 block pb-1 border-b border-neutral-900 flex items-center gap-1.5">
                                <Sparkles className="h-4 w-4 text-orange-500" /> Create Custom Hero Slide
                              </span>

                              <form onSubmit={handleCreateSlide} className="space-y-3">
                                {/* Drag & Drop File Upload Zone */}
                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono uppercase font-bold text-neutral-500">Slide Display Image</label>
                                  <div
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={() => document.getElementById('slide-image-file-input')?.click()}
                                    className={`border-2 border-dashed rounded-xl p-3 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                                      isDragOver 
                                        ? 'border-orange-500 bg-orange-500/5' 
                                        : 'border-neutral-850 bg-neutral-950 hover:border-orange-500/10'
                                    }`}
                                    id="image-drop-zone"
                                  >
                                    {newSlideImage ? (
                                      <div className="relative w-full h-24 rounded-lg overflow-hidden border border-neutral-800 group">
                                        <img 
                                          src={newSlideImage} 
                                          alt="Uploaded preview" 
                                          className="w-full h-full object-cover opacity-80"
                                        />
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                          <p className="text-[10px] font-mono text-green-400 flex items-center gap-1 font-bold">
                                            <Check className="h-3 w-3 animate-bounce" /> Image Loaded Successfully
                                          </p>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setNewSlideImage(null);
                                          }}
                                          className="absolute top-1.5 right-1.5 p-1 bg-red-600 hover:bg-red-500 text-white rounded-full text-[9px] font-bold"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    ) : (
                                      <>
                                        <ImageIcon className="h-8 w-8 text-neutral-600" />
                                        <div className="space-y-1">
                                          <p className="text-xs text-neutral-300 font-semibold">Drag & drop slide image here</p>
                                          <p className="text-[9px] text-neutral-500">or click to choose image file (Max 3MB)</p>
                                        </div>
                                      </>
                                    )}
                                    <input 
                                      type="file"
                                      accept="image/*"
                                      onChange={handleFileSelect}
                                      className="hidden"
                                      id="slide-image-file-input"
                                    />
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        document.getElementById('slide-image-file-input')?.click();
                                      }}
                                      className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded text-[10px] text-neutral-300 hover:bg-neutral-800 cursor-pointer"
                                    >
                                      Select Image
                                    </button>
                                  </div>
                                </div>

                                {/* Text Fields */}
                                <div className="grid grid-cols-2 gap-3">
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-mono uppercase font-bold text-neutral-500">Category Tag</label>
                                    <input 
                                      type="text"
                                      required
                                      placeholder="E.g., Cultural Melting Pot"
                                      value={newSlideCategory}
                                      onChange={(e) => setNewSlideCategory(e.target.value)}
                                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-neutral-200 focus:border-orange-500 outline-none"
                                      id="slide-category-input"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-mono uppercase font-bold text-neutral-500">Badge / Tag (Optional)</label>
                                    <input 
                                      type="text"
                                      placeholder="E.g., Ecotourism Special"
                                      value={newSlideTag}
                                      onChange={(e) => setNewSlideTag(e.target.value)}
                                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-neutral-200 focus:border-orange-500 outline-none"
                                      id="slide-tag-input"
                                    />
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono uppercase font-bold text-neutral-500">Slide Heading Title</label>
                                  <input 
                                    type="text"
                                    required
                                    placeholder="E.g., Discover Rastafarian Tabernacles"
                                    value={newSlideTitle}
                                    onChange={(e) => setNewSlideTitle(e.target.value)}
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-neutral-200 focus:border-orange-500 outline-none"
                                    id="slide-title-input"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono uppercase font-bold text-neutral-500">Subtitle Description</label>
                                  <textarea 
                                    required
                                    rows={2}
                                    placeholder="Provide description which will overlay the background image..."
                                    value={newSlideSubtitle}
                                    onChange={(e) => setNewSlideSubtitle(e.target.value)}
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-neutral-200 focus:border-orange-500 outline-none resize-none"
                                    id="slide-subtitle-input"
                                  />
                                </div>

                                <div className="grid grid-cols-2 gap-3 pb-1">
                                  <div className="space-y-1 col-span-2">
                                    <label className="text-[10px] font-mono uppercase font-bold text-neutral-500">CTA Button Text</label>
                                    <input 
                                      type="text"
                                      required
                                      placeholder="E.g., Discover Culture"
                                      value={newSlideActionText}
                                      onChange={(e) => setNewSlideActionText(e.target.value)}
                                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-neutral-200 focus:border-orange-500 outline-none"
                                      id="slide-action-input"
                                    />
                                  </div>
                                </div>

                                <button
                                  type="submit"
                                  className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 rounded-lg text-xs uppercase tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1.5"
                                  id="btn-submit-slide"
                                >
                                  Upload Slide to Home
                                </button>
                              </form>
                            </div>

                            {/* LIST COLUMN: ACTIVE SLIDES */}
                            <div className="md:col-span-5 bg-neutral-900/40 p-4 rounded-xl border border-neutral-850 space-y-3.5 flex flex-col justify-between">
                              <span className="text-[10px] font-mono uppercase font-bold text-neutral-400 block pb-1 border-b border-neutral-900 flex items-center gap-1.5">
                                <ImageIcon className="h-4 w-4 text-orange-500" /> Active Slides Queue
                              </span>

                              <div className="space-y-2.5 overflow-y-auto max-h-[300px] flex-grow pr-1">
                                {safeSlides.map((s, idx) => (
                                  <div 
                                    key={s.id} 
                                    className="flex items-center gap-3 bg-neutral-950 p-2 rounded-xl border border-neutral-900 justify-between group"
                                  >
                                    {/* Thumbnail & Title metadata */}
                                    <div className="flex items-center gap-2 min-w-0 flex-grow">
                                      <div className="w-10 h-10 rounded-lg bg-neutral-900 overflow-hidden border border-neutral-800 flex-shrink-0">
                                        <img 
                                          src={s.image} 
                                          alt={s.title} 
                                          className="w-full h-full object-cover grayscale brightness-90" 
                                        />
                                      </div>
                                      <div className="min-w-0 flex-grow">
                                        <p className="text-[9px] uppercase font-mono text-orange-500/80 tracking-wide font-bold truncate">{s.category}</p>
                                        <p className="text-xs font-semibold text-neutral-200 truncate capitalize">{s.title}</p>
                                        <p className="text-[8px] font-mono text-neutral-500">Position {idx + 1}</p>
                                      </div>
                                    </div>

                                    {/* Delete handle */}
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteSlide(s.id)}
                                      className="p-1 px-1.5 rounded bg-neutral-900 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer flex-shrink-0 text-xs"
                                      title="Delete Slide"
                                      id={`btn-delete-slide-${s.id}`}
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>

                              <p className="text-[9px] text-neutral-500 font-mono tracking-wide leading-tight mt-1 border-t border-neutral-900 pt-2.5">
                                Slides rotate every 7s automatically on the main screen background view.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                    </motion.div>
                  </div>

                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 w-full text-center"
              >
                {/* Brand Logo header */}
                <div className="text-center tracking-tight mb-2 select-none" id="login-header-logo">
                  <span className="text-[32px] font-extrabold text-[#0f5132] tracking-tight">Shashemene</span>{' '}
                  <span className="text-[32px] font-medium text-[#ca8a04] tracking-tight">Tourism</span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-[28px] font-serif font-semibold text-[#0f5132] tracking-tight text-center">
                    Admin Login
                  </h4>
                  <p className="text-sm text-slate-500 font-sans text-center">
                    Access the administrative dashboard
                  </p>
                </div>

                <form onSubmit={handleExecuteLogin} className="space-y-4 text-left mt-6">
                  <div className="space-y-1.5">
                    <label className="text-slate-800 font-medium text-sm block" htmlFor="admin-email-field">
                      Username or Email
                    </label>
                    <input 
                      type="text"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="Enter admin username"
                      className="w-full bg-white border border-slate-200 focus:border-[#0f5132] focus:ring-1 focus:ring-[#0f5132] rounded-xl py-3 px-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400"
                      id="admin-email-field"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-800 font-medium text-sm block" htmlFor="admin-passwd-field">
                      Password
                    </label>
                    <input 
                      type="password"
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Enter password"
                      className="w-full bg-white border border-slate-200 focus:border-[#0f5132] focus:ring-1 focus:ring-[#0f5132] rounded-xl py-3 px-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400"
                      id="admin-passwd-field"
                    />
                  </div>

                  {errorText && (
                    <p className="text-red-600 text-xs font-semibold text-center mt-1">{errorText}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full bg-[#0f5132] hover:bg-[#0b3b24] active:bg-[#072617] text-white font-bold py-3.5 px-6 rounded-xl text-lg transition-all mt-6 flex items-center justify-center gap-2 cursor-pointer"
                    id="btn-admin-signin"
                  >
                    {isLoggingIn ? (
                      <>
                        <RefreshCw className="h-5 w-5 animate-spin text-white" />
                        <span>Logging in...</span>
                      </>
                    ) : (
                      <span>Login</span>
                    )}
                  </button>
                </form>

                <div className="text-[12px] text-slate-500 font-sans text-center mt-4">
                  Default admin: <span className="font-bold text-slate-700">admin</span> / <span className="font-bold text-slate-700">admin123</span>
                </div>

                <div className="mt-4">
                  <button
                    onClick={onClose}
                    type="button"
                    className="text-[#1d4ed8] hover:text-[#1e40af] hover:underline cursor-pointer text-[13px] font-semibold text-center transition-colors bg-transparent border-none outline-none"
                    id="btn-return-home"
                  >
                    Return to Homepage
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
