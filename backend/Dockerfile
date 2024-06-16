FROM node:22.1-bookworm

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

ENV NODE_ENV production

WORKDIR /app
COPY --chown=node:node . .

RUN npm ci --only=production

USER node

CMD ["dumb-init", "node", "server.js"]
