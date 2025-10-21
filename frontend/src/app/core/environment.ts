export interface EnvConfig {
    apiUrl: string;
    //add more as our FE env needs increase
}

export let ENV: EnvConfig = {
    apiUrl: '',
};

export function setEnv(config: EnvConfig) {
    ENV = config;
};