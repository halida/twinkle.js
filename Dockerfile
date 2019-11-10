ARG NODE_VERSION
# === Base image ===
FROM node:${NODE_VERSION}-buster-slim as base

# Dependencies
RUN apt-get update -qq \
  && DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends \
    less \
    vim \
    git \
    libpq-dev \
  && apt-get clean \
  && rm -rf /var/cache/apt/archives/* \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
  && truncate -s 0 /var/log/*log

RUN mkdir /app

WORKDIR /app
EXPOSE 3000


# === Development image ===
FROM base as development
ENV NODE_ENV=development
EXPOSE 9229
CMD ["/usr/bin/bash"]


# === Production image ===
FROM base as production
ENV NODE_ENV=production

RUN chown -R node:node /app
USER node

COPY --chown=node:node package.json yarn.lock ./
RUN yarn install

COPY --chown=node:node . .

CMD ["yarn", "start"]
