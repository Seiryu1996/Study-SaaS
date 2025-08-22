FROM node:18

WORKDIR /app

# Install language runtimes
RUN apt-get update && apt-get install -y \
    # Go installation
    wget \
    && wget https://go.dev/dl/go1.21.0.linux-amd64.tar.gz \
    && tar -C /usr/local -xzf go1.21.0.linux-amd64.tar.gz \
    && rm go1.21.0.linux-amd64.tar.gz \
    # Ruby installation
    && apt-get install -y ruby-full \
    # PHP installation
    && apt-get install -y php-cli \
    # Clean up
    && rm -rf /var/lib/apt/lists/*

# Add Go to PATH
ENV PATH=$PATH:/usr/local/go/bin

# Install .NET 6.0
RUN wget https://packages.microsoft.com/config/debian/11/packages-microsoft-prod.deb -O packages-microsoft-prod.deb \
    && dpkg -i packages-microsoft-prod.deb \
    && rm packages-microsoft-prod.deb \
    && apt-get update \
    && apt-get install -y dotnet-sdk-6.0

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Install TypeScript and ts-node locally
RUN npm install typescript ts-node

# Don't copy source code in Dockerfile for hot reload
# Source code will be mounted as volume

# Expose ports
EXPOSE 3000
EXPOSE 5555

# Hot reload enabled for development
CMD ["npm", "run", "dev"]