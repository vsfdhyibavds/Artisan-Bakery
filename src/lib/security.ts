import { SecurityLog } from './types';

export const createSecurityLog = (
  event: string,
  status: 'success' | 'failure',
  details: Record<string, any>
): SecurityLog => ({
  timestamp: Date.now(),
  event,
  status,
  details
});
