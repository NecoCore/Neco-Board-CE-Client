export const getBaseUrl = () => {
  const env = window.__ENV__;

  if(env?.SERVER_URL && env.SERVER_URL.trim() !== "") {
    return env.SERVER_URL;
  }

  return `${env.SERVER_PROTOCOL}://${env.SERVER_HOST}:${env.SERVER_PORT}`;
}