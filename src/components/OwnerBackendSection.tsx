import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock,
  Unlock,
  KeyRound,
  ShieldCheck,
  UserCheck,
  Trash2,
  CheckCircle2,
  CircleDot,
  Reply,
  Download,
  AlertCircle,
  Eye,
  EyeOff,
  Camera,
  LogOut,
  Sparkles,
  School,
  ExternalLink,
  RefreshCw,
  ArrowLeft,
  Mail,
} from 'lucide-react';
import {
  VisitorMessage,
  getVisitorMessages,
  deleteVisitorMessage,
  toggleMessageRead,
  clearAllMessages,
  subscribeVisitorMessages,
  checkIsAuthenticated,
  hasAdminPasswordSet,
  setupFirstTimeSecretPassword,
  loginSingleSeat,
  logoutSingleSeat,
  updateSecretPassword,
  isDeviceBlocked,
} from '../utils/messagesManager';
import {
  saveStoredProfilePhoto,
  getStoredProfilePhoto,
  getStoredSchoolLogo,
  saveStoredSchoolLogo,
  removeStoredSchoolLogo,
  subscribeSchoolLogo,
  subscribeProfilePhoto,
  DEFAULT_PHOTO_PATHS,
  downloadDataUrlFile,
  compressImage,
} from '../utils/photoManager';

interface OwnerBackendSectionProps {
  onBackToHome?: () => void;
}

