const fs = require('fs');
const file = 'features/settings/components/ChannelsSection.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = `            <button
              onClick={onToggle}
              disabled={isLoading}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                isConnected || isConnecting
                  ? 'bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10'
                  : 'bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-500/20'
              )}
            >
              {isConnected ? (
                <>
                  <WifiOff className="w-3.5 h-3.5" />
                  Desconectar
                </>
              ) : isConnecting ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-amber-600 dark:text-amber-400">Cancelar</span>
                </>
              ) : (`;

const replacement = `            <button
              onClick={onToggle}
              disabled={isLoading}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                isConnected
                  ? 'bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300'
                  : isConnecting
                  ? 'bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-500/20'
                  : 'bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-500/20'
              )}
            >
              {isConnected ? (
                <>
                  <WifiOff className="w-3.5 h-3.5" />
                  Desconectar
                </>
              ) : isConnecting ? (
                <>
                  <WifiOff className="w-3.5 h-3.5" />
                  Cancelar
                </>
              ) : (`;

content = content.replace(target, replacement);
fs.writeFileSync(file, content);
console.log("Done");
