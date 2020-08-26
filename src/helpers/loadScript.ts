import { v4 as uuidv4 } from 'uuid';

const VERSION: string = '2.0';
const SCRIPT_URL: string = `https://js.verygoodvault.com/vgs-collect/${VERSION}/vgs-collect.js`;

const findScript = () => {
    try {
        const scripts = document.querySelectorAll<HTMLScriptElement>(`script[src^="${SCRIPT_URL}"]`);
        return scripts.length > 0 ? scripts[scripts.length - 1] : false;
    } catch (e) {
        return false;
    }
};

const appendScript = ([tenantId, environment]: string[]): HTMLScriptElement => {
    const script = document.createElement('script');
    script.src = `${SCRIPT_URL}?traceId=${uuidv4()}&tenantId=${tenantId}&env=${environment}`;
    const target = document.head || document.body;

    if (!target) {
        throw new Error('Unable to find document.head or document.body');
    }

    target.append(script);
    return script;
};

const loadScript = (...args: string[]): HTMLScriptElement => {
    return findScript() || appendScript(args);
};

export default loadScript;
