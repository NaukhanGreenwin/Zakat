#!/bin/bash

# This script helps push your Zakat Calculator to an existing GitHub repository
# For: https://github.com/NaukhanGreenwin/Zakat.git

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Uploading Zakat Calculator to existing GitHub repository${NC}"

# Initialize git repository if not already initialized
if [ ! -d ".git" ]; then
  echo -e "${GREEN}Initializing git repository...${NC}"
  git init
else
  echo -e "${GREEN}Git repository already initialized.${NC}"
fi

# Add all files
echo -e "${GREEN}Adding files to git...${NC}"
git add .

# Commit changes
echo -e "${GREEN}Committing changes...${NC}"
git commit -m "Initial commit: Zakat Calculator application"

# Add GitHub remote
echo -e "${GREEN}Adding GitHub remote...${NC}"
git remote add origin https://github.com/NaukhanGreenwin/Zakat.git

# Push to GitHub
echo -e "${GREEN}Pushing to GitHub...${NC}"
git push -u origin main || git push -u origin master

echo -e "${GREEN}Done! Your Zakat Calculator is now on GitHub.${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo -e "1. Visit https://render.com to deploy your application"
echo -e "2. Connect your GitHub repository to Render"
echo -e "3. Configure as per the README.md instructions" 