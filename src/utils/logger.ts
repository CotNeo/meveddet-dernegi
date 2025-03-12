/**
 * Logger modülü - Farklı ortamlarda farklı loglama seviyelerini destekler
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'none';

// Ortam değişkeninden loglama seviyesini al, yoksa geliştirme ortamında 'debug', üretim ortamında 'error' kullan
const getLogLevel = (): LogLevel => {
  const envLogLevel = process.env.LOG_LEVEL as LogLevel;
  if (envLogLevel && ['debug', 'info', 'warn', 'error', 'none'].includes(envLogLevel)) {
    return envLogLevel;
  }
  return process.env.NODE_ENV === 'production' ? 'error' : 'debug';
};

// Loglama seviyelerinin öncelik sırası
const logLevelPriority: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  none: 4
};

// Mevcut loglama seviyesi
const currentLogLevel = getLogLevel();

/**
 * Belirli bir seviyede log kaydı oluşturur
 * @param level Log seviyesi
 * @param message Log mesajı
 * @param data Ek veri (opsiyonel)
 */
const log = (level: LogLevel, message: string, data?: any) => {
  // Mevcut log seviyesi, istenen seviyeden daha yüksek önceliğe sahipse loglama
  if (logLevelPriority[level] < logLevelPriority[currentLogLevel]) {
    return;
  }

  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

  switch (level) {
    case 'debug':
      if (data) {
        console.log(`${prefix} ${message}`, data);
      } else {
        console.log(`${prefix} ${message}`);
      }
      break;
    case 'info':
      if (data) {
        console.info(`${prefix} ${message}`, data);
      } else {
        console.info(`${prefix} ${message}`);
      }
      break;
    case 'warn':
      if (data) {
        console.warn(`${prefix} ${message}`, data);
      } else {
        console.warn(`${prefix} ${message}`);
      }
      break;
    case 'error':
      if (data) {
        console.error(`${prefix} ${message}`, data);
      } else {
        console.error(`${prefix} ${message}`);
      }
      
      // Hata detaylarını logla
      if (data instanceof Error) {
        console.error(`${prefix} Error name: ${data.name}`);
        console.error(`${prefix} Error message: ${data.message}`);
        console.error(`${prefix} Error stack: ${data.stack}`);
      }
      break;
  }
};

// Logger API
const logger = {
  debug: (message: string, data?: any) => log('debug', message, data),
  info: (message: string, data?: any) => log('info', message, data),
  warn: (message: string, data?: any) => log('warn', message, data),
  error: (message: string, data?: any) => log('error', message, data),
};

export default logger; 