/***
 *
 * Provides a simple way to use Promise with XHR Callback
 *
 * @copyright Cortex Media 2015
 *
 * @author Mathieu Rhéaume
 *
 */
import * as P from "./promise";
/**
 * @classdesc Provides a simple way to use Promise with XHR Callback
 */
export default class LazyLoader {
    /**
     * @memberof com.cortex.core.net.LazyLoader
     * @param {string} aFile - Path of the file to fetch
     * @param {string} aApiToken - Token to add in Autorization header if used in beaver token
     * @param {object} aDatastoreObject - A Datastore object to cache the XHR Response.
     */
    static loadJSON(aFile: string, aApiToken?: string, aDatastoreObject?: any): P.Promise<any>;
    /**
     * @memberof com.cortex.core.net.LazyLoader
     * @param {string} aFile - Path of the file to fetch
     */
    static loadFile(aFile: string): P.Promise<any>;
    /**
     * @memberof com.cortex.core.net.LazyLoader
     * @param {string} aFile - Path of the file to fetch
     */
    static loadTemplate(aFile: string): P.Promise<any>;
    /**
     * @memberof com.cortex.core.net.LazyLoader
     * @param {string} aFile - Path of the file to fetch
     * @param {object} aJsonObject - Json object to send
     * @param {boolean} aSyncOrNot - Execute the request in sync or async mode.
     * @param {string} aApiToken - Token to use in autorization header.
     */
    static sendJSON(aFile: string, aJsonObject: any, aSyncOrNot?: boolean, aApiToken?: any): P.Promise<any>;
    /**
     * Realise a PUT (UPDATE) Operation from a provided Json Object.
     *
     * @memberof com.cortex.core.net.LazyLoader
     * @param {string} aFile - Path of the file to fetch
     * @param {any} aJsonObject - JSON Object to send.
     * @param {boolean} aSyncOrNot - Execute the request in sync or async mode.
     * @param {string} aApiToken - Token to use in autorization header.
     */
    static updateJSON(aFile: string, aJsonObject: any, aSyncOrNot?: boolean, aApiToken?: any): P.Promise<any>;
    static deleteRequest(aFile: string, aJsonObject: any, aSyncOrNot?: boolean, aApiToken?: any): P.Promise<any>;
    /**
     * Handles callback from XHR Query and Parse the JSON from query...
     *
     * @memberof com.cortex.core.net.LazyLoader
     * @param {XMLHttpRequest} aXhrObject - Object used to do the query
     * @param {Defer} aDeferObject - Object from promise your currently running...
     */
    static handleXHRReponse(requestObject: XMLHttpRequest, aDeferObject: any): any;
    /**
     * Initialize a XMLHttpRequest object with the required headers for a JSON Object Operation
     *
     * @memberof com.cortex.core.net.LazyLoader
     * @param {string} aHttpOperation - HTTP Operation to do
     * @param {string} aFile - Path of the file to fetch
     * @param {boolean} aSyncOrNot - Execute the request in sync or async mode.
     * @param {string} aApiToken - Token to use in autorization header.
     */
    private static getXHRObject(aHttpOperation, aFile, aSyncOrNot?, aApiToken?);
}
