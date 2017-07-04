export = Loadmill;

declare const Loadmill: {
    /**
     * Create Loadmill middleware according to given options.
     */
    (options?: LoadmillOptions): (req, res, next) => any
};

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
