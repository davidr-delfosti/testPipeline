import 'colors';
import { ENV } from '../config';

const noop = () => {};
// eslint-disable-next-line no-console
const consoleLog = ENV.LOGGING ? console.log.bind(console) : noop;

class LoggerClass {
  log = (message: string) => {
    this.applyLog({ tag: 'LOG'.green, message });
  };

  error = (message: string) => {
    this.applyLog({ tag: 'ERROR'.red, message });
  };

  info = (message: string) => {
    this.applyLog({ tag: 'INFO'.blue, message });
  };

  warn = (message: string) => {
    this.applyLog({ tag: 'WARN'.yellow, message });
  };

  private getTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).gray;
  };

  private toString = (...args: string[]) => {
    return args.map((arg) => {
      if (typeof arg === 'object') return JSON.stringify(arg, null, 2);
      return arg;
    });
  };

  private applyLog = ({ tag, message }: { tag: string; message: string }) => {
    const time = this.getTime();
    consoleLog.apply(console, this.toString(`[${tag}]`, time, message));
  };
}

export const logger = new LoggerClass();
