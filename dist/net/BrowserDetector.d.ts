/**
 * All information contained herein is, and remains
 * the property of Cortex Media and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Cortex Media and its suppliers
 * and may be covered by Canada and Foreign Patents,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Cortex Media.
 *
 * @copyright    Cortex Media 2014
 *
 * @author Mathieu Rhéaume
 */
/**
 * @classdesc       Utilitary to detect browser versions.
 */
export default class BrowserDetector {
    private static IE_APP_NAME;
    private static IE_11_APP_NAME;
    private static IE_MIN_VER_NUMBER;
    private static IE_REGEX_VERSIONS;
    private static IE_11_REGEX_VERSIONS;
    constructor();
    /**
     * @description     Detect if browser is internet explorer
     *
     * @return          {Boolean} Returns true if internet explorer else false
     *
     * @memberof        com.cortex.core.browsers.BrowserDetector
     */
    static DetectInternetExplorer(): boolean;
    /**
     * @description     Get internet explorer versions
     *
     * @return          {Float} Returns internet explorer versions and -1 if not IE.
     *
     * @memberof        com.cortex.core.browsers.BrowserDetector
     */
    static GetInternetExplorerVersion(): number;
    private static ExtractIEVersion();
}
