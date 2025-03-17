#!/bin/bash

# This script helps initialize and push your Zakat Calculator to GitHub
# Make sure to replace YOUR_USERNAME with your actual GitHub username

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Setting up GitHub repository for Zakat Calculator${NC}"

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

# Prompt for GitHub username
read -p "Enter your GitHub username: " github_username

# Create GitHub repository
echo -e "${YELLOW}Please create a new repository on GitHub named 'zakat-calculator'${NC}"
echo -e "${YELLOW}Do not initialize it with README, .gitignore, or license files${NC}"
echo -e "${YELLOW}Visit: https://github.com/new${NC}"
echo -e "${YELLOW}Press Enter when you've created the repository...${NC}"
read

# Add GitHub remote
echo -e "${GREEN}Adding GitHub remote...${NC}"
git remote add origin https://github.com/$github_username/zakat-calculator.git

# Push to GitHub
echo -e "${GREEN}Pushing to GitHub...${NC}"
git push -u origin main || git push -u origin master

echo -e "${GREEN}Done! Your Zakat Calculator is now on GitHub.${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo -e "1. Visit https://render.com to deploy your application"
echo -e "2. Connect your GitHub repository to Render"
echo -e "3. Configure as per the README.md instructions" 