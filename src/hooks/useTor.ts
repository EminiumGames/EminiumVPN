import { useCallback, useState } from 'react';
import { getIp, treatPercentages } from '../libs/utils';

export function useTor(initialIpFetched: string | null) {
    const [torProcessId, setTorProcessId] = useState<number | null>(null);
    const [torRunning, setTorRunning] = useState(false);
    const [torProgress, setTorProgress] = useState(0);
    const [lastTorLog, setLastTorLog] = useState('');
    const [logs, setLogs] = useState<string[]>([]);
    const [ip, setIp] = useState<string | null>(null);
    const [ipLoading, setIpLoading] = useState(false);
    const [ipError, setIpError] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const startTor = useCallback(async () => {
        setLogs([]);
        try {
            setTorRunning(true);
            setTorProgress(0);
            setLastTorLog('Starting');
            const process = await Neutralino.os.spawnProcess('tor-expert-bundle\\tor.exe -f tor-expert-bundle\\torcc --ExitNodes {' + localStorage.getItem('selectedCountry') + '}');
            setTorProcessId(process.id);
            Neutralino.events.on('spawnedProcess', async (evt: { detail: { id: any; action: any; data: any } }) => {
                if (process.id === evt.detail.id) {
                    switch (evt.detail.action) {
                        case 'stdOut':
                            const treated = treatPercentages(evt.detail.data);
                            if (treated) {
                                if (treated.percent === 100) {
                                    await Neutralino.os.execCommand('powershell -ExecutionPolicy Bypass -File proxy.ps1 -Enable');
                                    setIpLoading(true);
                                    const newIp = await getIp();
                                    if (newIp) {
                                        setIp(newIp);
                                        setIpError(null);
                                    } else {
                                        setIpError('Unable to fetch your IP after Tor activation');
                                    }
                                    setIpLoading(false);
                                }
                                setTorProgress(treated.percent);
                                setLastTorLog(treated.message);
                            }
                            break;
                        case 'stdErr':
                            setLogs(prev => [...prev, `Error: ${evt.detail.data}`]);
                            break;
                        case 'exit':
                            setTorRunning(false);
                            setTorProcessId(null);
                            setIp(initialIpFetched);
                            setIpError(null);
                            break;
                    }
                }
            });
        } catch (error: Error | any) {
            setError(`Failed to start Tor: ${error.message}`);
        }
    }, [initialIpFetched]);

    const stopTor = useCallback(async () => {
        try {
            await Neutralino.os.execCommand('taskkill /IM tor.exe /F');
            await Neutralino.os.execCommand('powershell -ExecutionPolicy Bypass -File proxy.ps1 -Disable');
            setTorRunning(false);
            setTorProcessId(null);
            setIp(initialIpFetched);
            setIpError(null);
        } catch (error: Error | any) {
            setError(`Failed to stop Tor: ${error.message}`);
        }
    }, [initialIpFetched]);

    return {
        torProcessId,
        torRunning,
        torProgress,
        lastTorLog,
        logs,
        ip,
        ipLoading,
        ipError,
        error,
        startTor,
        stopTor,
        setError,
        setIp,
        setIpError,
        setIpLoading,
        setTorRunning,
        setTorProcessId,
        setTorProgress,
        setLastTorLog,
        setLogs,
    };
}
