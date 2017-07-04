export = Loadmill;

/**
 * Create Loadmill middleware according to given options.
 */
declare function Loadmill(options?: LoadmillOptions): (req, res, next) => any;

type LoadmillOptions = {
    /**
     * Default: domain verification disabled.
     */
    verifyToken?: string;

    /**
     * Default: true.
     */
    enableCors?: boolean;
};
