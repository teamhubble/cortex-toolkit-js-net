import * as P from "../promise/promise";
declare module com.cortex.core.net {
    class LazyLoader {
        static loadJSON(aFile: string, aApiToken?: string, aDatastoreObject?: any): P.Promise<any>;
        static loadFile(aFile: string): P.Promise<any>;
        static loadTemplate(aFile: string): P.Promise<any>;
        static sendJSON(aFile: string, aJsonObject: any, aSyncOrNot?: boolean, aApiToken?: any): P.Promise<any>;
        static updateJSON(aFile: string, aJsonObject: any, aSyncOrNot?: boolean, aApiToken?: any): P.Promise<any>;
        static deleteRequest(aFile: string, aJsonObject: any, aSyncOrNot?: boolean, aApiToken?: any): P.Promise<any>;
        static handleXHRReponse(requestObject: XMLHttpRequest, aDeferObject: any): any;
        private static getXHRObject(aHttpOperation, aFile, aSyncOrNot?, aApiToken?);
    }
}

declare module com.cortex.core.browser {
    class BrowserDetector {
        private static IE_APP_NAME;
        private static IE_11_APP_NAME;
        private static IE_MIN_VER_NUMBER;
        private static IE_REGEX_VERSIONS;
        private static IE_11_REGEX_VERSIONS;
        constructor();
        static DetectInternetExplorer(): boolean;
        static GetInternetExplorerVersion(): number;
        private static ExtractIEVersion();
    }
}

declare module P {
    function defer<Value>(): Deferred<Value>;
    function resolve<Value>(v: Value): Promise<Value>;
    function reject<Value>(err: Rejection): Promise<Value>;
    function unfold<Seed, Element>(unspool: (current: Seed) => {
        promise: Promise<Element>;
        next?: Seed;
    }, seed: Seed): Promise<Element[]>;
    enum Status {
        Unfulfilled = 0,
        Rejected = 1,
        Resolved = 2,
    }
    interface Rejection {
        message: string;
    }
    interface PromiseState<Value> {
        status: Status;
        result?: Value;
        error?: Rejection;
    }
    interface Promise<Value> extends PromiseState<Value> {
        then<T2>(f: (v: Value) => Promise<T2>): Promise<T2>;
        then<T2>(f: (v: Value) => T2): Promise<T2>;
        done(f: (v: Value) => void): Promise<Value>;
        fail(f: (err: Rejection) => void): Promise<Value>;
        always(f: (v?: Value, err?: Rejection) => void): Promise<Value>;
    }
    interface Deferred<Value> extends PromiseState<Value> {
        promise(): Promise<Value>;
        resolve(result: Value): Deferred<Value>;
        reject(err: Rejection): Deferred<Value>;
        done(f: (v: Value) => void): Deferred<Value>;
        fail(f: (err: Rejection) => void): Deferred<Value>;
        always(f: (v?: Value, err?: Rejection) => void): Deferred<Value>;
    }
    function when(...promises: Promise<any>[]): Promise<any[]>;
    interface Generator<E> {
        (): Iterator<E>;
    }
    interface Iterator<E> {
        advance(): Promise<boolean>;
        current: E;
    }
    function generator<E>(g: () => () => Promise<E>): Generator<E>;
    function iterator<E>(f: () => Promise<E>): Iterator<E>;
    function each<E>(gen: Generator<E>, f: (e: E) => void): Promise<{}>;
    function isUndefined(v: any): any;
}
export = P;
