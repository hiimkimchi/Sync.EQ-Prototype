export interface EnvConfig {
    apiUrl: string;
    auth0Domain: string;
    auth0ClientId: string;
    //add more as our FE env needs increase
}

export let ENV: EnvConfig = {
    apiUrl: '',
    auth0Domain: '',
    auth0ClientId: ''
};

export function setEnv(config: EnvConfig) {
    ENV = config;
};