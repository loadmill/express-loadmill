export = Loadmill;

declare const Loadmill: {
    /**
     * Create Loadmill middleware according to given options.
     */
    (options?: LoadmillOptions): (req, res, next) => any
};

/**
 * Loadmill express middleware configuration options.
 */
type LoadmillOptions = {
    /**
     * Default: domain verification disabled.
     */
    verifyToken?: string

    /**
     * Default: true.
     */
    enableCors?: boolean

    /**
     * Optional monitoring configuration.
     * Sends data only during testing.
     */
    monitor?: {
        /**
         * Personal access token for Loadmill monitoring API.
         */
        apiToken: string

        /**
         * Enable monitoring during testing.
         * Default: true.
         */
        enabled?: boolean

        /**
         * The node process's associated (case insensitive) environment name (e.g. `Staging`, `Test`, `My_MacBook`, etc.).
         * In general, Loadmill will monitor a single environment per load test.
         *
         * May contain (only) alphanumeric characters, `-` and `_`.
         * Default: `default_env`.
         */
        envName?: string;

        /**
         * The node process's associated (case insensitive) app / component / micro-service name
         * (e.g. `web_app`, `billing_service`, `scheduler`, etc.).
         *
         * The app name is used to group together processes of the same "kind" and
         * aggregate their performance metrics.
         *
         * May contain (only) alphanumeric characters, `-` and `_`.
         * Default: `default_app`.
         */
        appName?: string;
    }
};
