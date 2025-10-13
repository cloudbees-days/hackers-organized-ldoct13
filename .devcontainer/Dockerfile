FROM node:lts

# Install system dependencies
RUN apt-get update && apt-get install -y \
    jq \
    git \
    && rm -rf /var/lib/apt/lists/*

# Set up workspace
WORKDIR /workspace

# Switch to node user for better security
USER node
