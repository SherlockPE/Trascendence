FROM debian:bookworm-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Instala Node.js, npm y otras dependencias necesarias
RUN apt-get update && \
    apt-get install -y \
    curl \
    gnupg \
    lsb-release \
    ca-certificates && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean

# Copia los archivos de tu proyecto al contenedor
COPY /src /app/
COPY /tsconfig.json /app/
COPY /package.json /app/

RUN npm install
EXPOSE 3020


# Usa un comando para mantener el contenedor en ejecución, en caso de que necesites interactuar con él
CMD ["npx", "ts-node", "server.ts"]
