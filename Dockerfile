FROM node:20

WORKDIR /app

COPY package*.json ./

# FIX: remove lock + modules (they will be replaced cleanly)
RUN rm -f package-lock.json && npm install

COPY . .

# Expose Vite dev port
EXPOSE 5173

# Run Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]
