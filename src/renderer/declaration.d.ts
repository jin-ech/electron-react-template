declare module '*.less' {
    const resource: { [key: string]: string };
    export = resource;
}

interface Window {
    _hmt: any;
    rHistory: any;
}

interface Event {
    arguments: any;
}

interface ObjectType {
    [key: string]: any;
}

interface NodeModule {
    hot: any;
}

type NodeRequire = (id: 'electron') => {
    ipcRenderer: {
        send: (...args: any[]) => void,
        on: (channel: string, listener: (...args: any[]) => void) => void,
        once: (channel: string, listener: (...args: any[]) => void) => void,
        removeListener: (channel: string, listener: (...args: any[]) => void) => void,
        sendSync: (...args: any[]) => any,
        invoke: (...args: any[]) => Promise<any>,
    },
    shell: { openExternal: (url: string) => void }
}

// ts图片声明
declare module '*.svg';
declare module '*.png';
declare module '*.jpeg';
declare module '*.JPG';
declare module 'react-error-boundaries';
declare module 'nprogress';
declare module 'fake-progress';
