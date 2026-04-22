import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-4 z-50 max-w-md">
      <Download size={24} />
      <div className="flex-1">
        <p className="font-semibold">Install Spotify PWA</p>
        <p className="text-sm opacity-90">Install this app on your device for a better experience</p>
      </div>
      <button
        onClick={handleInstall}
        className="bg-white text-green-600 px-4 py-2 rounded font-semibold hover:bg-gray-100 transition-colors"
      >
        Install
      </button>
      <button
        onClick={handleDismiss}
        className="text-white hover:bg-white hover:bg-opacity-20 rounded p-1 transition-colors"
      >
        <X size={20} />
      </button>
    </div>
  );
}