export const OwnerBackendSection: React.FC<OwnerBackendSectionProps> = ({ onBackToHome }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [hasPassword, setHasPassword] = useState<boolean>(false);

  // Authentication inputs
  const [emailInput, setEmailInput] = useState('laptopshishir9@gmail.com');
  const [passwordInput, setPasswordInput] = useState('');
  const [newSetupPassword, setNewSetupPassword] = useState('');
  const [confirmSetupPassword, setConfirmSetupPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Messages state
  const [messages, setMessages] = useState<VisitorMessage[]>([]);
  const [activeTab, setActiveTab] = useState<'messages' | 'customization'>('messages');

  // Change password inside dashboard
  const [currentPass, setCurrentPass] = useState('');
  const [updatedPass, setUpdatedPass] = useState('');
  const [confirmUpdatedPass, setConfirmUpdatedPass] = useState('');
  const [passwordChangeMsg, setPasswordChangeMsg] = useState<{ text: string; isError: boolean } | null>(null);

  // Media previews inside admin
  const [ownerPhoto, setOwnerPhoto] = useState<string | null>(null);
  const [schoolLogo, setSchoolLogo] = useState<string | null>(null);
  const [photoSavedSuccess, setPhotoSavedSuccess] = useState(false);
  const [logoSavedSuccess, setLogoSavedSuccess] = useState(false);

  useEffect(() => {
    setIsAuthenticated(checkIsAuthenticated());
    setHasPassword(hasAdminPasswordSet());
    setMessages(getVisitorMessages());
    setOwnerPhoto(getStoredProfilePhoto() || DEFAULT_PHOTO_PATHS[0]);
    setSchoolLogo(getStoredSchoolLogo());

    const unsubMessages = subscribeVisitorMessages((updated) => {
      setMessages(updated);
    });

    const unsubPhoto = subscribeProfilePhoto((newPhoto) => {
      if (newPhoto) setOwnerPhoto(newPhoto);
    });

    const unsubLogo = subscribeSchoolLogo((newLogo) => {
      setSchoolLogo(newLogo);
    });

    return () => {
      unsubMessages();
      unsubPhoto();
      unsubLogo();
    };
  }, []);

  // 1. Initial Setup: Create Secret Password (User created, not pre-baked)
  const handleCreateSecretPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (newSetupPassword.length < 3) {
      setLoginError('Your secret password must be at least 3 characters long.');
      return;
    }
    if (newSetupPassword !== confirmSetupPassword) {
      setLoginError('Passwords do not match. Please re-enter.');
      return;
    }

    const success = setupFirstTimeSecretPassword(newSetupPassword);
    if (success) {
      setHasPassword(true);
      setIsAuthenticated(true);
      setNewSetupPassword('');
      setConfirmSetupPassword('');
      setMessages(getVisitorMessages());
    } else {
      setLoginError('Failed to save secret password. Please try again.');
    }
  };

  // 2. Unlock Seat with the Secret Password
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const res = loginSingleSeat(emailInput, passwordInput);
    if (res.success) {
      setIsAuthenticated(true);
      setPasswordInput('');
      setMessages(getVisitorMessages());
    } else {
      setLoginError(res.error || 'Incorrect secret credentials.');
    }
  };

  // 3. Logout
  const handleLogout = () => {
    logoutSingleSeat();
    setIsAuthenticated(false);
    setPasswordInput('');
    setLoginError(null);
  };

  // 4. Update Password inside Admin
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeMsg(null);

    if (updatedPass !== confirmUpdatedPass) {
      setPasswordChangeMsg({ text: 'New passwords do not match.', isError: true });
      return;
    }

    const res = updateSecretPassword(currentPass, updatedPass);
    if (res.success) {
      setPasswordChangeMsg({ text: 'Secret password updated successfully!', isError: false });
      setCurrentPass('');
      setUpdatedPass('');
      setConfirmUpdatedPass('');
      setTimeout(() => setPasswordChangeMsg(null), 4000);
    } else {
      setPasswordChangeMsg({ text: res.error || 'Failed to update password.', isError: true });
    }
  };

  // 5. School Logo Upload (Only Shishir in this seat)
  const handleSchoolLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const compressed = await compressImage(file, 400, 0.9);
        saveStoredSchoolLogo(compressed);
        setSchoolLogo(compressed);
        setLogoSavedSuccess(true);
        setTimeout(() => setLogoSavedSuccess(false), 3500);
      } catch (err) {
        console.error('Error compressing school logo', err);
      }
    }
  };

  const handleRemoveSchoolLogo = () => {
    removeStoredSchoolLogo();
    setSchoolLogo(null);
    setLogoSavedSuccess(true);
    setTimeout(() => setLogoSavedSuccess(false), 3500);
  };

  // 6. Owner Photo Upload (Only Shishir in this seat)
  const handleOwnerPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const compressed = await compressImage(file, 600, 0.88);
        saveStoredProfilePhoto(compressed);
        setOwnerPhoto(compressed);
        setPhotoSavedSuccess(true);
        setTimeout(() => setPhotoSavedSuccess(false), 3500);
      } catch (err) {
        console.error('Error compressing profile photo', err);
      }
    }
  };

  // 7. Export Messages to JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(messages, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `shishir_visitor_messages_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div id="backend" className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden pt-24 pb-20 border-t-4 border-amber-400">
      {/* Subtle backdrop ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Back to Portfolio Navigation Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-sky-300 hover:text-white border border-slate-700 text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>← Back to Public Portfolio</span>
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950 border border-blue-800 text-sky-300 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Single Seat Owner Portal</span>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950 border border-blue-800 text-sky-300 text-xs font-bold uppercase tracking-wider mb-3 shadow-inner">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Owner Portal • Dedicated Login & Seat Admin</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
            Direct Visitor Messages & Seat Admin
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Protected private single seat for Shishir Pokhrel. Messages submitted through the contact form are stored here and only accessible with your personal secret password.
          </p>
        </div>

        {/* MAIN CONTAINER */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!isAuthenticated ? (
              /* =========================================================================
                  STATE A: NOT AUTHENTICATED
                  Case 1: User has not created their secret password yet -> Setup Form
                  Case 2: User has created their password -> Password Login Form
                 ========================================================================= */
              <motion.div
                key="login-or-setup-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl bg-slate-800/90 border border-slate-700 p-6 sm:p-10 shadow-2xl backdrop-blur-md relative"
              >
                {/* Header bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-700/80 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                      <Lock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white">Owner Verification Seat</h3>
                      <p className="text-xs text-slate-400">Reserved seat for Shishir Pokhrel (laptopshishir9@gmail.com)</p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-amber-400/40 text-xs font-extrabold text-amber-300">
                    <UserCheck className="w-4 h-4 text-amber-400" />
                    <span>Single Seat: 1 / 1 User</span>
                  </div>
                </div>

                {loginError && (
                  <div className="mb-6 p-4 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{loginError}</span>
                  </div>
                )}

                {/* PERMANENTLY LOCKED LOGIN FORM (ACROSS ALL DEVICES: MOBILE, LAPTOP, DESKTOP) */}
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-200 text-xs sm:text-sm leading-relaxed">
                    <div className="flex items-center gap-2 text-amber-300 font-bold mb-1">
                      <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Single Owner Seat Locked to laptopshishir9@gmail.com</span>
                    </div>
                    <span>
                      This seat is exclusively reserved for <strong>Shishir Pokhrel</strong>. Only your registered email and secret master password can unlock this seat.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5" htmlFor="admin-email-input">
                      Owner Gmail Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        id="admin-email-input"
                        type="email"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="laptopshishir9@gmail.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-slate-300" htmlFor="admin-secret-password">
                        Enter Secret Master Password
                      </label>
                      <span className="text-[11px] text-amber-300/90 font-medium">Single-Seat Protection</span>
                    </div>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        id="admin-secret-password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="Enter your secret master password"
                        className="w-full pl-10 pr-11 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent placeholder:text-slate-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-slate-300 flex items-center justify-between gap-2">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Owner Seat Authentication</span>
                    </span>
                    <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                      <span>Restricted to laptopshishir9@gmail.com</span>
                    </span>
                  </div>

                  <button
                    type="submit"
                    id="admin-login-submit-btn"
                    className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-extrabold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>Verify & Unlock Seat</span>
                  </button>
                </form>
              </motion.div>
            ) : (
              /* =========================================================================
                  STATE B: AUTHENTICATED SINGLE-SEAT DASHBOARD
                 ========================================================================= */
              <motion.div
                key="dashboard-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl bg-slate-800/95 border border-slate-700 p-6 sm:p-8 shadow-2xl backdrop-blur-md"
              >
                {/* Admin Navbar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-700 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 shadow-xs shrink-0 bg-sky-950">
                      {ownerPhoto ? (
                        <img
                          src={ownerPhoto}
                          alt="Shishir Pokhrel"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <span className="flex items-center justify-center h-full text-xs font-bold text-amber-300">SP</span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-base sm:text-lg text-white">Shishir's Admin Seat</h3>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 text-[10px] font-bold">
                          Active
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">Single Seat • laptopshishir9@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      onClick={handleExportJSON}
                      title="Download messages as JSON"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-400" />
                      <span>Export JSON</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-200 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Lock Seat</span>
                    </button>
                  </div>
                </div>

                {/* Sub-Navigation Tabs */}
                <div className="flex items-center gap-2 mb-6 border-b border-slate-700/60 pb-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('messages')}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'messages'
                        ? 'bg-amber-400 text-blue-950 shadow-xs'
                        : 'bg-slate-900/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>Direct Visitor Messages</span>
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                        activeTab === 'messages' ? 'bg-blue-950 text-amber-300' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {messages.length}
                    </span>
                    {unreadCount > 0 && (
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('customization')}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'customization'
                        ? 'bg-amber-400 text-blue-950 shadow-xs'
                        : 'bg-slate-900/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    <School className="w-3.5 h-3.5" />
                    <span>College Logo, Photo & Password</span>
                  </button>
                </div>

                {/* TAB 1: VISITOR MESSAGES LIST */}
                {activeTab === 'messages' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-slate-400 pb-2">
                      <span>Total messages received from visitors: <strong>{messages.length}</strong></span>
                      {messages.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm('Are you sure you want to clear all stored visitor messages?')) {
                              clearAllMessages();
                            }
                          }}
                          className="text-rose-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Clear All</span>
                        </button>
                      )}
                    </div>

                    {messages.length === 0 ? (
                      <div className="p-12 text-center rounded-2xl bg-slate-900/70 border border-slate-700/60">
                        <CircleDot className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                        <h4 className="text-white font-bold text-sm">No visitor messages yet</h4>
                        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                          When visitors fill out the form ("Wanna create something from me? Then fill the below form"), their message will appear right here.
                        </p>
                      </div>
                    ) : (
                      messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`p-5 rounded-2xl border transition-all ${
                            msg.read
                              ? 'bg-slate-900/60 border-slate-700/60 text-slate-300'
                              : 'bg-slate-900 border-amber-400/60 shadow-md text-white'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-extrabold text-sm text-amber-300">{msg.name}</span>
                                {!msg.read && (
                                  <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-bold">
                                    NEW
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-slate-400">{msg.email || 'No email provided'}</span>
                            </div>

                            <div className="flex items-center gap-3 text-xs">
                              <span className="text-[11px] text-slate-500">{msg.timestamp}</span>

                              <button
                                type="button"
                                onClick={() => toggleMessageRead(msg.id)}
                                title={msg.read ? 'Mark as Unread' : 'Mark as Read'}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                              >
                                <CheckCircle2 className={`w-4 h-4 ${msg.read ? 'text-emerald-400' : 'text-slate-500'}`} />
                              </button>

                              <button
                                type="button"
                                onClick={() => deleteVisitorMessage(msg.id)}
                                title="Delete Message"
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="pt-3">
                            <p className="text-sm leading-relaxed whitespace-pre-line text-slate-200">
                              {msg.message}
                            </p>

                            {msg.email && (
                              <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
                                <a
                                  href={`mailto:${encodeURIComponent(msg.email)}?subject=${encodeURIComponent(
                                    'Re: Your message on my portfolio'
                                  )}&body=${encodeURIComponent(
                                    `Hi ${msg.name},\n\nThank you for reaching out through my portfolio!\n\nBest regards,\nShishir Pokhrel`
                                  )}`}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
                                >
                                  <Reply className="w-3.5 h-3.5" />
                                  <span>Reply to {msg.name}</span>
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* TAB 2: COLLEGE LOGO, PROFILE PHOTO & SECRET PASSWORD */}
                {activeTab === 'customization' && (
                  <div className="space-y-8">
                    
                    {/* 1. College Logo Upload (Only Shishir in this seat) */}
                    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700">
                      <div className="flex items-center gap-2 mb-2">
                        <School className="w-4 h-4 text-amber-400" />
                        <h4 className="font-bold text-sm text-white">College & School Logo (Everest English Boarding Secondary School & College)</h4>
                      </div>
                      <p className="text-xs text-slate-400 mb-4">
                        Upload your official college or school logo here. It will be immediately displayed in your Education card. Only you can upload or change this from your authenticated seat.
                      </p>

                      {logoSavedSuccess && (
                        <div className="mb-4 p-3 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>College logo updated! It is now live in your Education section.</span>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row items-center gap-5">
                        {/* Current Logo Preview */}
                        <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-amber-400/50 bg-slate-950 p-2 flex items-center justify-center shrink-0">
                          {schoolLogo ? (
                            <img
                              src={schoolLogo}
                              alt="Everest College / School Logo"
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="text-center text-[10px] text-slate-500">
                              <School className="w-6 h-6 mx-auto mb-1 text-slate-600" />
                              <span>No college logo yet</span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer transition-colors shadow-xs">
                            <School className="w-4 h-4 text-amber-300" />
                            <span>Upload College Logo File</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleSchoolLogoUpload}
                              className="hidden"
                            />
                          </label>

                          {schoolLogo && (
                            <>
                              <button
                                type="button"
                                onClick={() => downloadDataUrlFile(schoolLogo, 'college-logo.png')}
                                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-blue-950 text-xs font-bold transition-colors cursor-pointer"
                                title="Download as college-logo.png for your GitHub repository"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>Download college-logo.png for Mobile & All Devices</span>
                              </button>

                              <button
                                type="button"
                                onClick={handleRemoveSchoolLogo}
                                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-rose-950 border border-slate-700 text-rose-300 text-xs font-bold transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Remove College Logo</span>
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 p-3 rounded-xl bg-blue-950/40 border border-blue-800/60 text-xs text-sky-200 leading-relaxed">
                        <strong className="text-amber-300 block mb-0.5">Why wasn't the logo showing on mobile?</strong>
                        Browser uploads stay in the laptop's memory. To make your college logo display permanently on your mobile and for all visitors on GitHub Pages: click <strong>"Download college-logo.png"</strong> above, and save it inside your repository's <code>public/assets/</code> and <code>docs/assets/</code> folders.
                      </div>
                    </div>

                    {/* 2. Owner Profile Photo Update */}
                    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700">
                      <div className="flex items-center gap-2 mb-2">
                        <Camera className="w-4 h-4 text-amber-400" />
                        <h4 className="font-bold text-sm text-white">Owner Profile Photo Update</h4>
                      </div>
                      <p className="text-xs text-slate-400 mb-4">
                        Upload your real photograph here. It immediately updates in your circle frame, navbar, and About Me page on this device.
                      </p>

                      {photoSavedSuccess && (
                        <div className="mb-4 p-3 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Profile photograph updated across your portfolio!</span>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row items-center gap-5">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber-400 ring-4 ring-slate-800 shrink-0 bg-slate-950">
                          {ownerPhoto ? (
                            <img
                              src={ownerPhoto}
                              alt="Shishir Pokhrel"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover object-top"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-slate-500">SP</div>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-extrabold text-xs cursor-pointer transition-colors">
                            <Camera className="w-4 h-4" />
                            <span>Select New Photo File</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleOwnerPhotoUpload}
                              className="hidden"
                            />
                          </label>

                          {ownerPhoto && (
                            <button
                              type="button"
                              onClick={() => downloadDataUrlFile(ownerPhoto, 'shishir-photo.jpg')}
                              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors cursor-pointer"
                              title="Download as shishir-photo.jpg for your GitHub repository"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Download shishir-photo.jpg for Mobile & All Devices</span>
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 p-3 rounded-xl bg-blue-950/40 border border-blue-800/60 text-xs text-sky-200 leading-relaxed">
                        <strong className="text-amber-300 block mb-0.5">Why wasn't your photo showing on mobile?</strong>
                        On GitHub Pages, client-side file uploads only exist in the browser you uploaded from (your laptop). To make your photo show on your <strong>mobile phone, tablet, and every visitor's screen</strong>: click <strong>"Download shishir-photo.jpg"</strong>, and place that file into your repository's <code>public/assets/</code> and <code>docs/assets/</code> folders!
                      </div>
                    </div>

                    {/* 3. Change Secret Password */}
                    <form onSubmit={handleChangePassword} className="p-5 rounded-2xl bg-slate-900 border border-slate-700 space-y-4">
                      <div className="flex items-center gap-2 mb-1">
                        <KeyRound className="w-4 h-4 text-amber-400" />
                        <h4 className="font-bold text-sm text-white">Change Your Secret Password</h4>
                      </div>
                      <p className="text-xs text-slate-400">
                        Update the secret password used to lock and unlock this private seat.
                      </p>

                      {passwordChangeMsg && (
                        <div
                          className={`p-3 rounded-xl text-xs flex items-center gap-2 border ${
                            passwordChangeMsg.isError
                              ? 'bg-rose-950 border-rose-800 text-rose-200'
                              : 'bg-emerald-950 border-emerald-800 text-emerald-200'
                          }`}
                        >
                          {passwordChangeMsg.isError ? (
                            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                          )}
                          <span>{passwordChangeMsg.text}</span>
                        </div>
                      )}

                      <div className="space-y-3 max-w-md">
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">
                            Current Secret Password
                          </label>
                          <input
                            type="password"
                            required
                            placeholder="Enter current password"
                            value={currentPass}
                            onChange={(e) => setCurrentPass(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-600 text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">
                            New Secret Password
                          </label>
                          <input
                            type="password"
                            required
                            placeholder="Enter new secret password"
                            value={updatedPass}
                            onChange={(e) => setUpdatedPass(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-600 text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">
                            Confirm New Secret Password
                          </label>
                          <input
                            type="password"
                            required
                            placeholder="Re-type new secret password"
                            value={confirmUpdatedPass}
                            onChange={(e) => setConfirmUpdatedPass(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-600 text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-extrabold text-xs transition-colors cursor-pointer"
                      >
                        Update Secret Password
                      </button>
                    </form>

                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
